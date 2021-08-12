<template>
	<div class="affinity-map d-flex" @dragover.prevent @dragleave.prevent>
		<div :style="{ width: '100%' }" class="d-flex justify-center">
			<div
				v-if="!$store.state.groupMode"
				class="ungrouped-highlights-container"
			>
				<div v-for="(note, idx) in highlights" :key="idx">
					<Highlight
						class="highlight-card"
						:id="note.id"
						:group="note.group"
						:content="note.content"
						:highlightColor="note.color"
					/>
				</div>
			</div>
			<div v-else class="grouped-highlights-container">
				<Bucket
					v-for="group in groups"
					v-on:dragging="(event) => (dragItem = event)"
					v-on:dropped="(event) => beginTransfer(event)"
					:group="group"
					:highlights="highlights"
					:key="group"
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
		// highlights: [],
		// groups: [],
		dragItem: null,
	}),

	computed: {
		highlights() {
			return this.$store.state.highlights;
		},
		groups() {
			return this.$store.state.groups;
		},
	},

	methods: {
		beginTransfer(data) {
			console.log(data);
			console.log(this.dragItem);
		},
	},

	watch: {
		// "$store.state.highlights"() {
		// 	this.highlights = this.$store.state.highlights;
		// },
		// "$store.state.groups"() {
		// 	this.groups = this.$store.state.groups;
		// },
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
	width: 1100px;
	max-width: 1100px;
}
.grouped-highlights-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	max-width: 1366px;
	justify-content: center;
	width: 100%;
}

.container {
	height: max-content;
	width: 46%;
}

.highlight-card {
	margin: 16px 16px;
	position: relative;
}
</style>
