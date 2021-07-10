<template>
  <div style="display: flex;">
    <div id="CreateGame" class="bonus">
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
        label="Away Team:"
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
    <div id="updateScore" class="bonus">
      <h1>Update Game Score</h1>
      <b-form @submit.prevent="onUpdateScore">

      <b-form-group
        id="input-group-GameID"
        label-cols-sm="3"
        label="Game ID to Update:"
        label-for="GameID"
      >
        <b-form-input
          id="GameID"
          type="input"
          v-model="$v.form1.GameID.$model"
          :state="validateState1('GameID')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Game ID is required must be numeric above 0
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-homeTeamGoals"
        label-cols-sm="3"
        label="new Home Team Goals:"
        label-for="homeTeamGoals"
      >
        <b-form-input
          id="homeTeamGoals"
          type="input"
          v-model="$v.form1.homeTeamGoals.$model"
          :state="validateState1('homeTeamGoals')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Home Team Goals is required and must be a positive number.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-awayTeamGoals"
        label-cols-sm="3"
        label="new Away Team Goals:"
        label-for="awayTeamGoals"
      >
        <b-form-input
          id="awayTeamGoals"
          type="input"
          v-model="$v.form1.awayTeamGoals.$model"
          :state="validateState1('awayTeamGoals')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Away Team Goals is required and must be a positive number.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Update</b-button
      >
      </b-form>
    </div>
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
  url,
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
      form1: {
        GameID: null,
        homeTeamGoals: null,
        awayTeamGoals: null,
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
    },
    form1: {
      GameID: {
        required,
        minValue(val) {
          return val > 0;
        }
      },
      homeTeamGoals: {
        required,
        minValue(val) {
          return val > 0;
        }
      },
      awayTeamGoals: {
        required,
        minValue(val) {
          return val > 0;
        }
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
    validateState1(param) {
      const { $dirty, $error } = this.$v.form1[param];
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
            field: this.venues[(this.teams).indexOf(this.form.homeTeam)],
            referee: 0
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
    async UpdateScore() {
      try {
        const response = await this.axios.put(
          "http://localhost:3000/users/Representative/updateScore",
          {
            gameID: this.form1.GameID,
            homeTeamGoals: this.form1.homeTeamGoals,
            awayTeamGoals: this.form1.awayTeamGoals
          }
        );
        this.$root.toast("Update Score", "Game Score been updated successfully", "success");
      } catch(error) {
        this.$root.toast("Update Score", "Game ID given doesn't exists", "danger");
        this.form1.submitError = err.response.data.message;
      }
    },
    onUpdateScore() {
      this.$v.form1.$touch();
        if (this.$v.form1.$anyError) {
          return;
        }
        this.UpdateScore();
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

.bonus {
  margin-left: 50px;
  color: black;
  font-weight: bold;
}

</style>