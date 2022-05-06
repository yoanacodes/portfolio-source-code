<style lang="sass">
.projectPage
	margin-top: 80px
</style>
<template>
  <div class="projectPage">
    <v-row justify="center">
      <v-col cols="9">
        <ProjectMeta
          :title="project.name"
          :description="project.description"
          :technologies="project.technologies"
          :data_source="project.datasrc"
          :links="project.links"
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="pa-0 mb-12" style="background: #f1f1f1">
      <v-col cols="10" class="pa-0 mb-12">
        <ProjectDescription :description="description" />
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col cols="10">
        <h2 class="majorSection mt-12">PROCESS</h2>
        <h3 class="mb-4">Design</h3>
        <template v-for="(image, index) in sections.process.design.images">
          <ImageWithDescription
            :key="index"
            :layout="image.layout"
            :image="image"
          />
        </template>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col cols="10">
        <h3 class="mb-4">Coding Challanges</h3>
        <CodingSection :codeView="codeChallanges" />
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col cols="10" class="mb-10">
        <h2 class="majorSection">LINKS TO PROJECT</h2>
        <LinkButtons :links="project.links" />
      </v-col>
    </v-row>

    <v-divider class="mt-12 mb-12"></v-divider>
    <ProjectsGrid />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectDescription from "@/components/projects/ProjectDescription";
import ImageWithDescription from "@/components/projects/ImageWithDescription.vue";
import CodingSection from "@/components/projects/CodingSection.vue";
import LinkButtons from "@/components/projects/LinkButtons.vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";

export default {
  name: "VisualizingGradSchool",
  components: {
    ProjectMeta,
    ProjectDescription,
    ImageWithDescription,
    CodingSection,
    LinkButtons,
    ProjectsGrid,
  },
  data() {
    return {
      description:
        "<p>This project is mainly about experimenting with DynamoDB as a database and getting to know AWS. It was part of a class on Data Structures I took in the MS Data Visualization program at Parsons School of Design.</p><p>This project visualizes four weeks of my life in grad school – measuring sleep, energy levels and steps taken during each Monday, Tuesday, and Wednesday (the days I had the most classes). It was interesting to reflect on my life in a visual form and observe the patterns.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/gradschool/project_image.png",
                description:
                  "For this project I self-collected three metrics about myself for four weeks during grad school: sleep, energy level and steps taken. I chose a radar chart, as it is great for showing trends of indicators on different scale.",
                width: "1040px",
                layout: "side",
              },
              {
                link: "assets/projects/gradschool/sketch.png",
                description:
                  "Initially I sketched my idea in Figma with five metrics instead of three, including high and low daily temperature. This data, however, turned out to be irrelevant and did not correlate to the original three metrics.",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        backend: [
          {
            link: "assets/projects/gradschool/backend.png",
            description:
              "The project was implemented in DynamoDB and AWS as part of a class on Data Structures I took in the MS Data Visualization program at Parsons School of Design. Working with a new, specific database was challenging and querying the data required several iterations until it worked as expected.",
            width: "960px",
            layout: "side",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["siteContent", "dataIsReady"]),
    project: function () {
      if (!this.dataIsReady) return;
      return this.siteContent["visualizingGradSchool"];
    },
  },
};
</script>
