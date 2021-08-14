<template>
	<div @dragstart.prevent>
		<div class="main-header">
			<span :style="{ zIndex: '1' }"
				>Messaging /
				<span>Affinity Map <span>&#8964;</span></span></span
			>

			<v-btn
				:style="{ zIndex: '1' }"
				color="secondary"
				@click="$store.commit('toggleGroupMode')"
				>{{
					$store.state.groupMode
						? "Standard View"
						: "Group Highlights"
				}}</v-btn
			>
		</div>
		<div class="secondary-header">
			<transition mode="out-in" name="slide-up">
				<span v-if="!shouldFilter"
					>Filter By:
					<v-btn
						:style="{ zIndex: '1' }"
						color="secondary"
						@click="shouldFilter = true"
						>Select</v-btn
					></span
				>
			</transition>
			<transition mode="in-out" name="slide-down">
				<div
					class="filter-box"
					v-if="shouldFilter"
					:style="{ zIndex: '1' }"
				>
					<FilterBox />
					<v-btn
						@click="
							() => {
								shouldFilter = false;
								$store.commit('updateFilters', { filters: [] });
							}
						"
						text
						fab
						small
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</div>
			</transition>

			<CreateHighlight />
		</div>
	</div>
</template>

<script>
import CreateHighlight from "./CreateHighlight.vue";
import FilterBox from "./FilterBox.vue";

export default {
	components: { CreateHighlight, FilterBox },
	data: () => ({
		shouldFilter: false,
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

.main-header > span > span {
	position: relative;
	color: #b4b3b4;
	cursor: pointer;
	user-select: none;
}
.main-header > span > span > span {
	position: absolute;
	right: 0px;
	transform: scaleX(1.3) translate(100%, -20%);
	bottom: 0px;
	font-size: 24px;
}

.secondary-header {
	display: flex;
	align-items: center;
	padding: 0px 48px;
	height: 50px;
}

.secondary-header > * {
	margin: 0px 8px;
}

.secondary-header > :last-child {
	margin-left: auto;
}

.filter-box {
	display: grid;
	grid-template-columns: minmax(300px, 300px) max-content;
	place-items: center;
}

.slide-up-enter {
	transform: translateX(-50%);
	opacity: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
	transition: all 300ms ease;
	position: absolute;
}
.slide-up-leave-to {
	transform: translateX(50%);
	opacity: 0;
}

.slide-down-enter {
	transform: translateX(-50%);
	opacity: 0;
}
.slide-down-enter-active,
.slide-down-leave-active {
	transition: all 300ms ease;
	position: absolute;
}
.slide-down-leave-to {
	transform: translateX(+50%);
	opacity: 0;
}
</style>
