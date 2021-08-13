<template>
	<v-select
		class="filter-selector"
		v-model="selectedGroups"
		:items="items"
		chips
		placeholder="Choose groups to filter"
		multiple
		prepend-icon="mdi-filter-variant"
		outlined
		hide-details="auto"
		dense
		:menu-props="{ maxHeight: '400', offsetY: true }"
	>
		<template v-slot:selection="{ attrs, item, select, selected }">
			<v-chip
				v-bind="attrs"
				:input-value="selected"
				close
				@click="select"
				@click:close="remove(item)"
			>
				<strong>{{ item !== "null" ? item : "Ungrouped" }}</strong>
			</v-chip>
		</template>
	</v-select>
</template>

<script>
export default {
	data: () => ({
		selectedGroups: [],
	}),
	methods: {
		remove(item) {
			this.selectedGroups.splice(this.selectedGroups.indexOf(item), 1);
			this.selectedGroups = [...this.selectedGroups];
		},
	},
	computed: {
		items() {
			return Object.keys(this.$store.state.groupedData).map((x) => {
				if (x === "null") return "ungrouped";
				else return x;
			});
		},
	},
	watch: {
		selectedGroups() {
			this.$store.commit("updateFilters", {
				filters: this.selectedGroups,
			});
		},
	},
};
</script>

<style>
.filter-selector {
	max-width: 300px;
	width: 300px;
}
</style>
