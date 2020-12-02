export default function (storage) {
  storage.subscribe(mutation => {
    const actions = ['setRowValue', 'addRow']
    if (actions.includes(mutation.type)) {
      localStorage.setItem('table', JSON.stringify(storage.state.rows))
    }
  })
}
