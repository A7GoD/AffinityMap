<template>
	<div
		ref="affinitymap"
		class="affinity-map d-flex"
		@dragover.prevent
		@dragleave.prevent
	>
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
						:top="note.top"
						:left="note.left"
						:pos="note.pos"
					/>
				</div>
			</div>
			<div v-else class="grouped-highlights-container">
				<Bucket
					v-for="group in groups"
					:group="group"
					:highlights="highlights"
					:key="group"
				/>
			</div>
		</div>
		<ZoomButtons
			v-on:zoomin="zoomin"
			v-on:zoomout="zoomout"
			v-on:reset="reset"
		/>
	</div>
</template>

<script>
import Bucket from "../components/Bucket.vue";
import Highlight from "../components/Highlight.vue";
import ZoomButtons from "../components/ZoomButtons.vue";

export default {
	components: { Highlight, Bucket, ZoomButtons },
	data: () => ({
		zoom: 100,
	}),

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
			return Object.keys(this.$store.state.groupedData);
		},
	},

	methods: {
		zoomout() {
			this.zoom -= 10;
			this.$refs["affinitymap"].style.zoom = `${this.zoom}%`;
		},
		zoomin() {
			this.zoom += 10;
			this.$refs["affinitymap"].style.zoom = `${this.zoom}%`;
		},
		reset() {
			this.zoom = 100;
			this.$refs["affinitymap"].style.zoom = `${this.zoom}%`;
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
