<template>
  <div>
      <TeamPreview
        v-for="t in teams"
        :teamID="t.teamID" 
        :teamname="t.teamname" 
        :shortname="t.shortname" 
        :founded="t.founded" 
        :logo="t.logo" 
        :key="t.teamID"></TeamPreview>
  </div>
</template>

<script>
import TeamPreview from "../components/TeamPreview.vue";

export default {
    name: "LeaguePage",
    components: {
        TeamPreview,
    },
    data() {
        return {
            teams: []
        }
    },
    methods: {
        getLeagueData() {
            // axios request

            // save data to comp data
        }
    },
    mounted() {
        console.log("LeaguePage mounted");
        this.getLeagueData();
    }

}
</script>

<style>

</style>