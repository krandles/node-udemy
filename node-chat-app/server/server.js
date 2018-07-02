const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app)
const io = socketIO(server)



app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || (!isRealString(params.room))) {
      callback('Name and room name are required')
    }
    callback()
  })

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
    callback()
  })
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
  })
})


server.listen(port, () => console.log(`Listening on port ${port}`));