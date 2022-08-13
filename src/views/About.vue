<style lang="sass">
#about
	margin-left: 20px
	font-size: 14pt
	#allTechnologies
		h4.techAspect
			font-size: 10pt
			font-weight: 500
		.thisTechType
			float: left
			width: 100%
</style>
<template>
  <v-container class="mb-12 mt-12 ml-4 pb-12 pt-12" fluid>
    <v-row id="about" class="mb-12 mr-2" justify="center">
      <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
        <h2 class="py-3 font-weight-bold text-h3">ABOUT ME</h2>
        <p class="text-h5 font-weight-light" v-html="aboutMe"></p>
      </v-col>

      <v-spacer></v-spacer>

      <v-col
        id="allTechnologies"
        cols="12"
        xs="12"
        sm="12"
        md="5"
        lg="5"
        xl="5"
        :class="{
          'mt-0 ml-10 mr-10':
            !$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm,
        }"
      >
        <v-row no-gutters>
          <h2 class="py-3 font-weight-bold text-h3 mb-4">SKILLS</h2>
          <div
            class="mb-4 thisTechType"
            v-for="(type, i) in techTypes"
            :key="i"
          >
            <h4 class="techAspect">
              {{ type.replace(/_/g, " ").toUpperCase() }}
            </h4>
            <template v-for="(tech, i) in getTechnologies[type]">
              <v-chip
                label
                color="#333"
                outlined
                :key="i"
                class="mr-1 mb-1 mt-1"
              >
                {{ tech }}
              </v-chip>
            </template>
          </div>
        </v-row>

        <v-row no-gutters>
          <h2 class="py-3 font-weight-bold text-h3 mb-4 mt-12">NEXT STEPS</h2>
          <v-col cols="12" class="pa-0">
            <v-chip label color="#333" outlined class="mr-1 mb-1 mt-1"
              >React</v-chip
            ><br />

            <v-chip label color="#333" outlined class="mr-1 mb-1 mt-1"
              >SQL</v-chip
            ><br />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import * as _ from "underscore";

export default {
  name: "About",
  data() {
    return {
      aboutMe:
        // "<p>I am an aspiring front-end, data visualization, and UX/UI engineer. Currently I am enrolled in the MS Data Visualization graduate program at Parsons School of Design in New York City graduating in May 2022. Here, I take classes in Data Visualization, Design, Statistics, Machine Learning and Visualizing Uncertainty.</p><p>I hold a Bachelors degree in Accounting from the University of National and World Economy in Sofia, Bulgaria. Before applying to the MS Data Visualization program, I worked as a Clinical Trials Site Manager at IQVIA on clinical studies performed in the United States and Canada.</p><p>Since 2019, when I finally had a chance to pursue my passion for engineering, I have been studying programming through different books, online classes, and tutorials. I also had a chance to engage in peer programming with a mentor and learn best practices from them. As preparation for applying to the MS Data Visualization program at Parsons School of Design, I created the projects in the playground section of this website. Since then, my skills in both engineering and design have evolved, and are represented in the portfolio section of this site.</p><p>As part of my final semester at the MS Data Visualization program, I am currently working on my thesis project, as well as three machine learning projects, and a collaboration with graduate degree Psychology students on visualizing uncertainty in statistical distributions, polling data, and data visualization.</p>",
        "<p>I am a front-end, data visualization, and UX/UI engineer. I obtained my Master of Science in Data Visualization degree at Parsons School of Design in New York City in May 2022. At Parsons, I took classes in Data Visualization, Programming, Design, Data Manipulation, Statistics, Machine Learning and Visualizing Uncertainty.</p><p>I hold a Bachelors degree in Accounting from the University of National and World Economy in Sofia, Bulgaria. Before applying to the MS Data Visualization program, I worked as a Clinical Trials Site Manager at IQVIA on clinical studies performed in the United States and Canada.</p><p>Since 2019, when I finally had a chance to pursue my passion for engineering, I have been studying programming through different books, online classes, and tutorials. I also had a chance to engage in peer programming with mentors and learn best practices from them. As preparation for applying to the MS Data Visualization program at Parsons School of Design, I created the projects in the playground section of this website. Since then, my skills in both engineering and design have evolved, and are represented in the portfolio section of this site.</p>",
    };
  },
  computed: {
    ...mapState(["siteContent", "dataIsReady"]),
    getTechnologies: function () {
      if (!this.dataIsReady) return;
      let projects = _.keys(this.siteContent);

      let technologies = _.chain(this.siteContent)
        .map((value, key) => {
          return value.technologies;
        })
        .value();

      let techStackGroups = _.keys(technologies[0]);

      let allTechnologies = {};

      // for each of the 5 categories
      _.each(techStackGroups, (tech) => {
        // create an entry in allTechnologies
        allTechnologies[tech] = [];

        _.each(technologies, (stack) => {
          // save the technologies for each project in the respective placeholder
          allTechnologies[tech].push(stack[tech]);
        });

        // flatten
        allTechnologies[tech] = _.chain(allTechnologies[tech])
          .flatten()
          .filter((t) => t != false)
          .uniq()
          .value();
      });

      // add design skills
      ["UX/UI", "Adobe Illustrator", "Adobe Photoshop"].forEach((skill) => {
        allTechnologies["design"].push(skill);
      });

      return allTechnologies;
    },
    techTypes: function () {
      return _.keys(this.getTechnologies);
    },
  },
};
</script>
