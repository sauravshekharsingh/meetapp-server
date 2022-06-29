const express = require("express");
const app = express();
require("./config/mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");

app.use(cors());

app.use(express.static("assets"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes"));

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  // console.log(`Listening on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: true,
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    // console.log(err);
  }
});

const users = {};

const sentiments = {};

io.on("connection", (socket) => {
  // console.log("Connected: ", socket.userId);

  socket.on("disconnect", () => {
    // console.log("Disconnected: ", socket.userId);
  });

  socket.on("join-room", async ({ roomId }) => {
    try {
      socket.join(roomId);

      if (!users[roomId]) {
        users[roomId] = [];
      }

      const user = await User.findById(socket.userId);
      const index = users[roomId].find((user) => user._id == socket.userId);
      if (index == undefined) {
        users[roomId].push(user);
      }

      // console.log(`${socket.userId} has joined room ${roomId}`);

      io.to(roomId).emit("new-participant", {
        userId: socket.userId,
        participantsList: users[roomId],
      });
    } catch (err) {
      // console.log(err);
    }
  });

  socket.on("leave-room", async ({ roomId }) => {
    try {
      if (users[roomId]) {
        users[roomId] = users[roomId].filter(
          (user) => user._id != socket.userId
        );
        // console.log(users[roomId]);
      }

      // console.log(`${socket.userId} has left room ${roomId}`);

      io.to(roomId).emit("participant-left", {
        userId: socket.userId,
        participantsList: users[roomId],
      });

      socket.leave(roomId);
    } catch (err) {
      // console.log(err);
    }
  });

  socket.on("chat-message", async ({ roomId, message }) => {
    if (message.trim().length > 0) {
      try {
        const user = await User.findById(socket.userId);

        let hateSpeech = false;

        io.to(roomId).emit("new-message", {
          message,
          hateSpeech,
          userId: socket.userId,
          name: user.name,
        });
      } catch (err) {
        // console.log(err);
      }
    }
  });

  socket.on("rate-room", async ({ roomId, rating }) => {
    try {
      users[roomId].forEach((user) => {
        if (user._id == socket.userId) {
          user.rating = parseInt(rating);
        }
      });

      let avgRating = 0;
      users[roomId].forEach((user) => {
        avgRating += user.rating;
      });
      avgRating /= users[roomId].length;
      // console.log(avgRating);

      io.to(roomId).emit("new-ratings", {
        avgRating,
      });
    } catch (err) {
      // console.log(err);
    }
  });

  socket.on("draw", ({ roomId, data }) => {
    io.to(roomId).emit("ondraw", { x: data.x, y: data.y });
  });

  socket.on("down", ({ roomId, data }) => {
    io.to(roomId).emit("ondown", { x: data.x, y: data.y });
  });
});
