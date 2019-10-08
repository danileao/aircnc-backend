const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");
const path = require("path");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-ieixk.mongodb.net/omnistack9?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

io.on("connection", socket => {
  //socket is the user connection
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
// app.use(cors( {origin: 'http://localhost:3000'} ));
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
