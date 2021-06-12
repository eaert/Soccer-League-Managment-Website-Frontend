<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.gameID" 
      :homeTeam="g.homeTeam" 
      :awayTeam="g.awayTeam" 
      :date="g.date" 
      :hours="g.hours" 
      :field="g.field"
      :key="g.id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: this.games
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getfavoriteGames",
          {withCredentials: true}
        );
        const games = response.data;
        this.games = [];
        games.forEach(game => {
          this.games.push(game[0])
        });
        console.log(this.games);
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style></style>
