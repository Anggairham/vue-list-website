<template>
  <div id="app">
    <div id="nav" class="text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vuex">Vuex</router-link> |
      <router-link to="/toast">Toast</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <button @click="logout">Logout</button>
    </div>
    <transition name=fade>
    <router-view/>
    </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
  export default {
    methods: {
      logout(){
        localStorage.setItem("authenticated",false)
        this.$router.push({name: "login"})
      }
    },
  }
</script>