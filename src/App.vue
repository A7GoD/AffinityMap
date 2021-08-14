<template>
	<div id="app">
		<v-app>
			<Header />
			<AffinityMap
				ref="affinitymap"
				v-on:select="selectSingleCard"
				:highlights="highlights"
				:groups="groups"
				v-on:startSelect="startSelect"
				v-on:moveSelect="moveSelect"
				v-on:leaveSelect="leaveSelect"
				:selectMode="shouldStartSelect"
			/>
			<SelectionRectangle
				:top="selectTop"
				:left="selectLeft"
				:height="selectHeight"
				:width="selectWidth"
				:display="shouldStartSelect"
			/>
			<BatchGroupEdit
				:items="groups"
				:selectedHighlights="selectedHighlights"
				v-on:cancel="selectedHighlights = []"
			/>
		</v-app>
	</div>
</template>

<script>
import SelectionRectangle from "./components/SelectionRectangle.vue";
import Header from "./components/Header.vue";
import BatchGroupEdit from "./components/BatchGroupEdit.vue";
import AffinityMap from "./views/AffinityMap.vue";
import Vue from "vue";

export default {
	name: "App",
	components: { Header, AffinityMap, SelectionRectangle, BatchGroupEdit },
	data: () => ({
		selectTop: "0px",
		selectLeft: "0px",
		selectHeight: "0px",
		selectWidth: "0px",
		shouldStartSelect: false,
		selectedHighlights: [],
	}),

	methods: {
		startSelect(e) {
			this.shouldStartSelect = true;
			this.selectTop = e.y;
			this.selectLeft = e.x;
		},
		moveSelect(e) {
			this.selectHeight = e.y - this.selectTop;
			this.selectWidth = e.x - this.selectLeft;
		},
		leaveSelect(e) {
			let start = {},
				end = {};
			start.x = Math.min(this.selectLeft, e.x);
			start.y = Math.min(this.selectTop, e.y);

			end.x = Math.max(this.selectLeft, e.x);
			end.y = Math.max(this.selectTop, e.y);

			const selected = this.selectHighlights(start, end);
			this.selectedHighlights = [...selected];
			this.shouldStartSelect = false;
			this.selectTop = this.selectLeft = this.selectHeight = this.selectWidth = 0;
		},
		selectSingleCard(e) {
			this.selectedHighlights = [e];
		},
		selectHighlights(start, end) {
			const highlights = this.$refs.affinitymap.$refs.highlight;
			let selected = [];
			highlights.forEach((h) => {
				let left, top;
				let id = h.$options.propsData.id;
				if (h.filtered) {
					if (h.$options.propsData.pos === "relative") {
						left = 0;
						top = 0;
						let element = h.$el;
						do {
							top += element.offsetTop || 0;
							left += element.offsetLeft || 0;
							element = element.offsetParent;
						} while (element);
					} else {
						left = h.$options.propsData.left;
						top = h.$options.propsData.top;

						left = parseInt(left.substr(0, left.length - 2));
						top = parseInt(top.substr(0, top.length - 2));
					}

					if (
						left >= start.x &&
						left <= end.x &&
						top >= start.y &&
						top <= end.y
					) {
						selected.push(id);
					}
				}
			});
			return selected;
		},
	},
	watch: {
		"$store.state.groupedData"() {
			localStorage.setItem(
				"data",
				JSON.stringify(this.$store.state.groupedData)
			);
		},

		selectedHighlights() {
			let highlights = this.$refs.affinitymap.$refs.highlight;
			for (let note of highlights) {
				if (this.selectedHighlights.includes(note.id)) {
					Vue.set(note, "isSelected", true);
				} else {
					Vue.set(note, "isSelected", false);
				}
			}
		},
	},

	computed: {
		highlights() {
			const temp = this.$store.state.groupedData;
			let highlights = [];

			Object.keys(temp).forEach((e) => {
				highlights = [...highlights, ...temp[e]];
			});
			highlights.sort((a, b) => -a.date + b.date);
			return highlights;
		},
		groups() {
			return Object.keys(this.$store.state.groupedData).map((x) => {
				if (x === "null") return null;
				else return x;
			});
		},
	},

	mounted() {
		const item = localStorage.getItem("data");
		if (item) {
			this.$store.commit("setData", JSON.parse(item));
		}
	},
};
</script>
<style>
#app {
	height: 100%;
	width: 100%;
}
html,
body {
	height: 100%;
	width: 100%;
}
</style>
