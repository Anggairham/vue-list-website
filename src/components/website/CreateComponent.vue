<template>
  <section class="container">
    <h1>Tambah</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Nama</label>
        <input type="text" class="form-control" placeholder="" v-model="website.nama">
      </div>
      <div class="mb-3">
        <label class="form-label">Url</label>
        <input type="text" class="form-control" placeholder="" v-model="website.url">
      </div>
      <div>
        <button class="btn btn-success">Submit</button>
      </div>
    </form>
    Loading : {{isSubmited.loading}}, status : {{isSubmited.status}} message : {{isSubmited.message}}
    <vue-snotify></vue-snotify>
  </section>
</template>

<script>
import {
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        website: {}
      }
    },
    computed: { ...mapGetters("website_list",["isSubmited"]) },
    methods: {
      onSubmit() {
        this.$store.dispatch("website_list/storeWebsite", this.website).then(() => {
          // this.$router.push({name :"home"});
        });
      }
    },
    beforeCreate() {
      this.$snotify.clear();
    },
    watch: {
      // isSubmited(newValue, oldValue){
      //   console.log(`Updating from ${oldValue} to ${newValue}`);
      // }
      isSubmited(newValue){
        if(newValue.status == 'success'){
          this.$router.push({name :"home"});
        }else if(newValue.status == 'failed'){
          this.$snotify.error(newValue.message)
        }
      }
    },
  }
</script>