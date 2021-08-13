import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		colors: {
			tomato: "#f28384",
			aqua: "#86cefc",
			yellow: "#f8dd80",
			purple: "#e0a7f9",
			green: "#89f3a7",
		},

		filteredGroups: [],
		groupedData: {},

		groupMode: false,
	},

	mutations: {
		createHighlight(ctx, payload) {
			let name = payload.group;
			if (!(name in ctx.groupedData)) {
				ctx.groupedData[name] = [];
			}
			let array = ctx.groupedData[name];
			array.push(payload);
			ctx.groupedData = { ...ctx.groupedData, [name]: [...array] };
		},
		delete(ctx, { id, group }) {
			const newArray = ctx.groupedData[group].filter((x) => x.id !== id);
			ctx.groupedData = { ...ctx.groupedData, [group]: [...newArray] };
		},
		createGroup(ctx, name) {
			ctx.groupedData = { ...ctx.groupedData, [name]: [] };
		},
		toggleGroupMode(ctx) {
			ctx.groupMode = !ctx.groupMode;
		},
		updateData(ctx, { array, group }) {
			ctx.groupedData = { ...ctx.groupedData, [group]: [...array] };
		},

		edit(
			ctx,
			{ group, oldGroup, content, color, id, date, top, left, pos }
		) {
			if (oldGroup !== group) {
				var oldArray = ctx.groupedData[oldGroup].filter(
					(x) => x.id !== id
				);
				if (!(group in ctx.groupedData)) {
					ctx.groupedData[group] = [];
				}

				var newArray = ctx.groupedData[group];

				newArray.push({
					group: group,
					id,
					color: color,
					content: content,
					date,
					top,
					left,
					pos,
				});

				ctx.groupedData = {
					...ctx.groupedData,
					[oldGroup]: [...oldArray],
					[group]: [...newArray],
				};
			} else {
				newArray = ctx.groupedData[group].map((x) => {
					if (x.id !== id) return x;
					else
						return {
							group: group,
							id,
							color: color,
							content: content,
							date: date ? date : x.date,
							top,
							left,
							pos,
						};
				});

				ctx.groupedData = {
					...ctx.groupedData,
					[group]: [...newArray],
				};
			}
		},
		updateFilters(ctx, { filters }) {
			ctx.filteredGroups = filters;
		},

		setData(ctx, payload) {
			ctx.groupedData = payload;
		},
	},
	actions: {},
	modules: {},
});

export default store;
