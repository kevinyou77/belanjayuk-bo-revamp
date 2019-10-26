<template>
  <div class="list">
    <div class="box-underline">
      <span class="heading heading-default">{{ header.title }}</span>
      <b-button
        v-for="(item, index) in header.actions"
        @click="item.action()"
        :key="index"
        variant="primary"
        class="mt-3" >
        {{ item.actionTitle }}
      </b-button>
    </div>
    <b-table
      :fields="fields"
      :items="items"
      show-empty>
        <template v-slot:empty="items">
          <h4>Tidak ada data</h4>
        </template>

      <template v-slot:cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <template
        v-if="hasActions"
        v-slot:cell(actions)="row">
        <b-button
          v-for="(action, index) in actions"
          @click="action.handle(row.item)"
          :key="index"
          :variant="action.variant"
          class="mr-1">
          {{ action.name }}
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: [
    'items',
    'actions',
    'fields',
    'header'
  ],
  computed: {
    hasActions () {
      return !!this.actions
    }
  },
  mounted () {
    console.log(this.actions)
  }
}
</script>