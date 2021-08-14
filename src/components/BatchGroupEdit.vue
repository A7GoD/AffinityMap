<template>
	<transition name="slideY">
		<div class="batch-edit" v-if="selectedHighlights.length > 0">
			<v-card>
				<v-card-text>
					<div>
						<v-row
							class="d-flex justify-center flex-row select-box"
						>
							<v-checkbox
								color="secondary"
								v-model="isGroupless"
								label="All sticky?"
							/>
							<div class="select-group d-flex align-center">
								<transition name="slide" mode="out-in">
									<v-select
										:menu-props="{
											maxHeight: '400',
											offsetY: true,
											top: true,
										}"
										v-if="!newGroup"
										dense
										:items="setItems"
										label="Select a group"
										v-model="selected"
										outlined
										:disabled="newGroup || isGroupless"
										hide-details="auto"
									></v-select>
									<v-text-field
										v-else
										v-model="newGroupName"
										label="New Group"
										outlined
										dense
										hide-details="auto"
										:disabled="isGroupless"
									></v-text-field>
								</transition>
								<v-btn
									:disabled="isGroupless"
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
							</div>
						</v-row>
					</div>
				</v-card-text>
			</v-card>
			<div class="action-buttons">
				<v-btn
					color="secondary"
					fab
					small
					text
					outlined
					@click="changeGroups"
					><v-icon small> mdi-check </v-icon>
				</v-btn>
				<v-btn
					color="secondary"
					fab
					small
					text
					outlined
					@click="$emit('cancel')"
					><v-icon small> mdi-cancel </v-icon>
				</v-btn>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: ["items", "selectedHighlights"],
	data: () => ({
		isGroupless: true,
		newGroupName: null,
		newGroup: false,
		selected: [],
	}),
	methods: {
		changeGroups() {
			let groupName;
			if (this.isGroupless) {
				groupName = null;
			} else {
				if (this.newGroup) {
					groupName = this.newGroupName;
				} else groupName = this.selected;
			}

			for (let id of this.selectedHighlights) {
				this.$store.dispatch("changeBucket", { id, group: groupName });
			}

			this.$emit("cancel");
		},
	},

	computed: {
		setItems() {
			return this.items.filter((x) => x !== null);
		},
	},
};
</script>

<style scoped>
.batch-edit {
	height: max-content;
	width: max-content;
	position: fixed;
	left: 50%;
	bottom: 5%;
	transform: translateX(-50%);
}

.batch-edit > * {
	height: max-content;
	width: max-content;
	padding: 16px;
}

.select-box {
	gap: 8px;
}
.select-group {
	justify-content: space-between;
}
.select-group > :first-child {
	max-width: 200px;
	margin-right: 8px;
}
.action-buttons {
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-content: center;
	justify-content: center;
	position: absolute;
	left: calc(16px + 100%);
	height: 100%;
	top: 0px;
	padding: 0%;
}

.rotate {
	transform: rotateZ(135deg);
	transition: all 300ms ease;
}

.slide-enter-active,
.slide-leave-active {
	transition: opacity 200ms ease, transform 200ms ease;
	position: relative;
}

.slide-enter {
	transform: translateY(50%);
	opacity: 0;
}

.slide-leave-to {
	opacity: 0;
	transform: translateY(-50%);
}

.slideY-enter,
.slideY-leave-to {
	bottom: -100px;
	opacity: 0;
}

.slideY-enter-active,
.slideY-leave-active {
	transition: 200ms bottom ease, opacity 200ms ease;
}
</style>
