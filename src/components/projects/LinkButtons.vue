<template>
  <v-row class="mt-1">
    <v-col>
      <template v-for="(source, i) in sources">
        <v-btn
          v-if="hasSource(source) && hasSource(source).src_link != false"
          :key="i"
          :href="links[source].src_link"
          target="_blank"
          class="mr-5"
          width="200px"
          color="blue-grey lighten-5"
          elevation="3"
          rounded
          x-large
          :style="
            !$vuetify.breakpoint.xs || !$vuetify.breakpoint.sm
              ? 'margin-bottom: 20px;'
              : 'margin-bottom: 0;'
          "
        >
          <v-img
            class="mr-1"
            v-if="source != 'live'"
            :src="iconImage(source)"
            max-width="18px"
          >
          </v-img>
          <v-icon v-else class="mr-1">mdi-home-circle-outline</v-icon>
          {{ source === "live" ? "LIVE PROJECT" : source.toUpperCase() }}
        </v-btn>

        <v-tooltip top :key="`${i}-tooltip`">
          <template v-slot:activator="{ on, tooltip }">
            <v-btn
              v-if="hasSource(source) && hasSource(source).src_link == false"
              class="mr-5"
              width="200px"
              color="blue-grey lighten-5"
              elevation="3"
              rounded
              x-large
              v-bind="tooltip"
              v-on="on"
            >
              <v-img
                class="mr-1"
                v-if="source != 'live'"
                :src="iconImage(source)"
                max-width="18px"
              >
              </v-img>
              <v-icon v-else class="mr-1">mdi-home-circle-outline</v-icon>
              {{ source === "live" ? "LIVE PROJECT" : source.toUpperCase() }}
            </v-btn>
          </template>
          <span>Coming Soon</span>
        </v-tooltip>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "LinkButtons",
  props: {
    links: Object,
  },
  computed: {
    sources: function () {
      let linksArray = [];
      for (const [key, value] of Object.entries(this.links)) {
        if (key != "page") {
          linksArray.push(key);
        }
      }
      return linksArray;
    },
  },
  methods: {
    hasSource: function (linkName) {
      return (
        Object.prototype.hasOwnProperty.call(this.links, linkName) &&
        this.links[linkName]
      );
    },
    iconImage: function (linkName) {
      if (linkName == "github") {
        return "logos/github.svg";
      } else if (linkName == "notebook") {
        return "logos/jupyter.svg";
      } else if (linkName == "linkedin") {
        return "logos/linkedin.svg";
      } else if (linkName == "email") {
        return "logos/email.svg";
      } else {
        return false;
      }
    },
  },
};
</script>
