<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <LoginPage v-if="!$root.store.username"></LoginPage>
    <div class="details" v-else>
      <FavoriteGames></FavoriteGames>
      <FavoritePlayers></FavoritePlayers>
      <LeagueInfo></LeagueInfo>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import FavoritePlayers from "../components/FavoritePlayers.vue";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames,
    FavoritePlayers,
  }
};
</script>

<style lang="scss" scoped>
.container .details {
  display: flex;
}
</style>
