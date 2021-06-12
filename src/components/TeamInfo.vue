<template>
    <div>
      <h1>Team Page</h1>
      <TeamPreview
        :logo="team.logo"
        :teamID="team.teamID"
        :teamname="team.teamname"
        :shortname="team.shortname"
        :founded="team.founded">
      </TeamPreview>
      <GamePreview
        v-for="g in games"
        :id="g.gameID" 
        :homeTeam="g.homeTeam" 
        :awayTeam="g.awayTeam" 
        :date="g.date" 
        :hours="g.hours" 
        :field="g.field"
        :key="g.id">
      </GamePreview>
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
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
import GamePreview from "./GamePreview.vue";
import CoachInfo from "./CoachInfo.vue";
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "teamInfo",
  components: {
    GamePreview,
    PlayerPreview,
    CoachInfo,
    TeamPreview
  },
 data() {
    return {
      team: this.team,
      games: this.games,
      players: this.players,
      coach: this.coach
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
        this.games = [];
        this.games.push(...teamData.games);
        this.players = [];
        this.players.push(...teamData.players);
        this.coach = teamData.coach;
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.getTeamDetails(this.$root.store.teamname); 
  }
};
</script>

<style>
</style>