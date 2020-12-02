<template>
  <div class="row">
    <div
      v-for="cell in cells"
      :class="{selected: selected.includes(`${id}:${cell.key}`)}"
    >
      <select
        v-if="cell.type === 'select'"
        @change="handleRowChange($event, cell.key)"
        @mousedown="handleFocus($event, `${id}:${cell.key}`)"
        @focus="handleFocus($event, `${id}:${cell.key}`)"
        @blur="handleBlur($event, `${id}:${cell.key}`)"
      >
        <option
          v-for="(item) in cell.options"
          :value="item"
          :selected="item === status"
        >
          {{ item }}
        </option>
      </select>

      <input
        v-else
        :type="cell.type"
        :value="$props[cell.key]"
        @input="handleRowChange($event, cell.key)"
        @focus="handleFocus($event, `${id}:${cell.key}`)"
        @blur="handleBlur($event, `${id}:${cell.key}`)"
      >
    </div>
  </div>
</template>

<script>
import { STATUSES, ROW_CELLS } from '@/helpers'

export default {
  name: 'TableRow',
  props: [
    'name',
    'position',
    'status',
    'salary',
    'date',
    'id',
    'selected'
  ],
  computed: {
    statuses: () => STATUSES,
    cells: () => ROW_CELLS,
  },
  methods: {
    handleRowChange(event, key) {
      const value = event.target.value
      if (this.$props[key] === value.trim()) {
        return
      }
      const id = this.$props.id
      this.$emit('rowChanged', { id, key, value})
    },
    handleFocus(event, id) {
      if (this.selected.includes(id)) {
        event.preventDefault()
        event.target.blur()
        return
      }
      this.$emit('onSelect', id )
    },
    handleBlur(event, id) {
      if (this.selected.includes(id)) return
      this.$emit('onUnselect')
    }
  },
}
</script>

<style lang="scss" scoped>
input, select {
  border: none;
  height: 100%;
  width: 100%;
  border-radius: 0;
  padding: 10px;
  font-size: 18px;
}

.selected {
  outline: 2px solid red;
  z-index: 99;
}
</style>
