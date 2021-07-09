<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <LeagueInfo class="comp"></LeagueInfo>
    <LoginPage v-if="!$root.store.username" class="comp"></LoginPage>
    <div class="details" v-else>
      <FavoriteGames class="comp"></FavoriteGames>
      <FavoritePlayers class="comp"></FavoritePlayers>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import FavoritePlayers from "../components/FavoritePlayers.vue";
import LoginPage from "../pages/LoginPage";
export default {
  name: "MainPage",
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames,
    FavoritePlayers,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding-top: 10px;
}

.container .comp {
  padding-top: 50px;
}

.container .details {
  display: flex;
  padding-left: 25px;
}

.details .comp {
  display: flex;
}
</style>
