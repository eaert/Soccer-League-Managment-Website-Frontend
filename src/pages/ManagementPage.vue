<template>
  <div>
      <h1>Create Game</h1>
      <b-form @submit.prevent="onCreate">
      <b-form-group
        id="input-group-homeTeam"
        label-cols-sm="3"
        label="Home Team:"
        label-for="homeTeam"
      >
        <b-form-select
          id="homeTeam"
          v-model="$v.form.homeTeam.$model"
          :options="this.teams"
          :state="validateState('homeTeam')"
        ></b-form-select>
        <b-form-invalid-feedback>
          homeTeam is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-awayTeam"
        label-cols-sm="3"
        label="awayTeam:"
        label-for="awayTeam"
      >
        <b-form-select
          id="awayTeam"
          v-model="$v.form.awayTeam.$model"
          :options="this.teams"
          :state="validateState('awayTeam')"
        ></b-form-select>
        <b-form-invalid-feedback>
          awayTeam is required and must be different from homeTeam
        </b-form-invalid-feedback>
      </b-form-group>

       <b-form-group
        id="input-group-datepicker"
        label-cols-sm="3"
        label="Game Date:"
        label-for="datepicker"
      >
        <b-form-datepicker
          id="datepicker"
          v-model="$v.form.datepicker.$model"
          :state="validateState('datepicker')"
        ></b-form-datepicker>
        <b-form-invalid-feedback>
          Date is required and must be older then current
        </b-form-invalid-feedback>
      </b-form-group> 

      <b-form-group
        id="input-group-timepicker"
        label-cols-sm="3"
        label="Time:"
        label-for="timepicker"
      >
      <b-form-timepicker
          id="timepicker"
          v-model="$v.form.timepicker.$model"
          :state="validateState('timepicker')"
        ></b-form-timepicker>
        <b-form-invalid-feedback>
          Time is required and must be above 16:00
        </b-form-invalid-feedback>
      </b-form-group>


      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Create</b-button
      >
    </b-form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Management",
  data() {
    return {
      form: {
        homeTeam: null,
        awayTeam: null,
        datepicker: "",
        timepicker: "",
        submitError: undefined
      },
      teams: [{ value: null, text: "", disabled: true }],
      venues: [],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      homeTeam: {
        required
      },
      awayTeam: {
        required,
        sameAsHomeTeam: function() {
          return this.form.homeTeam !== this.form.awayTeam;
        }
      },
      datepicker: {
        required,
        minValue(val) {
            return new Date(val) > new Date();
        },
      },
      timepicker: {
        required
      }
    }
  },
  mounted() {
    this.setTeams();
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async CreateGame() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/users/Representative/addGame",
          {
            date: (this.form.datepicker).replace('-', '/'),
            hours: (this.form.timepicker).slice(0, 4),
            homeTeam: this.form.homeTeam,
            awayTeam: this.form.awayTeam,
            homeTeamGoals: 0,
            awayTeamGoals: 0,
            field: this.form.venues[this.teams.indexof(this.form.homeTeam)],
            referee: 1
          }
        );
        this.$root.toast("Create Game", "Game been created successfully", "success");
        // console.log(response);
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
    },
    onCreate() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.CreateGame();
    },
    async setTeams() {
      const response = await this.axios.get(
        "http://localhost:3000/leagues/getAllLeagueTeams"
      );
      let teamNames = [];
      let venuesData = [];
      (response.data).forEach(team => {
        teamNames.push(team.teamName);
        venuesData.push(team.venue);
      });
      this.teams.push(...teamNames);
      this.venues.push(...venuesData);
    }
  }
};
</script>

<style>

</style>