<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="nav-link active" :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

        <b-nav-item class="nav-link active" :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item class="nav-link active" :to="{ name: 'league' }">League</b-nav-item>
        <b-nav-item v-bind:class="getClass()" :to="{ name: 'management' }">Management</b-nav-item>
        <b-nav-item class="nav-link active" :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            {{ $root.store.username }}
          </template>
          <b-dropdown-item href="#">Favorites</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isRep: false
    }
  },
  methods: {
    async Logout() {
        const response = await this.axios.post(
          "http://localhost:3000/Logout"
        );
      this.$root.store.logout();
      this.isRep = false;
      this.$root.store.removeQuery();
      this.$root.store.removeResults();
      this.$root.store.removeFavoItems();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    getClass() {
      if (this.isRep) {
        return {
          'nav-link active': "nav-link active"
        }
      } else {
        return {
          'nav-link disabled': "nav-link disabled"
          };
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url('https://media.tenor.com/images/4c8ac2554cec21fe79fdc76cb1de2155/tenor.gif');
  background-repeat: no-repeat;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
