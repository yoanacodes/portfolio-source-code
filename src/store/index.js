import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    siteContent: Object,
    dataIsReady: false, //Boolean
  },
  mutations: {
    saveSiteContent(state, payload) {
      state.siteContent = payload.siteContent;
      state.dataIsReady = payload.dataIsReady;
    },
  },
  actions: {
    getSiteContent({ commit, state }, payload) {
      return axios
        .get("data/projects_dictionary.json")
        .then((response) => {
          commit("saveSiteContent", {
            siteContent: response.data,
            dataIsReady: true,
          });
          // console.log(typeof response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
