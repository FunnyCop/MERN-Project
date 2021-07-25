const express = require( "express" )
const router = express.Router()
const app = express()

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

app.post( "/rotation", ( req, res ) => {
    const { rotation } = req.body as { rotation: string } // Comes through as "0deg"
    io.emit( "message", rotation )
    res.json( "success" )
} )

const server = app.listen( 3001, () =>
  console.log( "Listening on 3001" )
)

const io = require( "socket.io" )( server, { cors: true } )

let connected = true

io.on( "connection", socket => {
    console.log( "user connected" )

    // Let one client connect then disconnect all other sockets
    connected ? connected = false : socket.disconnect()
} )