<template>
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
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "FavoritePlayers",
  components: {
    PlayerPreview
  }, 
  data() {
    return {
      players: this.players
    };
  },
  methods: {
    async updatePlayers(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getfavoritePlayers",
        );
        const players = response.data;
        this.players = [];
        this.players.push(...players);
        console.log(response);
      } catch (error) {
        console.log("error in update Players")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite Players mounted");
    this.updatePlayers(); 
  }
};
</script>

<style></style>
