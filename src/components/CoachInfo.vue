<template>
  <div class="coach-preview">
    <div :title="id" class="coach-title">
      <b>Coach Id:</b> {{ id }}
    </div>
    <ul class="coach-content">
      <li> Name: {{ firstname + " " + lastname }}</li>
      <li> Nation: {{ nation }}</li>
      <li> Birthday: {{ birthday }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CoachInfo",
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
      nation: {
        type: String,
        required: true
      },
      birthday: {
        type: String,
        required: true
      }
  }, 
  methods: {

  },
  mounted(){
    console.log("coach preview mounted")
  } 
};
</script>

<style>
.coach-preview {
  display: inline-block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:gray;
  background-color: #ffffff90;
}

.coach-preview .coach-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.coach-preview .coach-content {
  width: 100%;
  overflow: hidden;
}



</style>
