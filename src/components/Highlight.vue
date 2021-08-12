<template>
	<v-card class="highlight" :color="highlightColor" :elevation="0">
		<v-chip
			v-if="group"
			class="elevation-0 group-name"
			text-color="white"
			color="#666289"
			label
			small
			>{{ group }}</v-chip
		>
		<div class="content" color="#89f3a7">
			{{ content }}
		</div>
	</v-card>
</template>

<script>
export default {
	props: ["group", "content", "highlightColor"],
};
</script>

<style>
.highlight {
	padding: 16px;
	width: 225px;
	min-width: 225px;
	height: 225px;
}

.group-name {
	margin-bottom: 16px;
	text-transform: capitalize;
	height: max-content !important;
}

.group-name > span {
	padding: 3px 6px;
}

.content {
	padding: 10px 8px;
	font-size: 14px;
}
</style>
