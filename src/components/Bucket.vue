<template>
	<v-card
		@drop="dropCheck"
		@drag.prevent
		@dragenter.prevent
		@dragover.prevent="canDrop = true"
		@dragleave.prevent="canDrop = false"
		color="#eceaec"
		class="bucket"
		:class="{ invis: !filtered, 'drop-here': canDrop }"
		outlined
		depressed
	>
		<div class="d-flex justify-center bucket-title">
			<div>{{ group ? group : "[STICKY]" }}</div>
		</div>
		<div class="bucket-body">
			<div
				class="highlight-card-in-bucket"
				v-for="(note, idx) in filteredHighlights"
				:key="idx"
			>
				<Highlight
					class=""
					:content="note.content"
					:highlightColor="note.color"
					:id="note.id"
					:group="note.group"
					:user="note.user"
				/>
			</div>
		</div>
	</v-card>
</template>

<script>
import Highlight from "./Highlight.vue";
export default {
	components: { Highlight },
	props: ["group", "highlights"],
	data: () => ({
		canDrop: false,
	}),
	methods: {
		dropCheck(e) {
			let data = e.dataTransfer.getData("text");
			e.dataTransfer.clearData();
			let { id } = JSON.parse(data);
			this.$store.dispatch("changeGroup", { id, group: this.group });
			this.canDrop = false;
		},
	},
	computed: {
		filteredHighlights: {
			get() {
				return this.$store.state.groupedData[this.group];
			},
			// set(value) {
			// 	this.$store.commit("updateData", {
			// 		array: value,
			// 		group: this.group,
			// 	});
			// },
		},
		filtered() {
			const filters = this.$store.state.filteredGroups;
			if (filters.length > 0 && filters.includes(this.group)) return true;
			else if (filters.length > 0 && !filters.includes(this.group))
				return false;
			else return true;
		},
	},
};
</script>

<style>
.bucket {
	margin: 8px 8px;
	min-width: 580px;
	min-height: 200px;
	height: max-content;
	max-height: max-content;
	width: 580px;
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

.highlight-card-in-bucket {
	width: min-content;
	margin: none;
	padding: none;
}
.highlight-card-in-bucket {
	margin: 16px 16px;
}

.bucket-body {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	height: max-content;
}

.drop-here ~ *,
.drop-here .highlight-card-in-bucket,
.drop-here .highlight-card-in-bucket .highlight,
.drop-here .bucket-title {
	pointer-events: none;
}

.drop-here::after {
	background: transparent;
	backdrop-filter: blur(4px);
	pointer-events: none;
	display: grid;
	place-items: center;
	z-index: 10;
	content: "Drop Here";
	font-size: 32px;
	font-weight: bold;
	position: absolute;
	bottom: 0px;
	height: calc(100% - 50px);
	width: 100%;

	border-radius: 4px;
	border: dashed 3px #000;
}
</style>
