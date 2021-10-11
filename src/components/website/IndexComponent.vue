<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
      <div class="float-start">Website</div>
      <div class="float-end">
        <router-link :to="{ name: 'create' }"><button type="button" class="btn btn-primary">Tambah</button>
        </router-link>
      </div>
      </div>
    </div>

    <table class="table table-responsive">
      <thead>
        <tr>
          <th>Domain</th>
          <th>Down/Up</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in websites" :key="data.id">
          <td>{{ data.nama }}</td>
          <td>{{ data.url }}</td>
          <td>
            <router-link :to="{name: `edit`, params: { id: data.id }}"><button type="button"
                class="btn btn-sm btn-warning text-white">Edit</button></router-link>
            &nbsp;
            <button class="btn btn-sm btn-danger" @click.prevent="deletePost(data.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  //  export default {
  //    data() {
  //     return {
  //      datas: []
  //     }
  //    },
  //    created() {
  //    let uri = '//localhost:3000/server/api/website_lists';
  //    this.axios.get(uri).then(response => {
  //     this.datas = response.data;
  //    });
  //   },
  //   methods: {
  //    deletePost(id)
  //    {
  //     let uri = `//localhost:3000/server/api/website_lists/${id}`;
  //     this.axios.delete(uri).then(response => {
  //      this.datas.splice(this.datas.indexOf(id), 1);
  //      console.log(response)
  //     });
  //    }
  //   }
  //  }
  export default {
    data() {
      return {
        msg: 'Welcome to my Vuex Store'
      }
    },
    computed: {
      websites() {
        return this.$store.state.website_list.websites
      }
    },
    mounted() {
      this.$store.dispatch("website_list/getWebsiteLists");
    }
  }
</script>