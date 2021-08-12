<template>
	<div>
		<div class="main-header">
			<span>Messaging/Affinity Map</span>
			<v-btn color="secondary" @click="$store.comit('toggleGroupMode')"
				>Group Highlights</v-btn
			>
		</div>
		<div class="secondary-header">
			<span>Filter By: <v-btn color="secondary">Select</v-btn></span>
			<CreateHighlight />
		</div>
	</div>
</template>

<script>
import CreateHighlight from "./CreateHighlight.vue";

export default {
	components: { CreateHighlight },
	data: () => ({
		groups: ["risk", "standard"],
	}),
};
</script>

<style>
.main-header {
	display: flex;
	height: max-content;
	padding: 24px;
	width: 100%;
}

.main-header > :first-child {
	margin-right: auto;
	font-weight: bold;
	font-size: 1.5rem;
}

.secondary-header {
	display: flex;
	padding: 0px 48px;
}

.secondary-header > :first-child {
	margin-right: auto;
}
</style>
