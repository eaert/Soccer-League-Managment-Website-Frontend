<template>
  <div>
    <h1>League Teams:</h1>
    <div class="teams">
      <TeamPreview
        v-for="t in teams"
        :teamID="t.id" 
        :teamname="t.name" 
        :shortname="t.short_code" 
        :founded="t.founded" 
        :logo="t.logo_path" 
        :key="t.id"></TeamPreview>
    </div>
    <div>
      <b-tabs content-class="mt-3">
          <b-tab title="Currently Games">
            <div style="display: flex;">
                <GamePreview
                    v-for="g in currGames"
                    :id="g.gameID" 
                    :homeTeam="g.homeTeam" 
                    :awayTeam="g.awayTeam" 
                    :date="g.date" 
                    :hours="g.hours" 
                    :field="g.field"
                    :key="g.gameID">
                </GamePreview>
            </div>
          </b-tab>
          <b-tab title="Previues Games">
            <div style="display: flex;">
                <PrevGame
                    v-for="g in prevGames"
                    :game="g.game" 
                    :gameLog="g.log" 
                    :key="g.game.gameID">
                </PrevGame>
            </div>
          </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import TeamPreview from "../components/TeamPreview.vue";
import GamePreview from "../components/GamePreview.vue";
import PrevGame from "../components/PrevGame.vue";

export default {
    name: "LeaguePage",
    components: {
        TeamPreview,
        GamePreview,
        PrevGame
    },
    data() {
        return {
            teams: [],
            prevGames: [],
            currGames: [],
            isLoading: true
        }
    },
    methods: {
        async getLeagueData() {
            try{
                const response = await this.axios.get(
                    "http://localhost:3000/leagues/getFullDetails",
                );
                this.teams = response.data.teams;
                this.prevGames = response.data.prev_games;
                this.currGames = response.data.next_games;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        console.log("LeaguePage mounted");
        this.isLoading = true;
        this.getLeagueData();
    }

}
</script>

<style>
.teams {
    display: flex;
    flex-wrap: wrap;
}
</style>