const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const msg = require('./models/msg.model');
const chat = require('express')();
const chat_server = require('http').createServer(chat);
const io = require('socket.io')(chat_server, {
  cors: {
    origin: "http://localhost:3000",
  }
});


io.on('connection', socket => {
  const id = socket.handshake.query.id;
  const username = socket.handshake.query.name;
  const recipient = socket.handshake.query.recipients;
  console.log("1", recipient);
  socket.join(id);
  msg.findOne({$and: [{room: { $in: [recipient]}}, {room: { $in: [id] }}]},
    function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        socket.emit('previous-messages', result.messages);
        // console.log(result.messages);
      }
    });

  // console.log(id);
  // console.log(username);
  socket.on('send-message', ({ recipients, text }) => {
    console.log("2", recipients);
    msg.findOneAndUpdate({$and: [{room: { $in: [recipient]}}, {room: { $in: [id] }}]},
      { $addToSet: { messages: { sender: id, name: username, text: text } } },
      { useFindAndModify: false },
      function (err, result) {
        if (err) {
          console.log(err)
        }
        if (!result) {
          const room = [recipients, id];
          const newmsg = { sender: id, name: username, text: text };
          const messages = [newmsg];
          const conversation = new msg({
            room,
            messages
          });
          conversation.save();
        }
      }).then(() => {
        socket.broadcast.to(recipients).emit('receive-message', {
          sender: id, name: username, text: text
        });
      });
    // recipients.forEach(recipient => {
    //   const newRecipients = recipients.filter(r => r !== recipient)
    //   newRecipients.push(id)
  });
});
// });

// io.on('connection', socket => {
//   console.log('connection made successfully');

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log("User Joined Room: " + data);
//   });

//   socket.on("send_message", (data) => {
//     console.log(data);
//     socket.to(data.room).emit("receive_message", data.content);
//   });

//   socket.on("disconnect", () => {
//     console.log("USER DISCONNECTED");
//   });
//   // socket.on('message', data => {
//   //   console.log('Message received on server: ', data)
//   //   io.emit('message', data)
//   // });
// });

chat_server.listen(3002, () => {
  console.log('I am listening at port: 3002)');
});