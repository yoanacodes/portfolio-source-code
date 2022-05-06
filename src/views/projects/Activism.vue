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
        <h3 class="mb-4">Data Processing</h3>

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
import ProjectMeta from "@/components/ProjectMeta.vue";
import ProjectDescription from "@/components/projects/ProjectDescription";
import ImageWithDescription from "@/components/projects/ImageWithDescription.vue";
import LinkButtons from "@/components/projects/LinkButtons.vue";
import CodingSection from "@/components/projects/CodingSection.vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";

export default {
  name: "Activism",
  components: {
    ProjectMeta,
    ProjectDescription,
    ImageWithDescription,
    LinkButtons,
    CodingSection,
    ProjectsGrid,
  },
  data() {
    return {
      description:
        "<p>We have seen an uptick in activism, spanning multiple movements such as race, immigration, women’s rights, LGBT rights, and general demand for equality across all populations. These fights are not new and it is fascinating to see how the artifacts and visuals associated with activism have evolved throughout time.</p><p>Partnering with the Smithsonian Institution (the world's largest museum, education, and research complex) during a joined collaboration with Parsons School of Design was a great opportunity to explore the question of activism in its historical context. The fact that the Smithsonian museums contains ephemera dating back to the 18th century speaks to the importance of these artifacts in preserving history and human’s plight for change. This project explores the topic of “Memorabilia and Ephemera – Political and Activist Ephemera” from the Smithsonian API and visualizes images that have a CC0 license.</p><p>It attempts to answer questions such as: What historic movements associated with activism have taken place throughout history? What ephemeral artifacts, such as posters and pamphlets, have we preserved in museums? How has the imagery evolved throughout time?</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/activism/project_image.png",
                description:
                  "<p>This project explores the topic of “Memorabilia and Ephemera – Political and Activist Ephemera” from the Smithsonian API and visualizes images that have a CC0 license. I represented the data in an interactive heatmap in order to visualize both the quantities of the items, as well as their images.</p><p>Each box of the heatmap represents a collection of artifacts from a specific decade, belonging to the respective topic. The darker the color of the box, the more artifacts there are.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/activism/modal.png",
                description:
                  "When users click on a box of the heatmap they can explore the belonging collection of artifacts in a modal window. All items are represented by their images and main details - title, description, museum. If users are interested in more information, they can visit the artifact at the site of the museum owning it.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/activism/sketch.png",
                description:
                  "<p>The initial idea for the project was to create a timeline of the movements for which the artifacts were used.</p><p>Due to missing datapoints as many artifacts did not belong to a specific movement, and outliers such as Black Lives Matter which only takes place under this name in the last decade, a timeline was not a fitting visualization.</p><p>After thorough analysis of the available data, I decided to proceed with the heatmap, as it allows for missing datapoints to be accurately represented and also shows the density of the data.</p>",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/activism/fetching.png",
                description:
                  "The Smithsonian Open Access API provides great detail for each artifact, and is structured in a specific, nested way. To be able to work with the datapoints I need, I had to clean and transform the original dataset. Using Node.js and underscore.js, I created a flat structure of the data, containing only the required metadata for each item.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/activism/data_before_and_after.png",
                description:
                  "<p>Having the clean dataset allowed me to analyze the contents of the data and explore different ways to visualize it.</p><p>A part of this process was also adding an additional tag to each item - isSensitive - which checks for sensitive language in the artifacts' title or description. I later used this to blur such artifacts' contents on the front-end and only show them to users if they wanted to see them.</p>",
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
            link: "assets/projects/activism/break-1.png",
            description:
              "<p>Managing asynchronicity was a challenging part of the project. For this purpose I created a four step Node.js script, which fetches the API data, cleans and reformats it, caches the images, and checks for any updates in the API data when requested.</p><p>The script relies heavily on promises, and is controlled by setting each of the four steps' value to true/false.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_visualization: [
          {
            link: "assets/projects/activism/break-2.png",
            description:
              "Due to the nature of the data, some artifacts contain sensitive language. Their content is blurred by default, but users can reveal and explore them if they wanted to.",
            width: "960px",
            layout: "side",
          },
        ],
        data_analysis: [
          {
            link: "assets/projects/activism/break-3.png",
            description:
              "<p>Another challenge in creating the project was working with data that is not always specific or objective. For example, since the artifacts visualized are ephemeral, their place of origin or use is not always well known.</p><p>In addition, each artifact is associated with several distinct topics. As this classification has been created by specialists at the Smithsonian Institution, I reflected this in the project, and each artifact can be seen in the collections of each topic it belongs to.</p>",
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
      return this.siteContent["activism"];
    },
  },
};
</script>
