<template>
	<div class="affinity-map d-flex">
		<div :style="{ width: '100%' }" class="d-flex justify-center">
			<div
				v-if="!$store.state.groupMode"
				class="ungrouped-highlights-container"
			>
				<Highlight
					class="highlight-card"
					v-for="(note, idx) in highlights"
					:key="idx"
					:id="note.id"
					:group="note.group"
					:content="note.content"
					:highlightColor="note.color"
				/>
			</div>
			<div v-else class="grouped-highlights-container">
				<Bucket
					v-on:dragging="(event) => (dragItem = event)"
					v-on:dropped="(event) => beginTransfer(event)"
					v-for="group in groups"
					:key="group"
					:group="group"
					:highlights="highlights"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Bucket from "../components/Bucket.vue";
import Highlight from "../components/Highlight.vue";

export default {
	components: { Highlight, Bucket },
	data: () => ({
		highlights: [],
		groups: [],
		dragItem: null,
	}),

	methods: {
		beginTransfer(data) {
			console.log(data);
			console.log(this.dragItem);
		},
	},

	watch: {
		"$store.state.highlights"() {
			this.highlights = this.$store.state.highlights;
		},
		"$store.state.groups"() {
			this.groups = this.$store.state.groups;
		},
	},
};
</script>

<style>
.affinity-map {
	width: 100%;
	flex: 1 0 0;
	padding: 24px;
	justify-content: center;
}
.ungrouped-highlights-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: fit-content;
	max-width: 1100px;
}
.grouped-highlights-container {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	max-width: 1100px;
}

.highlight-card {
	margin: 16px 16px;
}
</style>
