import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import websocketPlugin from '@/plugins/websocketPlugin'
import localStoragePlugin from '@/plugins/localStoragePlugin'

export default new Vuex.Store({
  state: {
    load: false,
    error: false,
    id: null,
    rows: [],
    selectedCells: [],
  },
  mutations: {
    setLoad: (state, payload) => state.load = payload,
    
    setError: (state, payload) => state.error = payload ,
    
    addRow: (state, payload) => state.rows.push(payload),

    setRows: (state, rows) => state.rows = rows,

    setRowValue: (state, { key, value, id}) => {
      const index = state.rows.findIndex(r => r.id === id)
      state.rows[index][key] = value
    },
    
    addSelectedCell: (state, payload) => {
      state.selectedCells.push({
        token: state.id,
        id: payload.id
      })
    },
    
    removeSelectedCell: (state) => {
      state.selectedCells = state.selectedCells.filter(c => {
        return c.token !== state.id
      })
    },
    
    setSelectedCells: (state, payload) => state.selectedCells = payload,
    
    setId: (state, payload) => state.id = payload
  },
  actions: {
    createRow: ({commit}, data) => {
      commit('addRow', data)
    },
    
    changeRow: ({ commit }, data) => {
      commit('setRowValue', data)
    },
    
    selectCell: ({ commit }, data) => {
      commit('addSelectedCell', data)
    },
    
    unselectCell: ({ commit }) => {
      commit('removeSelectedCell')
    }
  },
  getters: {
    rows: state => state.rows,
    selectedCells: state => {
      return state.selectedCells.map(cell => {
        if (cell.token === state.id) return
        return cell.id
      })
    },
    load: state => state.load,
    error: state => state.error
  },
  plugins: [
    websocketPlugin,
    localStoragePlugin,
  ],
})
