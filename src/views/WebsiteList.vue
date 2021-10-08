<template>
 <div>
   <h1>Posts</h1>
    <div >
     <div ></div>
     <div >
      <router-link :to="{ name: 'create' }" >Create Post</router-link>
     </div>
    </div><br />

    <table >
      <thead>
      <tr>
       <th>Title</th>
       <th>Body</th>
       <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="data in datas" :key="data.id">
         <td>{{ data.nama }}</td>
         <td>{{ data.url }}</td>
         <td><router-link :to="{name: 'edit', params: { id: data.id }}" >Edit</router-link></td>
         <td><button @click.prevent="deletePost(post._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
 </div>
</template>

<script>
 export default {
   data() {
    return {
     datas: []
    }
   },
   created() {
   let uri = '//localhost:3000/server/api/website_lists';
   this.axios.get(uri).then(response => {
    this.datas = response.data;
   });
  },
  methods: {
   deletePost(id)
   {
    let uri = `//localhost:3000/server/api/website_lists/${id}`;
    this.axios.delete(uri).then(response => {
     this.datas.splice(this.datas.indexOf(id), 1);
     console.log(response);
    });
   }
  }
 }
</script>