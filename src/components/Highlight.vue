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
    <v-main class="content" color="#89f3a7">
      {{ content }}
    </v-main>
  </v-card>
</template>

<script>
export default {
  props: ["group", "content", "highlightColor"],
};
</script>

<style>
.highlight {
  padding: 24px;
  width: 200px;
  height: 200px;
}

.group-name > span {
  padding: 5px 10px;
}

.content {
  padding: 12px;
}
</style>