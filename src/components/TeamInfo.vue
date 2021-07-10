<template>
    <div>
      <div v-if="this.loading">
      <h1>Team Page</h1>
      <div class="TeamDetails">
      <b-card
        :title="team.teamname"
        :img-src="team.logo"
        img-alt="Image"
        img-height="150px"
        img-width="100px"
        img-left>
        <b-list-group>
          <b-list-group-item>Team ID: {{ team.teamID }}</b-list-group-item>
          <b-list-group-item>Short Name: {{ team.shortname }}</b-list-group-item>
          <b-list-group-item>Founded: {{ team.founded }}</b-list-group-item>
        </b-list-group>
      </b-card>
      </div>
      <div>
      <b-tabs content-class="mt-3">
          <b-tab title="Currently Games">
            <div class="rowDisplay">
              <GamePreview
                  v-for="cg in currGames"
                  :id="cg.gameID" 
                  :homeTeam="cg.homeTeam" 
                  :awayTeam="cg.awayTeam" 
                  :date="cg.date" 
                  :hours="cg.hours" 
                  :field="cg.field"
                  :key="cg.gameID">
              </GamePreview>
            </div>
          </b-tab>
          <b-tab title="Previues Games">
            <div class="rowDisplay">
              <PrevGame
                  v-for="pg in prevGames"
                  :game="pg.game" 
                  :gameLog="pg.log" 
                  :key="pg.gameID">
              </PrevGame>
            </div>
          </b-tab>
      </b-tabs>
    </div>
    <div class="rowDisplay">
      <PlayerPreview
        v-for="p in players"
        :id="p.playerID" 
        :firstname="p.firstname" 
        :lastname="p.lastname" 
        :playerteam="p.team_name" 
        :position="p.position"
        :nation="p.nation" 
        :image="p.image"
        :key="p.id">
      </PlayerPreview>
      <CoachInfo
        :id="coach.coachID"
        :firstname="coach.firstname"
        :lastname="coach.lastname"
        :nation="coach.nationality"
        :birthday="coach.birthday">
      </CoachInfo>
    </div>
      </div>
      <div v-else>
        <img src="https://media.tenor.com/images/4c8ac2554cec21fe79fdc76cb1de2155/tenor.gif" />
        <p id="loading">Loading...</p>
      </div>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
import GamePreview from "./GamePreview.vue";
import CoachInfo from "./CoachInfo.vue";
import PrevGame from "./PrevGame.vue";

export default {
  name: "teamInfo",
  components: {
    GamePreview,
    PlayerPreview,
    CoachInfo,
    PrevGame
  },
 data() {
    return {
      team: this.team,
      currGames: this.currGames,
      prevGames: this.prevGames,
      players: this.players,
      coach: this.coach,
      loading: false
    };
  }, 
  methods: {
    async getTeamDetails(teamName){
      console.log("response");
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamFullDetails/${teamName}`,
        );
        const teamData = response.data;
        this.team = teamData.team;
        this.currGames = [];
        this.currGames.push(...teamData.games.next);
        this.prevGames = [];
        this.prevGames.push(...teamData.games.prev);
        this.players = [];
        this.players.push(...teamData.players);
        this.coach = teamData.coach;
        console.log(response);
        this.loading = true;
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    },
    async updateTeam(team) {
      this.loading = false;
      await this.getTeamDetails(team);
      this.$forceUpdate();
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.loading = false;
    this.getTeamDetails(this.$route.params.teamName); 
  }
};
</script>

<style>
.TeamDetails {
  height: 300px;
  width: 550px;
  margin-left: 10px;
  font-family: cursive;
  font-weight: bold;
}

.TeamDetails img {
  height: 100%;
  width: 225px;
  margin-top: 15px;
}

.rowDisplay {
  display: flex; 
  flex-wrap: wrap;
}

#loading {
  font-size: 60px;
  margin-left: 150px;
}

</style>