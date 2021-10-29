<template>
  <b-container>
    <div class="row">
      <div class="col-12">
        <div class="float-left">Website</div>
        <div class="float-right">
          <b-button size="md" class="mr-1" variant="primary" :to="{name: `create`}">Tambah</b-button>
        </div>
      </div>
    </div>
    Loading : {{isSubmited.loading}}, status : {{isSubmited.status}} message : {{isSubmited.message}}
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          description="Control the order when a sortable column header is clicked"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="nama">Domain</b-form-checkbox>
            <b-form-checkbox value="url">Url</b-form-checkbox>
            <b-form-checkbox value="createdAt_format">CreatedAt</b-form-checkbox>
            <b-form-checkbox value="updatedAt_format">UpdatedAt</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Shows"
          label-for="per-page-select"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
            class="col-md-4"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
      </b-col>
    </b-row>
    <!-- Main table element -->
    <b-table striped hover bordered
      :items="websites" 
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <!-- Field No -->
      <template #cell(no)="row">
        {{(row.value - 1) + row.index + 1}}
      </template>
      <!-- Field Url -->
      <template #cell(url)="row">
        <b-link :href="row.item.url" target="_blank">{{row.item.url}}</b-link>
      </template>
      <!-- Field Actions -->
      <template #cell(actions)="row">
        <b-button size="sm" class="mr-1 btn-warning text-white" :to="{name: `edit`, params: { id: row.item.id }}">
          Edit
        </b-button>
        <b-button size="sm" class="mr-1 btn-danger text-white" @click.prevent="deleteAction(row.item.id)">
          Delete
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <!-- Row Details -->
      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col sm="7" md="6" class="mb-2">
        <p class="text-justify">{{this.showingInfo()}}</p>
      </b-col>
      <b-col sm="7" md="6" class="mb-2">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <vue-snotify></vue-snotify>
  </b-container>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        fields: [
          { 
            key: 'no', label: 'No', class: 'text-center', 
            formatter: () => {
              return this.offsetNumber
            }
            ,thStyle:{color : 'red'}
          },
          { key: 'nama', label: 'Domain', sortable: true, class: 'text-center',sortDirection:'desc' },
          {
            key: 'url',
            label: 'Url',
            // formatter: (value, key, item) => {
            //   console.log(key)
            //   console.log(item)
            //   return value ? 'Yes' : 'No'
            // },
            sortable: true,
            // sortByFormatted: true,
            // filterByFormatted: true
          },
          { key: 'createdAt_format', label: 'CreatedAt', sortable: true, class: 'text-center' },
          { key: 'updatedAt_format', label: 'UpdatedAt', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions', class: 'text-center' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15, { value: 100, text: "100" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        offsetNumber: '',
        limitNumber: '',
      }
    },
    computed: {
      ...mapGetters({
        websites: "website_list/websiteList",
        isSubmited: "website_list/isSubmited",
        isSubmitedAuth: "authentication/isSubmited",
      }),
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      // normalizedList () {
      //   return this.websites.map((data) => {
      //     // do your work on this element here 
      //     // this.no++;
      //     // data['no'] = this.no;
      //     // console.log(data)
      //     return data;
      //   })
      // }
    },
    methods: {
      ...mapActions("website_list", ["deleteWebsite"]),
      deleteAction(id) {
        if(confirm("Anda yakin ingin menghapus data ini ?")){
          this.deleteWebsite(id);
        }
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      showingInfo() {
        this.offsetNumber = this.perPage*this.currentPage - (this.perPage - 1)
        this.limitNumber = this.perPage*this.currentPage > this.totalRows ? this.totalRows : this.perPage*this.currentPage;
        return `Showing ${this.offsetNumber} to ${this.limitNumber} of ${this.totalRows} entries`;
      }
    },
    watch: {
      isSubmited(newValue){  
        if(newValue.status == 'success'){
          this.$snotify.success(newValue.message).on("destroyed", () =>
            this.$store.commit("website_list/setIsSubmited",{loading : false,status:'', message:''})
          );
        }else if(newValue.status == 'failed'){
          this.$snotify.error(newValue.message).on("destroyed", () =>
            this.$store.commit("website_list/setIsSubmited",{loading : false,status:'', message:''})
          );
        }
      },
    },
    beforeCreate() {
      this.$snotify.clear();
      // this.$snotify.simple('beforeCreate');
    },
    created() {
      // this.$snotify.success('Created');
    },
    mounted() {
      if(this.isSubmited.status == 'success'){
        this.$snotify.success(this.isSubmited.message);
        this.$store.commit("website_list/setIsSubmited",{loading : false,status:'', message:''});
      }
      if(this.isSubmitedAuth.status == 'success'){
        this.$snotify.success(this.isSubmitedAuth.message);
        this.$store.commit("authentication/setIsSubmited",{loading : false,status:'', message:''});
      }
      this.$store.dispatch("website_list/getWebsiteLists").then(() => {
        this.totalRows = this.websites.length;
      });
    },
  }
</script>