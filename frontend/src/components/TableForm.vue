<template>
  <form class="row" @submit.prevent="handleSubmit">
    <div>
      <input
        type="text"
        v-model="name"
        placeholder="ФИО"
      >
    </div>
    <div>
      <input
        type="text"
        v-model="position"
        placeholder="Должность"
      >
    </div>
    <div>
      <input
        type="text"
        v-model="salary"
        placeholder="Оклад"
      >
    </div>
    <div>
      <select v-model="status">
        <option
          v-for="status in statuses"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
    </div>
    <div>
      <input type="date" v-model="date">
    </div>
    <button
      type="submit"
      class="submit-btn"
      v-if="(name && status && position && salary && date)"
    >
      Создать
    </button>
  </form>
</template>

<script>
import { nanoid } from 'nanoid'
import { STATUSES, DEFAULT_STATUS } from '@/helpers'

export default {
  name: 'TableForm',
  props: ['createRow'],
  data: () => ({
    name: '',
    position: '',
    status: DEFAULT_STATUS,
    salary: '',
    date: '',
  }),
  computed: {
    statuses: () => STATUSES
  },
  methods: {
    handleSubmit() {
      const { name, status, salary, position, date } = this.$data;
      if (
          !name
          || !status
          || !position
          || !salary
          || !date
      ) {
        return;
      }
      this.createRow({
        id: nanoid(),
        name,
        status,
        salary,
        position,
        date
      })
      this.clearForm()
    },
    clearForm() {
      this.date = ''
      this.name = ''
      this.salary = ''
      this.position = ''
      this.status = DEFAULT_STATUS
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    position: relative;

    .submit-btn {
      position: absolute;
      top: -60px;
      right: 30px;
      line-height: 50px;
      border-radius: 20px;
      background-color: #44c444;
      border: none;
      cursor: pointer;
      padding: 0 15px;
      outline: none;
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;

      &:hover {
        background-color: #7cd07c;
      }
    }
  }

  input, select {
    border: none;
    border-radius: 0;
    height: 100%;
    width: 100%;
    padding: 0 10px;
    font-size: 18px;
  }
</style>
