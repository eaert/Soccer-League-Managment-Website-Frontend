<template>
  <div>
    <div style="display: flex">
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
    </div>
    <div>
        <GameEvent
            v-for="e in gameLog"
            :gameEvent="e"
            :key="e.eventID"
        ></GameEvent>
    </div>
  </div>
</template>

<script>
import GameEvent from "./GameEvent.vue"

export default {
    name: "PrevGame",
    components: {
        GameEvent
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
            try {
                this.$emit.getTeamDetails(team);
            } catch (error) {
                this.$root.store.setTeam(team);
                this.$router.push("/team");
            }
        }
    }
}
</script>

<style>

</style>