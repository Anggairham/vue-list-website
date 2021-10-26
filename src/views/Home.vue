<template>
  <div class="home">
    <IndexComponent/>
  </div>
</template>
<script>
// @ is an alias to /src
import IndexComponent from '@/components/website/IndexComponent.vue'
// @import "~vue-snotify/styles/dark";

export default {
  name: 'Home',
  components: {
    IndexComponent
  }
}
</script>