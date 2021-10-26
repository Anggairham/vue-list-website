<template>
  <section class="container">
    <h1>Edit</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="website !== null">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input type="text" class="form-control" placeholder="" v-model="website.nama" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Url</label>
          <input type="text" class="form-control" placeholder="" v-model="website.url" required>
        </div>
        <div>
          <button class="btn btn-success">Update</button>
        </div>
      </div>
    </form>
    Loading : {{isSubmited.loading}}, status : {{isSubmited.status}} message : {{isSubmited.message}}
    <vue-snotify></vue-snotify>
  </section>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        id: null
      };
    },
    computed: {
      ...mapGetters("website_list", ["website","isSubmited"])
    },
    created: function () {
      this.id = this.$route.params.id;
      this.fetchDetailWebsite(this.id);
    },
    methods: {
      ...mapActions("website_list", ["updateWebsite", "fetchDetailWebsite"]),
      onSubmit() {
        this.updateWebsite({id: this.id,nama: this.website.nama,url: this.website.url,})
      }
    },
    beforeCreate() {
      this.$snotify.clear();
    },
    watch: {
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