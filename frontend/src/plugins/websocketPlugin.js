import io from "socket.io-client"

const socket = io('http://localhost:5000')

export default function(store) {
  socket.on('disconnect', () => {
    store.commit('setLoad', false)
    store.commit('setError', true)
  })
  
  socket.on('connected', response => {
    store.commit('setSelectedCells', response.selectedCells)
    store.commit('setId', response.connectionId)
    const dataToken = +JSON.parse(localStorage.getItem('dataToken'))
    
    if (!dataToken || dataToken !== response.dataToken) {
      socket.emit('refresh')
      return
    }
    
    const table = JSON.parse(localStorage.getItem('table'))
    store.commit('setRows', table)
    store.commit('setLoad', true)
    store.commit('setError', false)
  })
  
  socket.on('refreshed', data => {
    localStorage.setItem('table', JSON.stringify(data.table))
    localStorage.setItem('dataToken', data.dataToken)
    store.commit('setRows', data.table)
    store.commit('setLoad', true)
    store.commit('setError', false)
  })
  
  socket.on('created', data => store.commit('addRow', data))
  socket.on('changed', data => store.commit('setRowValue', data))
  socket.on('selected', data => store.commit('setSelectedCells', data))
  socket.on('unselected', data => store.commit('setSelectedCells', data))
  socket.on('tokenUpdated', data => localStorage.setItem('dataToken', data))
  
  store.subscribeAction(action => {
    switch (action.type) {
      case 'selectCell':
        socket.emit('select', action.payload)
        break
      case 'unselectCell':
        socket.emit('unselect')
        break
      case 'changeRow':
        socket.emit('change', {
          dataToken: Date.now(),
          data: action.payload
        })
        break
      case 'createRow':
        socket.emit('create', {
          dataToken: Date.now(),
          data: action.payload
        })
        break
      default:
        return
    }
  })
}
