<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <PlayerInfo>

    </PlayerInfo>
  </div>
</template>

<script>
import PlayerInfo from "../components/PlayerInfo";
export default {
  components: {
    PlayerInfo, 
  },
  methods: {
      async getplayerDetails(playerName){
      console.log("response");
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerFullDetails/:${playerName}`,
        );
        const player = response.data;
        this.player = {
            player: '',
            games: '',
            players: '',
            coach: ''
        }
        this.player = player;
        console.log(response);
      } catch (error) {
        console.log("error in update player")
        console.log(error);
      }
    },
    mounted(){
        console.log("player details mounted");
        this.updatePlayers(''); 
  }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
