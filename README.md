# Digital Tutoring and Collaborative Meeting Platform

The project is aimed at building a digital meeting platform which has the following features:
 - The web application has a one screen User Interface which includes the three sections (whiteboard, participants list, meet sentiment, and messaging box)
 - Collaborative Whiteboard
 - Participant’s sentiment about the meeting
 - Chats (with hate speech detection)

## Frontend work
The work in the front-end part includes designing of the different components using React, HTML, and CSS. These components include Login, Signup, Homepage, Dashboard, Room page. The frontend work also includes writing the code for fetching data from the backend (details of users, rooms) and also establishing a socket connection with the server and writing functions for handling different events from the server.

## Backend work
The backend work includes writing the code for the Node.js server. Our app uses Express.js at the backend. We have used MongoDB to store the data as documents. Then we have created models for the rooms, users and wrote API end points to facilitate the addition and deletion of the rooms. The user’s database also has an important feature of saving hashed passwords to make application more secure. The other part was accepting socket connections from the server and also writing code to handle events from the client.

## Screenshots
![image](https://user-images.githubusercontent.com/62594900/155007213-8f8901d2-4c29-44a1-8150-6eb26a92e657.png)
![image](https://user-images.githubusercontent.com/62594900/155007227-9806a967-ef0c-4469-bd4b-86294811a61d.png)
![image](https://user-images.githubusercontent.com/62594900/155007239-6ff8e1e4-409e-4dbd-a71e-21c8ee347899.png)
![image](https://user-images.githubusercontent.com/62594900/155007249-2016c9fb-9ca9-410c-bf4a-ff3ff1ec76cb.png)
![image](https://user-images.githubusercontent.com/62594900/155007254-531d6a11-971d-4956-b83c-88811807be3b.png)

# Authors
- [@sauravshekharsingh](https://www.github.com/sauravshekharsingh)
- [@aktamoli0910](https://github.com/aktamoli0910)
- [@kartikey134](https://github.com/kartikey134)
