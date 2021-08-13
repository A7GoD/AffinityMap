<template>
	<v-dialog
		v-model="show"
		transition="dialog-bottom-transition"
		max-width="400"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn fab x-small depressed v-bind="attrs" v-on="on"
				><v-icon :color="color">mdi-pencil</v-icon></v-btn
			>
		</template>

		<v-card>
			<v-toolbar :color="color" class="elevation-1"
				><h2>Edit Highlight</h2></v-toolbar
			>
			<div class="dialog-body">
				<v-row class="d-flex align-center select-group">
					<transition name="slide" mode="out-in">
						<v-select
							v-if="!newGroup"
							dense
							class="selectGroup"
							:items="items"
							label="Select a group"
							v-model="selected"
							outlined
							:disabled="newGroup"
							hide-details="auto"
						></v-select>
						<v-text-field
							v-else
							v-model="newGroupName"
							label="New Group"
							outlined
							dense
							hide-details="auto"
						></v-text-field>
					</transition>
					<v-btn
						color="secondary"
						outlined
						depressed
						fab
						small
						@click="newGroup = !newGroup"
						><v-icon :class="{ rotate: newGroup }"
							>mdi-plus</v-icon
						></v-btn
					>
				</v-row>

				<v-row class="dflex colors">
					<div v-for="(col, idx) in colors" :key="idx">
						<div
							:style="{ backgroundColor: col }"
							class="color-unselected"
							v-if="selectedColor !== idx"
							@click="selectedColor = idx"
						></div>
						<div
							:style="{ backgroundColor: col }"
							class="color-selected"
							v-if="selectedColor === idx"
							@click="selectedColor = idx"
						></div>
					</div>
				</v-row>
				<v-row>
					<v-textarea
						dense
						:rows="3"
						v-model="content"
						label="Content"
						outlined
						hide-details="auto"
					></v-textarea>
				</v-row>
			</div>
			<v-card-actions class="justify-end">
				<v-btn text @click="updateHighlight()">Update</v-btn>
				<v-btn text @click="show = !show">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import store from "../store/index.js";
export default {
	props: ["color", "body", "group", "id"],
	data: () => ({
		items: null,
		selected: null,
		show: false,
		newGroup: false,
		newGroupName: null,
		selectedColor: 0,
		content: null,
		colors: [],
	}),
	methods: {
		updateHighlight() {
			let date = new Date();
			store.commit("edit", {
				id: this.id,
				content: this.content,
				oldGroup: this.group,
				group: this.newGroup ? this.newGroupName : this.selected,
				color: this.colors[this.selectedColor],
				date,
			});
			this.show = false;
		},
	},
	watch: {
		show() {
			if (this.show === false) {
				this.content = this.selected = this.newGroupName = null;
				this.selectedColor = 0;
			} else {
				console.log(this.group);
				this.selected = this.group;
				this.content = this.body;
				let allColors = store.state.colors;
				this.colors = Object.keys(allColors).map((z) => {
					return allColors[z];
				});
				this.items = Object.keys(store.state.groupedData);
				if (this.items.length === 0) this.newGroup = true;
				else this.newGroup = false;
			}
		},
	},
};
</script>

<style scoped>
.dialog-body {
	padding: 8px 24px;
	margin: 16px 0px;
}

.dialog-body > * {
	margin: 16px;
}

.select-group > :first-child {
	max-width: 250px;
	margin-right: 8px;
}

.select-group {
	justify-content: space-between;
}

.rotate {
	transform: rotateZ(45deg);
	transition: all 300ms ease;
}

.colors {
	justify-content: space-between;
	align-items: center;
	/* margin-bottom: 12px; */
}
.color-unselected {
	box-sizing: border-box;
	border-radius: 50%;
	height: 32px;
	width: 32px;
	cursor: pointer;
	transition: all 300ms;
}
.color-selected {
	box-sizing: border-box;
	border-radius: 50%;
	border-width: 2px;
	border-style: dashed;
	stroke-dashoffset: 10;
	filter: brightness(1.2);
	height: 32px;
	width: 32px;
	cursor: pointer;
	transition: all 300ms;
}

.slide-enter-active {
	transition: all 300ms ease;
	position: relative;
}

.slide-enter {
	transform: translateY(50%);
	opacity: 0;
}
.slide-leave-active {
	position: relative;
	transition: all 300ms ease;
}

.slide-leave-to {
	opacity: 0;
	transform: translateY(-50%);
}
</style>
