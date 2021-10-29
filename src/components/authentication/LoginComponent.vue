<template>
  <b-container>
      <b-row>
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
              <form @submit.prevent="onSubmit">
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="name@example.com" v-model="login.username">
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control" placeholder="Password" autocomplete="on" v-model="login.password">
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" id="rememberPasswordCheck">
                  <label class="form-check-label" for="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <button class="btn btn-primary btn-block text-uppercase fw-bold" type="submit">Login</button>
                <hr class="my-4">
                <button class="btn btn-success btn-block text-uppercase fw-bold" type="button">Register</button>
              </form>
            </div>
          </div>
        </div>
      </b-row>
    <vue-snotify></vue-snotify>
  </b-container>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  export default {
    computed: {
      ...mapGetters("authentication", ["login", "isSubmited"])
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("authentication/login", this.login)
      }
    },
    beforeCreate() {
      this.$snotify.clear();
    },
    watch: {
      isSubmited(newValue) {
        if (newValue.status == 'success') {
          localStorage.setItem("authenticated",true);
          this.$router.push({
            name: "home"
          });
        } else if (newValue.status == 'failed') {
          this.$snotify.error(newValue.message)
        }
      }
    },
  }
</script>