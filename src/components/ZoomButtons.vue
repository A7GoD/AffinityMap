<template>
	<div
		class="dflex justify-center zoom-btns"
		:style="{ pointerEvents: selectMode ? 'none' : 'auto' }"
	>
		<v-btn color="secondary" :style="{ marginRight: '8px' }" @click="zoomIn"
			>+</v-btn
		>
		<v-btn color="secondary" :style="{ marginRight: '8px' }" @click="reset"
			>100%</v-btn
		>
		<v-btn color="secondary" @click="zoomOut">-</v-btn>
	</div>
</template>

<script>
export default {
	props: ["selectMode"],
	methods: {
		zoomIn() {
			this.$emit("zoomin");
		},
		zoomOut() {
			this.$emit("zoomout");
		},
		reset() {
			this.$emit("reset");
		},
	},
};
</script>

<style>
.zoom-btns {
	position: fixed;
	bottom: 1vh;
	right: 1vw;
}
</style>
