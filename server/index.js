const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const path = require("path");
app.use(cors());
const authRoutes = require("./routes/auth");
const user = require("./models/user");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// const io=require("socket.io")(process.env.PORT,{
//   cors:{
//     origin:"http://localhost:3000"
//   }
// })

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongoDB"))
  .catch((err) => console.log(err));

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    let user = getUser(receiverId);
    if (user !== undefined) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });
  socket.emit("me", socket.id);

  socket.on("calluser", (data) => {
    let user = getUser(data.userToCall);
    if (user !== undefined) {
      io.to(user.socketId).emit("callUser", {
        signal: data.signalData,
        from: data.from, 
      });
    }
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  //for the famzones
  socket.on("sending signal", data => {

    let user = getUser(data.userToSignal);
    if(user!==undefined){
      io.to(user.socketId).emit('friendJoined', { signal: data.signal, callerId: data.callerId });
    }
   
    });

  socket.on("returning signal", data => {
    io.to(data.callerId).emit('receivingFriendSignal', { signal: data.signal, id: socket.id });
    });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use("/auth", authRoutes);
const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
