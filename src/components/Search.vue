<template>
  <div>
    <b-form @submit.prevent="onFilter" id="filterForm">
      <b-input-group prepend="Team" id="team-group">
        <b-form-select
          id="team-select"
          v-model="filter.team"
          :options="[{ value: null, text: 'Choose Position to ', disabled: true}, 'All','1', '2', '3', '4']"
          style="width: 100px">
        </b-form-select>
      </b-input-group>
      <b-input-group prepend="Position" id="position-group">
        <b-form-select
          id="team-select"
          v-model="filter.position"
          :options="[{ value: null, text: 'Choose Position to Filter', disabled: true}, 'All',1, 2, 3, 4]"
          style="width: 100px"
          required>
        </b-form-select>
      </b-input-group>
      <b-input-group-append id="filter-button">
        <b-button type="submit" variant="info">Filter</b-button>
      </b-input-group-append>
    </b-form>
    <div class="data">
      <h1>Players</h1>
      <b-button v-on:click="sort('players')">a..z</b-button>
    </div>
    <div id="playersDivs" class="data" v-if="players.length > 0">
      <PlayerPreview
        v-for="p in players"
        :id="p.playerID" 
        :firstname="p.firstname" 
        :lastname="p.lastname" 
        :playerteam="p.team_name" 
        :position="p.position"
        :nation="p.nation" 
        :image="p.image"
        :key="p.id"></PlayerPreview>
    </div>
    <div class="data">
      <h1>Teams</h1>
      <b-button v-on:click="sort('teams')">a..z</b-button>
    </div>
    <div class="data"  v-if="teams.length > 0">
      <TeamPreview
      v-for="t in teams"
      :teamID="t.teamID" 
      :teamname="t.teamname" 
      :shortname="t.shortname" 
      :founded="t.founded" 
      :logo="t.logo" 
      :key="t.teamID"></TeamPreview>
    </div>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
import TeamPreview from "./TeamPreview.vue";

export default {
 name: "SearchComp",
 components: {
    PlayerPreview,
    TeamPreview
  }, 
  data() {
    return {
      filter: {

      },
      teamsNames: []
    }
  },
  props: {
      players: {
        type: Array,
        required: true
      },
      teams: {
        type: Array,
        required: true
      }
  }, 
  methods: {
    sort(type) {
      if(type === 'players'){
        this.players.sort((x, y) => { 
          if(x.firstname < y.firstname) {
            return -1;
          } else if (x.firstname > y.firstname) {
            return 1;
          } return 0;
        });
      } else {
          this.teams.sort((x, y) => { 
            if(x.teamname < y.teamname) {
              return -1;
            } else if (x.teamname > y.teamname) {
              return 1;
            } return 0;
          });
      }
    },
    FilterData() {
      let children = this.$children;
      children.forEach(child => {
        if (child.position) {
          let display = true;
        if (this.filter.team !== "All") {
          if (child.playerteam === this.filter.team) {
            console.log("display player")
            display = true;
          } else {
            console.log("display none")
            display = false;
          }
        } else {
          console.log('display player')
          display = true;
        }
        if (this.filter.position !== "All" && display) {
            if (child.position === this.filter.position ) {
              console.log("display player")
              display = true;
            } else {
              console.log("display none")
              display = false;
            }
        } else {
          console.log("display player")
          display = true;
        }
        child.display(display);
        }
      });
    },
    onFilter() {
      this.FilterData();
    }
  },
  mounted(){
    console.log("search mounted")
  } 
}
</script>

<style>

#filterForm {
  display: flex; 
  width: 500px;
  margin-left: 20px;
}

.data {
  display: flex;
  flex-wrap: wrap;
}

.data .b-button {
  margin-left: 20px;
  height: 30px;
  margin-top: 5px;
}
</style>