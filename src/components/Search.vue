<template>
  <div>
    <div>
      <h1>Players</h1>
      <b-button v-on:click="sort('players')">a..z</b-button>
    </div>
    <div>
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
    <div>
      <h1>Teams</h1>
      <b-button v-on:click="sort('teams')">a..z</b-button>
    </div>
    <div>
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

    }
  },
  mounted(){
    console.log("search mounted")
  } 
}
</script>

<style>

</style>