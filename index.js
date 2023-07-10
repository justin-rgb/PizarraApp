const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
//Llamar al modulo CORS para que no lo bloquee el hosting
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

require('./src/socket')(io)

//SE CAMBIA EL PUERTO PARA QUE NO LO BLOQUEE EL HOSTING
app.set('port', process.env.PORT_DEV || 5000)
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(cors())



server.listen( app.get('port'), ()=>{
    console.log(`La app esta corriendo en el puerto ${app.get('port')}`)
})
