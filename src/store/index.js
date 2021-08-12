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
    delete(ctx, { id, group }) {
      ctx.highlights = ctx.highlights.filter(x => x.id !== id)

      const newArray = ctx.groupedData[group].filter(x => x.id !== id)
      ctx.groupedData = { ...ctx.groupedData, [group]: [...newArray] };

    },
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

    edit(ctx, { group, oldGroup, content, color, id, date }) {
      const newHighlights = ctx.highlights.map(x => {
        if (x.id === id) {
          return { group: group, id, color: color, content: content, date }
        } else return x;
      });

      ctx.highlights = newHighlights;

      if (oldGroup !== group) {
        var oldArray = ctx.groupedData[oldGroup].filter(x => x.id !== id);
        if (!(group in ctx.groupedData)) {
          ctx.groupedData[group] = [];
          let groups = ctx.groups;
          groups.push(group)
          ctx.groups = [...groups]
        }
        var newArray = ctx.groupedData[group];
        newArray.push({ group: group, id, color: color, content: content, date })
        ctx.groupedData = { ...ctx.groupedData, [oldGroup]: [...oldArray], [group]: [...newArray] };
      } else {
        newArray = ctx.groupedData[group].map(x => { if (x.id !== id) return x; else return { group: group, id, color: color, content: content, date } })
        ctx.groupedData = { ...ctx.groupedData, [group]: [...newArray] };
      }


    }

  },
  actions: {
  },
  modules: {
  }
})

export default store;
