<style lang="sass">
#projectNav
	max-width: 70%

	h4
		font-size: 10.5pt !important
		font-weight: 300
		color: #333
		line-height: 1.35em

	.projectWrapper
		border: 10px solid transparent
		max-height: 700px
		overflow: auto

		&:hover
			background: #eee
			max-height: 1000px
			transition: background 0.5s linear

	a:hover
		transition: 0.9s
		opacity: 0.9

	.techStack
		opacity: 0
		max-height: 0
		overflow: hidden
		margin-top: 10px

	.showTags
		opacity: 1
		max-height: 400px
		transition: max-height 0.95s  linear, opacity 0.5s linear

	.hideTags
		opacity: 0
		height: 0
		transition: opacity 0.5s linear

	.v-chip
		pointer-events: none

	.imgStyle
		-webkit-filter: grayscale(100%)
		filter: grayscale(100%)
</style>

<template>
  <v-container v-if="dataIsReady" id="projectNav">
    <v-row>
      <v-col
        v-for="(project, i) in projects"
        :key="i"
        class="d-flex child-flex"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
      >
        <router-link :to="'/projects/' + siteContent[project].links.page">
          <v-card
            class="projectWrapper"
            :style="{ 'min-height': calculateHeight }"
            @mouseenter="mouseEnter($event)"
            @mouseleave="mouseLeave($event)"
          >
            <v-img
              :src="siteContent[project].thumbnail"
              aspect-ratio="1"
              class="grey lighten-2 imgStyle"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-2"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <h4 class="mt-4 text-button">{{ siteContent[project].name }}</h4>
            <div class="techStack">
              <template v-for="(tech, i) in tech(project)">
                <v-chip
                  pill
                  small
                  color="white"
                  label
                  :key="i"
                  class="mr-1 mb-1 mt-1"
                >
                  {{ tech }}
                </v-chip>
              </template>
            </div>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";
import * as _ from "underscore";

export default {
  name: "ProjectsGrid",
  data: () => ({}),
  computed: {
    ...mapState(["siteContent", "dataIsReady"]),
    projects: function () {
      if (!this.dataIsReady) return;
      let projectNames = [];
      for (const [key, value] of Object.entries(this.siteContent)) {
        projectNames.push(key);
      }

      projectNames = projectNames.filter((project) => project != "playground");

      return projectNames;
    },
    calculateHeight: function () {
      if (this.$vuetify.breakpoint.xl) {
        return "390px";
      }
      if (this.$vuetify.breakpoint.lg) {
        return "340px";
      }
      if (this.$vuetify.breakpoint.md) {
        return "320px";
      }
      if (this.$vuetify.breakpoint.sm) {
        return "380px";
      }
      if (this.$vuetify.breakpoint.xs) {
        return "100px";
      } else {
        return "300px";
      }
    },
  },
  mounted() {},
  methods: {
    tech: function (project) {
      let tags = Object.values(this.siteContent[project].technologies);

      return _.chain(tags)
        .filter((tag) => tag != false)
        .flatten()
        .value();
    },
    mouseEnter: function (event) {
      d3.select(event.target)
        .select(".techStack")
        .attr("class", "techStack showTags");
    },
    mouseLeave: function (event) {
      d3.select(event.target)
        .select(".techStack")
        .attr("class", "techStack hideTags");
    },
  },
};
</script>
