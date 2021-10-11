<template>
  <div>
    <h1>Tambah</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Nama:</label>
        <input type="text" v-model="website.nama" required>
      </div>
      <div>
        <label>Url:</label>
        <input type="text" v-model="website.url" required>
      </div>
      <div>
        <button>Tambah</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        website: {
          nama: "nama",
          url: "url",
        }
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