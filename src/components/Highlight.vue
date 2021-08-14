<template>
	<v-card
		@click="() => this.$emit('select', id)"
		draggable
		class="highlight"
		:color="highlightColor"
		:elevation="0"
		@dragstart="getClick"
		@dragend="getCoordinates"
		@drop.prevent="droppedOn"
		:style="
			!$store.state.groupMode && {
				position: position,
				left: leftVal,
				top: topVal,
			}
		"
		:class="{ invis: !filtered, selected: isSelected }"
	>
		<v-chip
			v-if="!$store.state.groupMode && group !== null"
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

		<div class="user" color="#89f3a7">- {{ user }}</div>
		<div class="popups">
			<EditHighlight
				:color="highlightColor"
				:body="content"
				:group="group"
				:id="id"
				:user="user"
				:top="topVal"
				:left="leftVal"
				:pos="position"
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
				v-if="position !== 'relative' && groupMode === false"
				@click="
					() => {
						this.resetPosition();
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
	props: [
		"group",
		"content",
		"highlightColor",
		"id",
		"left",
		"top",
		"pos",
		"user",
		"date",
	],
	data: () => ({
		position: "relative",
		leftVal: "initial",
		topVal: "initial",
		clickLeft: "null",
		clickTop: "null",
		isSelected: false,
	}),
	methods: {
		getCoordinates(e) {
			if (!this.groupMode) {
				this.position = "absolute";
				let leftOffset =
					this.clickLeft.pageX - this.clickLeft.targetLeft;
				let topOffset = this.clickTop.pageY - this.clickTop.targetTop;
				let leftVal = `${e.pageX - leftOffset}px`;
				let topVal = `${e.pageY - topOffset}px`;

				this.$store.dispatch("changePosition", {
					left: leftVal,
					top: topVal,
					pos: this.position,
					id: this.id,
				});
			}
		},

		getClick(e) {
			if (!this.groupMode) {
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
			e.dataTransfer.setData("text", JSON.stringify({ id: this.id }));
		},

		droppedOn(e) {
			let data = e.dataTransfer.getData("text");
			let group = this.group;
			if (group === null) group = "_$dont_change_";
			setTimeout(() => {
				if (!this.groupMode) {
					if (data) var { id } = JSON.parse(data);
					if (id !== this.id) {
						this.$store.dispatch("changeGroup", {
							id,
							group,
						});
					}
				}
			}, 5);
		},

		resetPosition() {
			this.$store.dispatch("changePosition", {
				left: "0px",
				top: "0px",
				pos: "relative",
				id: this.id,
			});
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
		groupMode() {
			return this.$store.state.groupMode;
		},
	},
	beforeMount() {
		this.leftVal = this.left;
		this.topVal = this.top;
		this.position = this.pos;
	},

	watch: {
		top() {
			this.leftVal = this.left;
			this.topVal = this.top;
			this.position = this.pos;
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
	width: 90%;
	max-height: 125px;
	overflow-x: auto;
}

.user {
	text-transform: capitalize;
	position: absolute;
	bottom: 30px;
	left: 20px;
	width: 70%;
	text-overflow: ellipsis;

	white-space: nowrap;
	overflow: hidden;
}

.content::-webkit-scrollbar {
	display: none;
}

.highlight:hover > .popups {
	opacity: 1;
}

.popups {
	position: absolute;
	display: flex;
	opacity: 0;
	transition: opacity 200ms ease;
	height: max-content;
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

.selected {
	box-sizing: border-box !important;
	filter: drop-shadow(1px 0px 5px grey);
	border: gray solid 2px !important;
}
</style>
