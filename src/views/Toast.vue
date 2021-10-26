<template>
  <div class="text-center">
    <img alt="Vue logo" src="../assets/logo.png">
     <p>{{test}}</p>
     <a href="https://artemsky.github.io/vue-snotify/documentation" target="_blank">Documention</a>
     <br>
     <a href="https://artemsky.github.io/vue-snotify" target="_blank">Example vue-snotify</a>
     <vue-snotify></vue-snotify>
  </div>
</template>

<script>

export default {
    data() {
        return {
            test : 'Hai'
        }
    },
    beforeCreate() {
      this.$snotify.simple('beforeCreate');
    },
    created() {
      this.$snotify.success('Created');
    },
    beforeMount() {
      this.$snotify.info('beforeMount');
    },
    mounted() {
        this.test = "Berubah"
      this.$snotify.error('Mounted');
    },
    beforeUpdate() {
      this.$snotify.error('beforeUpdate');
    },
    updated() {
      this.$snotify.error('updated');
      // this.$destroy();
    },
    beforeDestroy() {
      console.log('beforeDestroy')
      // this.$snotify.info('beforeDestroy');
    },
    destroyed() {
      console.log('destroyed')
      // this.$snotify.info('destroyed');
    },
}
</script>