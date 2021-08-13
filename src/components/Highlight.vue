<template>
	<v-card
		draggable
		class="highlight"
		:color="highlightColor"
		:elevation="0"
		@dragstart="getClick"
		@dragend="getCoordinates"
		:style="
			!$store.state.groupMode && {
				position: position,
				left: leftVal,
				top: topVal,
			}
		"
		:class="{ invis: !filtered }"
	>
		<v-chip
			v-if="!$store.state.groupMode"
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
				<v-icon
					@click="() => $store.commit('delete', { id, group })"
					:color="highlightColor"
					>mdi-delete</v-icon
				>
			</v-btn>
			<v-btn
				fab
				x-small
				depressed
				v-if="position !== 'relative'"
				@click="
					() => {
						position = 'relative';
						leftVal = '0px';
						topVal = '0px';
					}
				"
			>
				<v-icon :color="highlightColor">mdi-undo</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script>
import EditHighlight from "./EditHighlight.vue";
export default {
	components: { EditHighlight },
	props: ["group", "content", "highlightColor", "id", "left", "top", "pos"],
	data: () => ({
		togglePopups: false,
		position: "relative",
		leftVal: "initial",
		topVal: "initial",
		clickLeft: "null",
		clickTop: "null",
	}),
	methods: {
		getCoordinates(e) {
			if (!this.$store.state.groupMode) {
				this.position = "absolute";
				let leftOffset =
					this.clickLeft.pageX - this.clickLeft.targetLeft;
				let topOffset = this.clickTop.pageY - this.clickTop.targetTop;
				this.leftVal = `${e.pageX - leftOffset}px`;
				this.topVal = `${e.pageY - topOffset}px`;
			}

			this.$store.commit("edit", {
				group: this.group,
				oldGroup: this.group,
				color: this.highlightColor,
				id: this.id,
				top: this.topVal,
				left: this.leftVal,
				pos: this.position,
				content: this.content,
			});
		},

		getClick(e) {
			if (!this.$store.state.groupMode) {
				let top = 0;
				let left = 0;
				let element = e.target;

				do {
					top += element.offsetTop || 0;
					left += element.offsetLeft || 0;
					element = element.offsetParent;
				} while (element);
				this.clickLeft = {
					pageX: e.pageX,
					targetLeft: left,
				};
				this.clickTop = { pageY: e.pageY, targetTop: top };
			}
		},
	},
	computed: {
		filtered() {
			const filters = this.$store.state.filteredGroups;
			if (filters.length > 0 && filters.includes(this.group)) return true;
			else if (filters.length > 0 && !filters.includes(this.group))
				return false;
			else return true;
		},
	},
	mounted() {
		this.leftVal = this.left;
		this.topVal = this.top;
		this.position = this.pos;
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
	top: 0px;
	left: 100%;
	transform: translate(-120%, 20%);
}

.popups > * {
	margin-bottom: 8px;
}

.invis {
	opacity: 0;
	pointer-events: none;
}
</style>
