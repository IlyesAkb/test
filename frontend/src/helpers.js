export const STATUSES = ['Соискатель', 'Сотрудник', 'Уволен']
export const DEFAULT_STATUS = 'Соискатель'

export const ROW_CELLS = [
  {
    type: 'text',
    key: 'name'
  },
  {
    type: 'text',
    key: 'position'
  },
  {
    type: 'text',
    key: 'salary'
  },
  {
    type: 'select',
    key: 'status',
    options: STATUSES
  },
  {
    type: 'date',
    key: 'date'
  },
]
