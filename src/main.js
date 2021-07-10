import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import VueButtonAnimation from 'vue-button-animation'
Vue.use(VueButtonAnimation);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TabsPlugin,
  ListGroupPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TabsPlugin,
  ListGroupPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials=true;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },
  query: localStorage.query,
  setQuery(query) {
    if (localStorage.query) {
      localStorage.query = query;
    } else {
      localStorage.setItem("query", query);
    }
  },
  removeQuery() {
    localStorage.removeItem("query");
    this.query = undefined;
  },
  searchResults: localStorage.searchResults,
  setResults(results) {
    if (localStorage.searchResults) {
      localStorage.searchResults = results;
    } else {
      localStorage.setItem("searchResults", results);
    }
  },
  removeResults() {
    localStorage.removeItem("searchResults");
    this.searchResults = undefined;
  },
  favoItems: localStorage.favoItems,
  setFavoItems(array, single) {
    if (localStorage.favoItems) {
      if (single) {
        let items = JSON.parse(localStorage.favoItems);
        items.push(array[0]);
        localStorage.favoItems = JSON.stringify(items);
      }
    } else {
      localStorage.favoItems = array;
    }
  },
  removeFavoItems() {
    localStorage.removeItem("favoItems");
    this.favoItems = undefined;
  },
  isFavo(id, type) {
    try {
      let items = JSON.parse(localStorage.favoItems);
      let result = false;
      items.forEach(item => {
        if (item.targetID == id && item.type === type) {
          result = true;
        }
      });
      return result;
    } catch (error) {
      return true;
    }
  },
  removeSingleFavo(id, type) {
    let items = JSON.parse(localStorage.favoItems);
      let result = false;
      for (let index = 0; index < items.length; index++) {
        if (items[index].targetID == id && items[index].type === type)
          items.splice(index, 1);
          localStorage.favoItems = JSON.stringify(items);
      }
  }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
