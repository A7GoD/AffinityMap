<template>
	<div id="app">
		<v-app>
			<Header />
			<AffinityMap />
		</v-app>
	</div>
</template>

<script>
import Header from "./components/Header.vue";
import AffinityMap from "./views/AffinityMap.vue";

// import Header from "./components/Header.vue"
export default {
	name: "App",
	components: { Header, AffinityMap },
	data: () => ({
		//
	}),
	watch: {
		"$store.state.groupedData"() {
			localStorage.setItem(
				"data",
				JSON.stringify(this.$store.state.groupedData)
			);
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
</style>
