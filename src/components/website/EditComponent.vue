<template>
  <div>
    <h1>Edit</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="website !== null">
        <div>
          <label>Nama:</label>
          <input type=text v-model="website.nama">
        </div>
        <div>
          <label>Url:</label>
          <input type=text v-model="website.url">
        </div>
        <div>
          <button>Update</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {
    mapGetters, mapActions
  } from "vuex";
  export default {
    data() {
      return {
        id: null
      };
    },
    computed: { ...mapGetters("website_list",["website"]) },
    created: function () {
      this.id = this.$route.params.id;
      this.fetchDetailWebsite(this.id);
    },
    methods: {
      ...mapActions("website_list", ["updateWebsite", "fetchDetailWebsite"]),
      onSubmit() {
        const {
          nama,
          url
        } = this.website;
        // return false;
        this.updateWebsite({
          id: this.id,
          nama: nama,
          url: url,
        });
        this.$router.push({name :"home"});
      }
    },
  }
</script>