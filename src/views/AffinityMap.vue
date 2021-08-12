<template>
	<div class="affinity-map d-flex">
		<div class="highlights-container">
			<Highlight
				class="highlight-card"
				v-for="(note, idx) in highlights"
				:key="idx"
				:group="note.group"
				:content="note.content"
				:highlightColor="note.color"
			/>
		</div>
	</div>
</template>

<script>
import Highlight from "../components/Highlight.vue";

export default {
	components: { Highlight },
	data: () => ({
		highlights: [],
	}),
	watch: {
		"$store.state.highlights"() {
			this.highlights = this.$store.state.highlights;
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
.highlights-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: fit-content;
	max-width: 1100px;
}

.highlight-card {
	margin: 16px 16px;
}
</style>
