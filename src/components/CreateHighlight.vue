<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" v-bind="attrs" v-on="on"
        ><v-icon>mdi-note-outline </v-icon></v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="secondary" dark>Create New Highlight</v-toolbar>
        <v-card-text>
          <div class="dialog-body">
            <v-text-field
              v-model="content"
              label="Content"
              outlined
            ></v-text-field>
            <div class="select-group">
              <v-select
                :items="items"
                label="Select a group"
                v-model="selected"
              ></v-select>
              <v-btn color="secondary" fab small
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ["items"],
  data: () => ({
    content: null,
  }),
};
</script>

<style scoped>
.dialog-body {
  padding: 24px;
}
.select-group {
  display: flex;
}
</style>