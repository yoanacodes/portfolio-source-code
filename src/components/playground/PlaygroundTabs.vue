<style lang="sass">
#playgroundTabs
	position: sticky
	width: 100% !important
	background: #fff
	top: 49px
	bottom: 0
	z-index: 200

	.tab
		border: 1px solid #888
</style>

<template>
  <v-row no-gutters justify="center" id="playgroundTabs" class="elevation-3">
    <v-col cols="9" class="ma-0 pa-0">
      <v-card class="elevation-0">
        <v-tabs
          background-color="transperant"
          slider-color="hotpink"
          color="hotpink"
          slider-size="3"
          centered
          :show-arrows="true"
        >
          <v-tab
            v-for="project in projects"
            :key="project"
            :to="'/playground/' + project"
            class="tab"
          >
            {{ siteContent.playground.projects[project].short_name }}
          </v-tab>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlaygroundTabs",
  computed: {
    ...mapState(["siteContent", "dataIsReady"]),
    projects: function () {
      if (!this.dataIsReady) return;
      let playground = [];
      for (const [key, value] of Object.entries(
        this.siteContent.playground.projects
      )) {
        playground.push(key);
      }
      return playground;
    },
  },
};
</script>
