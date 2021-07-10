<template>
  <div>
      <h1>Favorites Games</h1>
      <FavoriteGames :num="100"></FavoriteGames>
      <h1>Favorite Players</h1>
      <FavoritePlayers></FavoritePlayers>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
import FavoritePlayers from "../components/FavoritePlayers.vue";

export default {
    name: "FavoritesPage",
    components: {
        FavoriteGames,
        FavoritePlayers
    },
    methods: {

    }
}
</script>

<style>

</style>