<template>
  <div class="home">
    <LoginComponent/>
  </div>
</template>
<script>
// @ is an alias to /src
import LoginComponent from '@/components/authentication/LoginComponent.vue'

export default {
  components: {
    LoginComponent
  }
}
</script>