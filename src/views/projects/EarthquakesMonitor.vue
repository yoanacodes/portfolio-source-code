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
  name: "EarthquakesMonitor",
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
        "<p>The <a href='https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php' target='_blank'>United States Geological Survey (USGS)</a> is a US science agency, which among its many missions, monitors global earthquakes at frequencies ranging from the past hour to 1 day to 30 days back.</p><p>The Earthquakes Monitor project, visualizes all earthquakes in the last seven days, happening worldwide, and allows users to easily filter and navigate the data on a map. Users can decide the magnitude of the earthquakes to focus on, by adjusting a sliding filter, between all earthquakes and earthquakes above specific magnitude. This feature can be used to filter only potentially more significant earthquakes without loosing the sheer volume of all earthquakes happening around the world. The color coding and point size, further highlight potential stronger earthquakes.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/earthquakes_monitor/project_image.png",
                description:
                  "<p>Once users land on the page, the earthquakes data for the past 7 days is plotted on the world map. All detected earthquakes are visible, and their strength is indicated by the color coding - from blue to red. Strength is also encoded as the size of the circle for accessibility.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/earthquakes_monitor/tooltip.png",
                description:
                  "<p>Further, a tooltip indicating details such as exact location and the strength, is implemented to enhance accessibility.</p><p>Users can also filter out earthquakes below a specific magnitude using the slider above the visualization, and visualize only the ones with higher magnitude.</p>",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/earthquakes_monitor/data_feed.png",
                description:
                  "A call is made to the USGS API on application load. The data are in a JSON format, and USGS provide ample detail about each specific eathquake. The data did not need to be heavily cleaned and transformed, as is the case in other APIs.",
                width: "660px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        data_analysis: [
          {
            link: "assets/projects/earthquakes_monitor/break-1.png",
            description:
              "This is the first project I made using Leaflet, and exploring such powerfull library is always a challenge. It was a great learning experience as the documentation is very exhaustive and detailed.",
            width: "660px",
            layout: "side",
          },
        ],
        data_visualization: [
          {
            link: "assets/projects/earthquakes_monitor/break-2.png",
            description:
              "A challenging aspect of the visualization are the density and real-time updates of the dataset. Due to the geographics of certain locations, the circles indicating each earthquake are overlapping, and since the data are constantly changing, there is no way to predict exactly how the map will look like at any point of time.",
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
      return this.siteContent["earthquakesMonitor"];
    },
  },
};
</script>
