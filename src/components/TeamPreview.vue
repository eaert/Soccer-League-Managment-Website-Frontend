<template>
    <div>
    <b-card-title>{{ teamname }}</b-card-title>
    <b-card-text>
      <img :src="logo">
      ID: {{ teamID }}
      Initials: {{ shortname }}
      Founded: {{ founded }}
    </b-card-text>
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
  mounted(){
    console.log("team preview mounted")
  } 
}
</script>

<style>

</style>