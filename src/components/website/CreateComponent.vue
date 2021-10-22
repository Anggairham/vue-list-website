<template>
  <section class="container">
    <h1>Tambah</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Nama</label>
        <input type="text" class="form-control" placeholder="" v-model="website.nama" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Url</label>
        <input type="text" class="form-control" placeholder="" v-model="website.url" required>
      </div>
      <div>
        <button class="btn btn-success">Submit</button>
      </div>
    </form>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        website: {}
      }
    },
    methods: {
      onSubmit() {
        console.log(this.website)
        this.$store.dispatch("website_list/storeWebsite", this.website).then(() => {
          this.$router.push({name :"home"});
        });
      }
    }
  }
</script>