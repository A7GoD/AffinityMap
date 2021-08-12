<template>
	<v-card
		@dragenter.prevent
		@drag.prevent
		@dragleave.prevent
		color="#eceaec"
		class="bucket"
		outlined
		depressed
	>
		<div class="d-flex justify-center bucket-title">
			<div>{{ group }}</div>
		</div>

		<div v-for="(note, idx) in filteredHighlights" :key="idx">
			<Highlight
				class="highlight-card"
				:content="note.content"
				:highlightColor="note.color"
				:id="note.id"
				:group="note.group"
			/>
		</div>
	</v-card>
</template>

<script>
import Highlight from "./Highlight.vue";
export default {
	components: { Highlight },
	props: ["group", "highlights"],
	data: () => ({}),
	methods: {},
	computed: {
		filteredHighlights: {
			get() {
				return this.$store.state.groupedData[this.group];
			},
			set(value) {
				this.$store.commit("updateData", {
					array: value,
					group: this.group,
				});
			},
		},
	},
};
</script>

<style>
.bucket {
	margin: 8px 8px;
	min-width: 500px;
	/* min-width: 48%; */
	/* max-width: 45%; */
	width: max-content;
}

.bucket-title {
	margin: 8px 0px;
}

.bucket-title > div {
	display: grid;
	place-items: center;
	text-align: center;
	padding: 8px;
	box-sizing: border-box;
	text-transform: capitalize;
	background: white;
	border: solid 2px #ceccce;
	font-weight: bold;
}

.highlight-card {
	margin: 16px 16px;
}

.bucket-content {
	display: flex;
	flex-wrap: wrap;
}
</style>
