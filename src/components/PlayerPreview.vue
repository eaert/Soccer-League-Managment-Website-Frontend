<template>
  <div v-bind:class="{'player-preview': compDisplay, 'none': !compDisplay}">
    <b-button size="sm" @click="toggle">
        {{ show ? 'Hide' : 'Show' }} {{ firstname + ' ' + lastname }}
    </b-button>
    <b-alert
        v-model="show"
        style="background-color: transparent; border: none;"
      >
      <b-card
          :title="firstname + ' ' + lastname">
          <img :src="image" v-on:click="PlayerPage(id)" style="height: 150px; width: 150px"  />
          <b-list-group>
            <b-list-group-item>ID: {{ id }}</b-list-group-item>
            <b-list-group-item class="GoTo" v-on:click="TeamPage(homeTeam)">Team: {{ playerteam }}</b-list-group-item>
            <b-list-group-item>Position: {{ position }}</b-list-group-item>
            <b-list-group-item>Nation: {{ nation }}</b-list-group-item>
          </b-list-group>
          <Like :id="id" :type="'player'"></Like>
        </b-card>
      </b-alert>
    <!-- <div :title="id" class="player-title">
      <b>Player Id:</b> {{ id }}
    </div>
    <ul class="player-content">
      <img :src="image">
      <li> Name: {{ firstname + " " + lastname }}</li>
      <li> Team: {{ playerteam }}</li>
      <li> Position: {{ position }}</li>
      <li> Nation: {{ nation }}</li>
    </ul>
    <div class="buttonPress">
      <button-press v-on:click="Like(id)" color="cyan" size="l">Like</button-press>
    </div> -->
  </div>
</template>

<script>
import Like from "./Like.vue"

export default {
  name: "playerPreview",
  components: {
    Like
  },
  data() {
    return {
      show: false,
      compDisplay: true
    }
  },
  props: {
      id: {
        type: Number,
        required: true
      },
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      playerteam: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      nation: {
        type: String,
        required: true
      },
      image: {
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
    },
    PlayerPage(player) {
      this.$router.push({name: "player", params: {playerID: player}});
    },
    toggle() {
        console.log('Toggle button clicked')
        this.show = !this.show
    },
    display(show) {
      this.compDisplay = show;
    }
  },
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
.player-preview {
  height: 250px;
  width: 300px;
  font-family: cursive;
  font-weight: bold;
}

.player-preview img {
  height: 200px;
  width: 200px;
  margin-left: 30px;
}

.buttonPress {
  float: right;
  padding-right: 5px;
}

.GoTo:hover {
  background-color: lightgray;
  cursor: pointer;
}

.none {
  display: none;
}

</style>
