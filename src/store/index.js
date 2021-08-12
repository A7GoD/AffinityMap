import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    colors: {
      tomato: "#f28384",
      aqua: "#86cefc",
      yellow: "#f8dd80",
      purple: "#e0a7f9",
      green: "#89f3a7",
    },

    highlights: [],

    groups: [],

    groupMode: false,
  },

  mutations: {
    createHighlight(ctx, payload) {
      ctx.highlights = [...ctx.highlights, { ...payload }]
    },
    createGroup(ctx, name) {
      ctx.groups = [...ctx.groups, name]
    },
    toggleGroupMode(ctx) {
      ctx.groupMode = !ctx.groupMode;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;
