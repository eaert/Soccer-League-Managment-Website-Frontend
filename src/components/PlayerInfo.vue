<template>
  <div class="container">
    <div style="display: block;">
        <img v-bind:src="player.image" />
        <h1>{{ player.firstname + ' ' + player.lastname }}</h1>
    </div>
    <div>
        <b-list-group>
          <b-list-group-item>Player ID: {{ player.playerID }}</b-list-group-item>
          <b-list-group-item>Position: {{ player.position }}</b-list-group-item>
          <b-list-group-item>Nation: {{ player.nation }}</b-list-group-item>
          <b-list-group-item>Birthday: {{ player.birthday }}</b-list-group-item>
          <b-list-group-item>Country: {{ player.country }}</b-list-group-item>
          <b-list-group-item>Weight: {{ player.weight }}</b-list-group-item>
          <b-list-group-item>Height: {{ player.height }}</b-list-group-item>
          <b-list-group-item class="GoTo" v-on:click="TeamPage(player.playerteam)">Team: {{ player.playerteam }}</b-list-group-item>
        </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPage",
  data() {
    return {
      player: {

      }
    }
  },
  methods: {
    async updatePlayer(playerName){
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetails/${playerName}`,
        );
        const player = response.data;
        this.player = player;
        console.log(response);
      } catch (error) {
        console.log("error in update player")
        console.log(error);
      }
    },
    TeamPage(team) {
      try {
        this.$emit.getTeamDetails(team);
      } catch (error) {
        this.$root.store.setTeam(team);
        this.$router.push("/team");
      }
    },
  }, 
  mounted(){
    console.log("player details mounted");
    this.updatePlayer(this.$route.params.playerID); 
  }
}
</script>

<style>

.GoTo:hover {
  background-color: lightgray;
  cursor: pointer;
}

</style>