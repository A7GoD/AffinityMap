<template>
	<v-card color="#eceaec" class="bucket" outlined depressed>
		<div class="d-flex justify-center bucket-title">
			<div>{{ group }}</div>
		</div>
		<draggable class="bucket-content" v-model="filteredHighlights">
			<div v-for="(note, idx) in filteredHighlights" :key="idx">
				<Highlight
					class="highlight-card"
					:content="note.content"
					:highlightColor="note.color"
					:id="note.id"
					:group="note.group"
				/>
			</div>
		</draggable>
	</v-card>
</template>

<script>
import draggable from "vuedraggable";
import Highlight from "./Highlight.vue";
export default {
	components: { Highlight, draggable },
	props: ["group", "highlights"],
	data: () => ({}),
	methods: {
		checkDrop(x) {
			this.draggedItem = x;
			this.$emit("dragging", { id: x, oldGroup: this.group });
		},
		dropItem() {
			this.$emit("dropped", this.group);
		},
	},
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
	min-width: 48%;
	width: 45%;
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
