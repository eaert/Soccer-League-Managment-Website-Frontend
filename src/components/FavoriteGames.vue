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
  props: {
    num: {
      type: Number,
      require: true
    }
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
        let index = 0;
        games.forEach(game => {
          if (index > this.num) {
            return;
          }
          this.games.push(game[0])
          index++;
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
