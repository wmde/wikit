<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String
  }
})
</script>

<style scoped>
.hello {
  color: #f00;
}
</style>
