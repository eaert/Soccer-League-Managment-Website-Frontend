<template>
  <div class="gamePrev">
      <b-card
        :title="'Score is ' + game.homeTeamGoals + ' - ' + game.awayTeamGoals"
        img-src="https://previews.123rf.com/images/praewpailin/praewpailin1606/praewpailin160600023/60968143-football-field-or-soccer-field-pattern-and-texture-abstract-soccer-field-or-football-field-backgroun.jpg"
        img-alt="Image"
        img-height="150px"
        img-width="100px"
        img-top>
        <b-list-group>
          <b-list-group-item>Game ID: {{ game.gameID }}</b-list-group-item>
          <b-list-group-item class="GoTo" v-on:click="TeamPage(game.homeTeam)">Home Team: {{ game.homeTeam }}</b-list-group-item>
          <b-list-group-item class="GoTo" v-on:click="TeamPage(game.awayTeam)">Away Team: {{ game.awayTeam }}</b-list-group-item>
          <b-list-group-item>Date: {{ game.date }}</b-list-group-item>
          <b-list-group-item>Stadium: {{ game.field }}</b-list-group-item>
          <b-button size="sm" @click="toggle">
            {{ show ? 'Hide' : 'Show' }} Game Events
          </b-button>
          <b-alert
            v-model="show"
            style="background-color: transparent; border: none;"
            >
            <GameEvent
            v-for="e in gameLog"
            :gameEvent="e"
            :key="e.eventID"
            ></GameEvent>
            </b-alert>
        </b-list-group>
      </b-card>
    <!-- <div style="display: flex">
        <div :title="id" class="game-title">
            <b>Game Id:</b> {{ game.gameID }}
        </div>
        <li> Home Team:</li>
        <b-button v-on:click="TeamPage(game.homeTeam)">{{ game.homeTeam }}</b-button>
        <li> Away Team:</li>
        <b-button v-on:click="TeamPage(game.awayTeam)">{{ game.awayTeam }}</b-button>
        <li> Date: {{ game.date }}</li>
        <li> Time: {{ game.hours }}</li>
        <li> Venue: {{ game.field }}</li>
    </div> -->
    <!-- <div>
        <GameEvent
            v-for="e in gameLog"
            :gameEvent="e"
            :key="e.eventID"
        ></GameEvent>
    </div> -->
  </div>
</template>

<script>
import GameEvent from "./GameEvent.vue"

export default {
    name: "PrevGame",
    components: {
        GameEvent
    },
    data() {
        return {
            show: false
        }
    },
    props: {
        game: {
            type: Object,
            required: true
        },
        gameLog: {
            type: Array,
            required: true
        }
    },
    methods: {
        TeamPage(team) {
            this.$router.push({name: "team", params: {teamName: team}}).catch(() => {
                let component = null;
                let parent = this.$parent;
                while (parent && !component) {
                if (parent.$options._componentTag === 'TeamInfo') {
                    component = parent
                }
                parent = parent.$parent
                }
                component.updateTeam(team);
            });
        },
        toggle() {
            console.log('Toggle button clicked')
            this.show = !this.show
        }
    }
}
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

.GoTo:hover {
  background-color: lightgray;
  cursor: pointer;
}

</style>