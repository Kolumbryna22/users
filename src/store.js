import Vue from 'vue';
import Vuex from 'vuex';
import env from '../env.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    api: env.apiUrl
  }
});
