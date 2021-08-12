<template>
	<v-menu
		:style="{ transition: 'height 300ms auto' }"
		v-model="show"
		class="elevation-1"
		left
		offset-y
		nudge-bottom="8"
		max-width="600"
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="secondary" v-bind="attrs" v-on="on"
				><v-icon>mdi-note-outline </v-icon></v-btn
			>
		</template>
		<v-card class="elevation-1">
			<v-card-text>
				<div class="dialog-body">
					<v-row :style="{ marginBottom: '8px' }">
						New Highlight
					</v-row>

					<v-row
						class="d-flex align-center select-group"
						:style="{ marginBottom: '8px' }"
					>
						<transition name="slide" mode="out-in">
							<v-select
								v-if="!newGroup"
								dense
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
			</v-card-text>
			<v-card-actions class="justify-end">
				<v-btn text @click="show = false">Cancel</v-btn>
				<v-btn text @click="createHighlight()">Create</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
import store from "../store/index";
export default {
	data: () => ({
		items: [],
		show: false,
		content: null,
		selected: null,
		selectedColor: 0,
		newGroup: false,
		newGroupName: null,
		colors: [],
	}),

	methods: {
		createHighlight() {
			let groupName;
			if (this.newGroup) {
				groupName = this.newGroupName;
				store.commit("createGroup", groupName);
			} else groupName = this.selected;

			store.commit("createHighlight", {
				content: this.content,
				group: groupName,
				color: this.colors[this.selectedColor],
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
				let allColors = this.$store.state.colors;
				this.colors = Object.keys(allColors).map((z) => {
					return allColors[z];
				});
				this.items = store.state.groups;
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
}
.select-group > :first-child {
	max-width: 200px;
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
	margin-bottom: 12px;
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
