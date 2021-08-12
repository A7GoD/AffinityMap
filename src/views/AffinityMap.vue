<template>
  <div class="affinity-map">
    <Highlight
      content="test highlight"
      group="Risk"
      :highlightColor="colors.tomato"
    />
  </div>
</template>

<script>
import Highlight from "../components/Highlight.vue";

export default {
  components: { Highlight },
  data: () => ({
    colors: {
      tomato: "#f28384",
      aqua: "#86cefc",
      yellow: "#f8dd80",
      purple: "#e0a7f9",
      green: "#89f3a7",
    },
  }),
};
</script>

<style>
.affinity-map {
  width: 100%;
  flex: 1 0 0;
  padding: 24px;
}
</style>