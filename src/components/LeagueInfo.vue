<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem; background-color: transparent; border: none;"
      class="mb-2"
    >
      <b-card-title>{{ league.league_name }}</b-card-title>
      <b-card-text>
        Season: {{ league.current_season_name }}
        <br/>
        Stage: {{ league.current_stage_name[0].roundNum }}
      </b-card-text>
      <b-button size="sm" @click="toggle">
        {{ show ? 'Hide' : 'Show' }} Next Game
      </b-button>
      <b-alert
        v-model="show"
        style="background-color: transparent; border: none;"
      >
        <GamePreview
          :id="league.next_game.gameID" 
          :homeTeam="league.next_game.homeTeam" 
          :awayTeam="league.next_game.awayTeam" 
          :date="league.next_game.date" 
          :hours="league.next_game.hours" 
          :field="league.next_game.field"
          :key="league.next_game.gameID">
        </GamePreview>
      </b-alert>
    </b-card>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "LeagueInfo",
  components: {
    GamePreview
  },
 data() {
    return {
      league: {
        league_name: '',
        current_season_name: '',
        current_stage_name: [0],
        next_game: {}
      },
      show: false
    };
  }, 
  methods: {
    async updateLeague(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/leagues/getDetails",
        );
        const league = response.data;
        this.league = league;
        console.log(response);
      } catch (error) {
        console.log("error in update league")
        console.log(error);
      }
    },
    toggle() {
        console.log('Toggle button clicked')
        this.show = !this.show
    }
  }, 
  mounted(){
    console.log("League mounted");
    this.updateLeague(); 
  }
}
</script>

<style>
/* .league-preview {
  display: inline-block;
  width: 350px;
  height: 550px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
} */

b-alert{
  background-color: transparent;
  border: none;
}

</style>