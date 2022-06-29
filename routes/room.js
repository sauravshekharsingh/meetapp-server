const express = require('express');
const router = express.Router();

const authMiddlewares = require('../middlewares/authenticate');
const roomControllers = require('../controllers/room');

router.get('/', roomControllers.getRooms);
router.post('/add', authMiddlewares.authenticate, roomControllers.add);
router.post('/remove', authMiddlewares.authenticate, roomControllers.remove);

module.exports = router;