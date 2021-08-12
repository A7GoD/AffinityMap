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

    groupedData: {},

    groupMode: false,
  },

  mutations: {
    createHighlight(ctx, payload) {
      ctx.highlights = [...ctx.highlights, { ...payload }]

      let name = payload.group;
      if (!(name in ctx.groupedData)) {
        ctx.groupedData[name] = []
      }
      let array = ctx.groupedData[name]
      array.push(payload)
      ctx.groupedData = { ...ctx.groupedData, [name]: [...array] }
    },
    createGroup(ctx, name) {
      ctx.groups = [...ctx.groups, name]
    },
    toggleGroupMode(ctx) {
      ctx.groupMode = !ctx.groupMode;
    },
    updateData(ctx, { array, group }) {
      ctx.groupedData = { ...ctx.groupedData, [group]: [...array] }
    },

    edit(ctx, { group, oldGroup, content, color, id }) {
      const newHighlights = ctx.highlights.map(x => {
        if (x.id === id) {
          return { group: group, id, color: color, content: content }
        } else return x;
      });
      ctx.highlights = newHighlights;

      const oldArray = ctx.groupedData[oldGroup].filter(x => x.id != id)

      if (!(group in ctx.groupedData)) {
        ctx.groupedData[group] = [];
        let groups = ctx.groups;
        groups.push(group)
        ctx.groups = [...groups]
      }
      const newArray = ctx.groupedData[group]
      newArray.push({ group: group, id, color: color, content: content })
      ctx.groupedData = { ...ctx.groupedData, [oldGroup]: [...oldArray], [group]: [...newArray] };

    }

  },
  actions: {
  },
  modules: {
  }
})

export default store;
