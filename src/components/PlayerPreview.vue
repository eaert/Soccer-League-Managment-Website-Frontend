<template>
  <div class="player-preview">
    <div :title="id" class="player-title">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "playerPreview",
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
    async Like(targetID) {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/favoritePlayers",
          {
            player_id: targetID,
            type: 'game'
          },
          {withCredentials: true}
        );
      } catch(error) {
        window.alert('Player Already been Liked')
      }
    }
  },
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
.player-preview {
  display: inline-block;
  width: 250px;
  height: 350px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}

.player-preview .buttonPress {
  float: right;
  padding-right: 5px;
}

</style>
