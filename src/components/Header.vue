<template>
  <div>
    <div class="main-header">
      <span>Messaging/Affinity Map</span>
      <v-btn color="secondary">Group Highlights</v-btn>
    </div>
    <div class="secondary-header">
      <span>Filter By: <v-btn color="secondary">Select</v-btn></span>
      <!-- <v-btn color="secondary"><v-icon>mdi-note-outline</v-icon></v-btn> -->
      <CreateHighlight />
    </div>
  </div>
  <!-- <v-btn> Group Highlights </v-btn> -->
</template>

<script>
import CreateHighlight from "./CreateHighlight.vue";

export default {
  components: { CreateHighlight },
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