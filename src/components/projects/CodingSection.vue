<template>
  <v-row>
    <v-col cols="12">
      <v-tabs
        color="black"
        v-model="tab"
        background-color="transparent"
        centered
      >
        <v-tab v-for="codeTab in codeType" :key="codeTab">
          {{ codeTab.replace(/_/g, " ") }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" style="min-height: 600px">
        <v-tab-item
          v-for="(codeTab, i) in codeType"
          :key="i"
          class="pa-2 mt-12"
        >
          <template v-for="(image, i) in codeView[codeTab]">
            <ImageWithDescription
              :key="i"
              :image="image"
              :layout="image.layout"
            />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import ImageWithDescription from "@/components/projects/ImageWithDescription.vue";

export default {
  name: "CodingSection",
  components: {
    ImageWithDescription,
  },
  data() {
    return {
      tab: null,
    };
  },
  props: {
    codeView: Object,
  },
  computed: {
    codeType: function () {
      let codeArray = [];
      for (const [key, value] of Object.entries(this.codeView)) {
        codeArray.push(key);
      }
      return codeArray;
    },
  },
};
</script>
