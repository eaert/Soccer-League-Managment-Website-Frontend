<template>
  <div></div>
</template>

<script>
export default {
 name: "teamPreview",
  props: {
      players: {
        type: Object,
        required: true
      },
      teams: {
        type: Object,
        required: true
      }
  }, 
  methods: {

  },
  mounted(){
    console.log("search mounted")
  } 
}
</script>

<style>

</style>