<template>
  <div>
    <p>Event ID: {{ gameEvent.eventID }}</p>
    <ul class="game-content">
      <li> Event Type: {{ gameEvent.eventType }}</li>
      <li> Game Minute: {{ gameEvent.gameMinute }}</li>
      <li> Player ID: {{ gameEvent.playerID }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "GameEvent",
    props: {
        gameEvent: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>