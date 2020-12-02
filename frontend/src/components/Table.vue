<template>
  <div class="container">
    <div v-if="!load || error" class="placeholder">
      <h1>{{ error ? 'Разрыв соединения...' : 'Идет соединение...' }}</h1>
    </div>
    <div class="head">
      <div class="row">
        <div>ФИО</div>
        <div>Должность</div>
        <div>Оклад</div>
        <div>Статус</div>
        <div>Дата приема на работу</div>
      </div>
    </div>
    <div class="viewport">
      <TableRow
        v-for="row in rows"
        :key="row.id"
        :id="row.id"
        :name="row.name"
        :position="row.position"
        :salary="row.salary"
        :status="row.status"
        :date="row.date"
        :selected="selectedCells"
        @rowChanged="changeRow"
        @onSelect="selectCell"
        @onUnselect="unselectCell"
      />
    </div>
    <div class="bottom">
      <TableForm :create-row="createRow" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableRow from '@/components/TableRow'
import TableForm from '@/components/TableForm'

export default {
  name: 'Table',
  components: {
    TableRow,
    TableForm,
  },
  computed: mapGetters([
    'rows',
    'selectedCells',
    'load',
    'error',
  ]),
  methods: mapActions([
    'createRow',
    'changeRow',
    'selectCell',
    'unselectCell',
  ]),
}
</script>

<style lang="scss">
$table-vertical-padding: 50px;
$border-color: rgba(0, 0, 0, .3);

.placeholder {
  position: absolute;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.container {
  box-sizing: border-box;
  height: 100vh;
  padding: $table-vertical-padding 0 $table-vertical-padding 0;
}

.head, .bottom {
  width: 100%;
  position: fixed;
  left: 0;
  height: $table-vertical-padding;
}

.head {
  top: 0;
  text-align: center;
  font-weight: bolder;

  & .row {
    height: 100%;
    border-bottom: 3px solid #000000;

    & > div {
      padding: 0 10px;
      border-right: 3px solid #000000;
    }
  }
}

.bottom {
  border-top: 3px solid #000000;;
  bottom: 0;
}

.viewport {
  height: 100%;
  overflow-y: scroll;
  padding: 0 0 300px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.row {
  display: flex;
  width: 100%;
  height: $table-vertical-padding;
  border-bottom: 1px solid $border-color;

  & > div {
    width: 15%;
    height: 100%;
    border-right: 1px solid $border-color;
    line-height: $table-vertical-padding;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:first-child {
      width: 40%;
    }

    &:last-child {
      border-right: none;
    }
  }
}
</style>
