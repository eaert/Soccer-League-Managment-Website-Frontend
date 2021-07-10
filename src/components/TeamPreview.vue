<template>
  <div>
    <div class="teamPrev">
      <b-card
        :title="teamname"
        :img-src="logo"
        img-alt="Image"
        img-height="150px"
        img-width="100px"
        img-top>
        <b-list-group>
          <b-list-group-item>Team ID: {{ teamID }}</b-list-group-item>
          <b-list-group-item>Short Name: {{ shortname }}</b-list-group-item>
          <b-list-group-item>Founded: {{ founded }}</b-list-group-item>
        </b-list-group>
        <button-press v-on:click="teamPage(teamname)" style="margin-top: 10px" variant="outline-secondary">Go Team Page</button-press>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
 name: "teamPreview",
  props: {
      teamID: {
        type: Number,
        required: true
      },
      teamname: {
        type: String,
        required: true
      },
      shortname: {
        type: String,
        required: true
      },
      founded: {
        type: Number,
        required: true
      },
      logo: {
          type: String,
          require: true
      }
  }, 
  methods: {
    teamPage(team) {
      this.$router.push({name: "team", params: {teamName: team}});
    },
  },
  mounted(){
    console.log("team preview mounted")
  } 
}
</script>

<style>
.teamPrev {
  height: 500px;
  width: 250px;
  margin-left: 10px;
  font-family: cursive;
  font-weight: bold;
}

.teamPrev img {
  height: 200px;
  width: 200px;
  margin-left: 25px;
}
</style>