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
        <h3 class="mb-4">Data Analysis</h3>

        <template
          v-for="(image, index) in sections.process.dataAnalysis.images"
        >
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
  name: "OnExhibit",
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
        "<p>On Exhibit focuses on artifacts that are exhibited, digitalized and part of the open access API of the Smithsonian Institution, as this gives an interesting perspective on the restrictions museums face in making their collections more accessible to the public. This approach creates, in a way, an online tour of the available artifacts in each museum.</p><p>Users can choose a museum to explore with a dropdown, and see everything available in that museum (based on the data in the API) chronologically. This not only allows users to see the subset of artifacts that are displayed in the physical space of the museums, but also get to explore virtually a subset of these same artifacts, effectively creating an online tour of the museum - something ever more important in the times of COVID where a lot of constraints exist on public gatherings.</p><p>This project was created in partnership with the Smithsonian Institution (the world's largest museum, education, and research complex) during a joined collaboration with Parsons School of Design.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/onexhibit/splash_page.png",
                description:
                  "Upon landing on the project's page, users see a random exhibition of artifacts from all museums in the Smithsonian Institution. This collection shows a different sample of artifacts every time the application loads.",
                width: "1040px",
                layout: "side",
              },
              {
                link: "assets/projects/onexhibit/overview.png",
                description:
                  "<p>Once users start exploring the museums, the experience begins with a brief overview. As some museums hold artifacts from different times in history, the oldest ones dating 3000 BCE, this visualization shows the time periods for which there is data in each museum.</p><p>This also allows quick comparison between the museums' focus, and sets the stage for the exploration.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/onexhibit/timeline.png",
                description:
                  "<p>When users choose a museum of interest, they see all of the exhibited artifacts in a chronological order. They are visualized in a beeswarm, and clustered by time period.</p><p>Each circle represents a single artifact, and on hover users see a larger image along with the date and title of the item. Clicking on it would link them to the artifact in question in the site of the museum in which it is exhibited.</p>",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/onexhibit/fetching.png",
                description:
                  "The Smithsonian Open Access API provides great detail for each artifact, and is structured in a specific, nested way. To be able to work with the datapoints I need, I had to clean and transform the original dataset. Using Node.js and underscore.js, I created a flat structure of the data, containing only the required metadata for each item.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/onexhibit/data_before_and_after.png",
                description:
                  "<p>Having the clean dataset allowed me to analyze the contents of the data and explore different ways to visualize it.</p><p>I analyzed what are the similarities and differences between the artifacts, and looked for any common tags. As each museum part of the Smithsonian Institution has different standards in collecting and structuring the artifacts' data, there were more differences than similarities.</p>",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        programming: [
          {
            link: "assets/projects/onexhibit/break-1.png",
            description:
              "<p>Managing asynchronicity was a challenging part of the project. For this purpose I created a four step Node.js script, which fetches the API data, cleans and reformats it, caches the images, and checks for any updates in the API data when requested.</p><p>The script relies heavily on promises, and is controlled by setting each of the four steps' value to true/false.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_visualization: [
          {
            link: "assets/projects/onexhibit/break-2.png",
            description:
              "A challenge in visualizing the data were some of the outliers. For example, the National Postal Museum holds artifacts that are easy to display and digitalize. In addition, some time periods have a disproportionate amount of items obtained by the museums.",
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
      return this.siteContent["onexhibit"];
    },
  },
};
</script>
