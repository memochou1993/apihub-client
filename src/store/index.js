import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import project from './modules/project';
import endpoint from './modules/endpoint';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    project,
    endpoint,
  },
  state: {
    loading: false,
    error: null,
    noData: false,
    refresh: false,
    pages: 1,
    methodColors: {
      GET: 'purple darken-1',
      POST: 'green darken-1',
      PUT: 'orange darken-1',
      PATCH: 'amber darken-1',
      DELETE: 'red darken-1',
      HEAD: 'blue darken-1',
    },
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setNoData(state, noData) {
      state.noData = noData;
    },
    setRefresh(state, refresh) {
      state.refresh = refresh;
    },
    setPages(state, pages) {
      state.pages = pages;
    },
  },
  getters: {
    me() {
      return '1';
    },
  },
  actions: {
    initialState(context) {
      context.commit('setLoading', true);
      context.commit('setError', null);
      context.commit('setNoData', false);
    },
    setRefresh(context, refresh) {
      context.commit('setRefresh', refresh);
    },
  },
});
