const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server, 
    {cors: {
        origin: "*",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true,
    }})

app.use(cors())
app.use(router)

io.on('connection', (socket) => {
    socket.on('onJoin', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        
        if(error) return callback(error)

        socket.join(user.room)

        socket.emit('message', { user: 'admin', text: `${user.name} Welcome! to Room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        io.to(user.room).emit('roomData', { room: user.room, user: getUserInRoom(user.room) })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has Left the Chat.`})
            io.to(user.room).emit('roomData', { room: user.room, user: getUserInRoom(user.room)})
        }
    })

})


server.listen(PORT, () => console.log(`Server is running on ${PORT}`))