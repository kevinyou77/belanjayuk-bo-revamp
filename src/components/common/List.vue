<template>
  <div class="list">
    <div class="list-header">
      <div class="list-header-item">
        <span class="header-item-title">
          No
        </span>
      </div>
    </div>

    <div class="list-content">
      <div class="list-content-row">
        <span class="list-content-row-data">
          pcs
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'header',
    'data'
  ]
}
</script>