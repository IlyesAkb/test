const http = require('http')
const socketIO = require('socket.io')
const PORT = 5000

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end()
})

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:8080'
  }
})

let selectedCells = []
let dataToken = 1606919454321;
const DB = require('./data')

io.on('connection', socket => {
  
  socket.on('disconnect', () => {
    selectedCells = selectedCells.filter(c => c.token !== socket.id)
    socket.broadcast.emit('unselected', selectedCells)
  })
  
  socket.emit('connected', {
    connectionId: socket.id,
    table: DB,
    selectedCells,
    dataToken
  })
  
  socket.on('refresh', () => {
    socket.emit('refreshed', {
      table: DB,
      dataToken
    })
  })
  
  socket.on('unselect', () => {
    selectedCells = selectedCells.filter(c => c.token !== socket.id)
    socket.broadcast.emit('unselected', selectedCells)
  })
  
  socket.on('select', cellId => {
    selectedCells.push({
      token: socket.id,
      id: cellId
    })
    
    socket.broadcast.emit('selected', selectedCells)
  })
  
  socket.on('create', request => {
    DB.push(request.data)
    dataToken = request.dataToken
    socket.broadcast.emit('created', request.data)
    socket.broadcast.emit('tokenUpdated', request.dataToken)
    socket.emit('tokenUpdated', request.dataToken)
  })
  
  socket.on('change', request => {
    const { key, value, id} = request.data
    const index = DB.findIndex(row => row.id === id)
    DB[index][key] = value
    dataToken = request.dataToken
    socket.broadcast.emit('changed', request.data)
    socket.broadcast.emit('tokenUpdated', request.dataToken)
    socket.emit('tokenUpdated', request.dataToken)
  })
})

server.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
})
