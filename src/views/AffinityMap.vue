<template>
	<div
		class="affinity-map d-flex"
		@dragover.prevent
		@dragleave.prevent
		ref="affinitymapz"
	>
		<div
			v-if="!$store.state.groupMode"
			class="selection-area"
			@mousedown="dragStart"
			@mousemove="dragMove"
			@mouseup="dragLeave"
		></div>
		<div :style="{ width: '100%' }" class="d-flex justify-center">
			<div
				v-if="!$store.state.groupMode"
				class="ungrouped-highlights-container"
				:style="{ pointerEvents: selectMode ? 'none' : 'auto' }"
			>
				<Highlight
					v-for="note in highlights"
					v-on:select="($event) => $emit('select', $event)"
					:key="note.id"
					ref="highlight"
					class="highlight-card"
					:id="note.id"
					:group="note.group"
					:content="note.content"
					:highlightColor="note.color"
					:top="note.top"
					:left="note.left"
					:pos="note.pos"
					:user="note.user"
					:date="note.date"
				/>
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
			:selectMode="selectMode"
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
	props: ["selectMode", "highlights", "groups"],
	data: () => ({
		zoom: 100,
		dragS: false,
	}),

	methods: {
		zoomout() {
			this.zoom -= 10;
			this.$refs["affinitymapz"].style.zoom = `${this.zoom}%`;
		},
		zoomin() {
			this.zoom += 10;
			this.$refs["affinitymapz"].style.zoom = `${this.zoom}%`;
		},
		reset() {
			this.zoom = 100;
			this.$refs["affinitymapz"].style.zoom = `${this.zoom}%`;
		},
		dragStart(e) {
			this.dragS = true;
			this.$emit("startSelect", { x: e.pageX, y: e.pageY });
		},
		dragMove(e) {
			if (this.dragS) {
				this.$emit("moveSelect", { x: e.pageX, y: e.pageY });
			}
		},
		dragLeave(e) {
			this.dragS = false;
			this.$emit("leaveSelect", { x: e.pageX, y: e.pageY });
		},
	},
	computed: {},
};
</script>

<style>
.affinity-map {
	width: 100%;
	flex: 1 0 0;
	padding: 24px;
	justify-content: center;
}
.selection-area {
	top: 0px;
	left: 0px;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 0;
	background: transparent;
	/* pointer-events: none; */
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
	/* max-width: px; */
	justify-content: center;
	width: 90%;
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
