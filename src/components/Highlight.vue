<template>
	<v-card
		class="highlight"
		:color="highlightColor"
		:elevation="0"
		@click="togglePopups = !togglePopups"
	>
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
		<div class="popups">
			<EditHighlight
				:color="highlightColor"
				:body="content"
				:group="group"
				:id="id"
			/>
			<v-btn fab x-small depressed>
				<v-icon :color="highlightColor">mdi-delete</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script>
import EditHighlight from "./EditHighlight.vue";
export default {
	components: { EditHighlight },
	props: ["group", "content", "highlightColor", "id"],
	data: () => ({
		togglePopups: false,
	}),
	methods: {
		startDrag(e) {
			this.$emit("dragEvent", e);
		},
	},
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
.popups {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 70px;
	top: 0px;
	left: 100%;
	transform: translate(-120%, 20%);
}
</style>
