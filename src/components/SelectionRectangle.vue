<template>
	<div
		class="selection-rectangle"
		:style="{
			display: display ? 'block' : 'none',

			top: height >= 0 ? `${top}px` : `${top + height}px`,
			left: width >= 0 ? `${left}px` : `${left + width}px`,

			width: `${Math.abs(width)}px`,
			height: `${Math.abs(height)}px`,
		}"
	/>
</template>

<script>
export default {
	props: ["top", "left", "width", "height", "display"],
};
</script>

<style scoped>
.selection-rectangle {
	position: absolute;

	border: solid 1px gray;
	border-radius: 3px;
	pointer-events: none;
	background: rgba(128, 128, 128, 0.25);
}
</style>
