
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('CodeArena backend up'))

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)
  socket.on('join-room', (room: string) => {
    socket.join(room)
    socket.to(room).emit('user-joined', socket.id)
  })
  socket.on('disconnect', () => console.log('socket disconnected', socket.id))
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
