const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const ws = require('ws');

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    let sockets = [];
    const socketServer = new ws.WebSocketServer({
      server
    })
    socketServer.on('connection', (socket) =>{
      sockets.push(socket);
      socket.on('message', (data) =>{
        sockets.filter(s => s !== socket).forEach(socket => {
          socket.send(data.toString());
        })
      })
      socket.on('close', () =>{
        sockets = sockets.filter(s => s !== socket);
      })
    })
  } catch (ex) {
    console.log(ex)
  }
}

init()
