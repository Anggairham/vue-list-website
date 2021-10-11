<template>
  <div>
     <CreateComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateComponent from '@/components/website/CreateComponent.vue'

export default {
  name: 'About',
  components: {
    CreateComponent
  }
}
</script>