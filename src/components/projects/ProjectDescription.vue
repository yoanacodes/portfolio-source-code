<template>
  <v-row justify="center" class="bgDescription text-center mb-12 mt-12 pb-8">
    <v-col cols="9" class="longDescription pa-0 mt-12">
      <div v-html="description" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProjectDescription",
  props: {
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
