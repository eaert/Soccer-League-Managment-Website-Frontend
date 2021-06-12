<template>
  <div>
    <TeamPreview
      v-for="g in Teams"
      :id="g.id" 
      :hostTeam="g.hostTeam" 
      :guestTeam="g.guestTeam" 
      :date="g.date" 
      :hour="g.hour" 
      :key="g.id"></TeamPreview>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "FavoriteTeams",
  components: {
    TeamPreview
  }, 
  data() {
    return {
      Teams: [
        {
          teamID:25,
          teamname: "Maccabi Tel-Aviv",
          shorname: "Hapoel Beer-Sheva",
          founded: "27/5/21",
          logo: "20:00"
        },
        {
          teamID:25,
          teamname: "Maccabi Tel-Aviv",
          shorname: "Hapoel Beer-Sheva",
          founded: "27/5/21",
          logo: "20:00"
        }
      ]
    };
  },
  // methods: {
  //   async updateTeams(){
  //     console.log("response");
  //     try {
  //       const response = await this.axios.get(
  //         "http://localhost:3000/Teams/getfavoriteTeams",
  //       );
  //       const Teams = response.data.Teams;
  //       this.Teams = [];
  //       this.Teams.push(...Teams);
  //       console.log(response);
  //     } catch (error) {
  //       console.log("error in update Teams")
  //       console.log(error);
  //     }
  //   }
  // }, 
  // mounted(){
  //   console.log("favorite Teams mounted");
  //   this.updateTeams(); 
  // }
};
</script>

<style></style>
