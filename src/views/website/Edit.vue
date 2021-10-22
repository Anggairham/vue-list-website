<template>
  <div>
     <EditComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import EditComponent from '@/components/website/EditComponent.vue'

export default {
  name: 'About',
  components: {
    EditComponent
  }
}
</script>