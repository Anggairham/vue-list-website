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
          <th>CreatedAt</th>
          <th>UpdatedAt</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in websites" :key="data.id">
          <td>{{ data.nama }}</td>
          <td>{{ data.url }}</td>
          <td>{{ data.createdAt_format }}</td>
          <td>{{ data.updatedAt_format }}</td>
          <td>
            <router-link :to="{name: `edit`, params: { id: data.id }}"><button type="button"
                class="btn btn-sm btn-warning text-white">Edit</button></router-link>
            &nbsp;
            <button class="btn btn-sm btn-danger" @click.prevent="deleteAction(data.id)">Delete</button>
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
  //      datas: {websites:]
  // }   }
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
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        msg: 'Welcome to my Vuex Store'
      }
    },
    computed: {
      ...mapGetters("website_list", {
        websites: "websiteList"
      })
    },
    methods: {
      ...mapActions("website_list", ["deleteWebsite"]),
      deleteAction(id) {
        if(confirm("Anda yakin ingin menghapus data ini ?")){
          this.deleteWebsite(id);
        }
      },
    },
    mounted() {
      this.$store.dispatch("website_list/getWebsiteLists");
    }
  }
</script>