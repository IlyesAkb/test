export default function (storage) {
  storage.subscribe(mutation => {
    const actions = ['setRowValue', 'addRow']
    if (actions.includes(mutation.type)) {
      console.log('localStorage plugin: ', storage)
    }
  })
}
