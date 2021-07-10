<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch"
      style="display: flex">
      <b-input-group prepend="Search Query:" id="search-input">
        <b-form-input v-model="form.searchQuery" required></b-form-input>
      </b-input-group>
      <b-form-select 
        id="search-select"
        v-model="form.searchType"
        :options="[{ value: null, text: 'Choose Type to Search', disabled: true},'All', 'player', 'team']"
        style="width: 250px"
        required>
      </b-form-select>
      <b-input-group-append>
        <b-button type="submit" variant="success">Search</b-button>
      </b-input-group-append>
    </b-form>
    <p style="margin-left: 20px">Your search Query: {{ this.form.searchQuery }}</p>
    <Search
      :players="results.players"
      :teams="results.teams"
    ></Search>
  </div>
</template>

<script>
import Search from "../components/Search.vue";

export default {
  name: "SearchPage",
  components: {
    Search
  },
  data() {
    return {
      form: {
        searchQuery: "",
        searchType: ""
      },
      filter: {

      },
      results: {
        players: [],
        teams: []
      }
    };
  },
  methods: {
    async Search() {
      try {
        var response;
        if (this.form.searchType === "All") {
          response = await this.axios.post(
            "http://localhost:3000/search",
            {
              freeSearch: this.form.searchQuery
            }
          );
        } else {
          response = await this.axios.post(
            "http://localhost:3000/search",
            {
              freeSearch: this.form.searchQuery,
              precise: this.form.searchType
            }
          );
        }
        this.results = response.data;
        this.$root.store.setQuery(JSON.stringify({
          searchQuery: this.form.searchQuery,
          searchType: this.form.searchType
        }));
        this.$root.store.setResults(JSON.stringify(response.data));
        if (this.results.players.length == 0 && this.results.teams.length == 0) {
          this.$root.toast("Results", "There weren't any Results", "danger");
        }
        console.log(response);
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      this.Search();
    }
  },
  mounted(){
    if(JSON.parse(this.$root.store.searchResults) && JSON.parse(this.$root.store.query).searchQuery) {
      this.results = JSON.parse(this.$root.store.searchResults);
      this.form.searchQuery = JSON.parse(this.$root.store.query).searchQuery;
      this.$forceUpdate();
    }
  } 
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>