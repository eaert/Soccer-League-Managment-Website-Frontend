<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li v-on:click="TeamPage(homeTeam)"> Home Team:</li>
      <b-button v-on:click="TeamPage(homeTeam)">{{ homeTeam }}</b-button>
      <li v-on:click="TeamPage(awayTeam)"> Away Team:</li>
      <b-button v-on:click="TeamPage(awayTeam)">{{ awayTeam }}</b-button>
      <li> Date: {{ date }}</li>
      <li> Time: {{ hours }}</li>
      <li> Venue: {{ field }}</li>
    </ul>
    <div class="buttonPress">
      <button-press v-on:click="Like(id)" color="cyan" size="l">Like</button-press>
    </div>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      homeTeam: {
        type: String,
        required: true
      },
      awayTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hours: {
        type: String,
        required: true
      },
      field: {
        type: String,
        require: true
      }
  }, 
  methods: {
    TeamPage(team) {
      this.$root.store.setTeam(team);
      this.$router.push("/team");
    },
    async Like(targetID) {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/favoriteGames",
          {
            game_id: targetID,
            type: 'game'
          },
          {withCredentials: true}
        );
      } catch(error) {
        window.alert('Game Already been Liked')
      }
    }
  },
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}

.game-preview .buttonPress {
  float: right;
  padding-right: 5px;
}

</style>
