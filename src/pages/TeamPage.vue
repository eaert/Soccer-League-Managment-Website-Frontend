<template>
  <div class="container">
    <TeamInfo></TeamInfo>
    <router-view/>
  </div>
</template>

<script>
import TeamInfo from "../components/TeamInfo";
export default {
  components: {
    TeamInfo, 
  }
};
</script>

<style>

</style>
