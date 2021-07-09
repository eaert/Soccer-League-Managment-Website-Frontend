<template>
  <div class="gamePrev">
      <b-card
        title="Game Details"
        img-src="https://previews.123rf.com/images/praewpailin/praewpailin1606/praewpailin160600023/60968143-football-field-or-soccer-field-pattern-and-texture-abstract-soccer-field-or-football-field-backgroun.jpg"
        img-alt="Image"
        img-height="150px"
        img-width="100px"
        img-top>
        <b-list-group>
          <b-list-group-item>Game ID: {{ id }}</b-list-group-item>
          <b-list-group-item class="GoTo" v-on:click="TeamPage(homeTeam)">Home Team: {{ homeTeam }}</b-list-group-item>
          <b-list-group-item class="GoTo" v-on:click="TeamPage(awayTeam)">Away Team: {{ awayTeam }}</b-list-group-item>
          <b-list-group-item>Date: {{ date }}</b-list-group-item>
          <b-list-group-item>Start Hour: {{ hours }}</b-list-group-item>
          <b-list-group-item>Stadium: {{ field }}</b-list-group-item>
        </b-list-group>
        <Like :id="id" :type="'game'"></Like>
      </b-card>
    </div>
  <!-- <div class="game-preview">
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
  </div> -->
  <!-- https://previews.123rf.com/images/praewpailin/praewpailin1606/praewpailin160600023/60968143-football-field-or-soccer-field-pattern-and-texture-abstract-soccer-field-or-football-field-backgroun.jpg -->
</template>

<script>
import Like from './Like.vue';

export default {
  name: "GamePreview",
  components: {
    Like
  },
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
      if (this.$parent.name === "TeamPage") {
        this.$emit.getTeamDetails(team);
      } else {
        this.$router.push({name: "team", params: {teamName: team}});
      }
    }
  },
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>

.gamePrev {
  height: 700px;
  width: 300px;
  font-family: cursive;
  font-weight: bold;
}

.gamePrev img {
  height: 200px;
  width: 100%;
}

.buttonPress {
  float: right;
  padding-right: 5px;
}

.GoTo:hover {
  background-color: lightgray;
  cursor: pointer;
}

</style>
