<template>
  <div class="home">
    <IndexComponent/>
  </div>
</template>
<script>
// @ is an alias to /src
import IndexComponent from '@/components/IndexComponent.vue'

export default {
  name: 'Home',
  components: {
    IndexComponent
  }
}
</script>