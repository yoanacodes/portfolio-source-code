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
  name: "AirQuality",
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
        "<p>This project leverages data visualization to uncover different trends in the air quality of New York City and how they affect the population’s health. By looking at how air quality correlates with different metrics such as  Asthma Hospitalizations or Cardiac and Respiratory Deaths in the context of the city geography, we facilitate the analysis of the data and decision making.</p><p>The main findings are that while the majority of the indicators are trending downwards, meaning there is an overall improvement in the health and air quality outcomes, there are still stark differences between neighborhoods. In certain cases, we even observe a reversing of the positive trends in the 2015-2017 period with sharp upwards spikes returning.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/airquality/landing_image.png",
                description:
                  "<p>I chose to visualize the data in a slope chart as it is very powerful in showing trends, while allowing easy comparison between groups. With this graph users can obtain high level information quickly by simply parsing the shapes of the slopes, or make detailed analysis of any changes or outliers.</p>The project has two views users can switch between - exploring the boroughs or exploring the neighborhoods by borough.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/airquality/tooltip-neighborhood.png",
                description:
                  "As the values vary greatly, and sometimes overlap, users can hover over each line or point and see all details in a tooltip. In addition, the line and name of the borough or neighborhood is highlighted in red to enhance the ability to follow trends even in cases in which the data are very volatile.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/airquality/raw_data.png",
                description:
                  "The dataset used for the project contains different indicators of the air quality and related outcomes in New York City, as well as the location and time period. The information for each indicator is specific in both the measurement it requires, and the time period during which it was collected.",
                width: "760px",
                layout: "side",
              },
              {
                link: "assets/projects/airquality/borough_column.png",
                description:
                  "The raw data was using geo codes and did not include user friendly labels. Using Python and Pandas, I extracted the borough names based on the patterns in the geo code id and saved them as a new column of the Pandas dataframe.",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        data_analysis: [
          {
            link: "assets/projects/airquality/break-1.png",
            description:
              "A great challenge with this dataset was analyzing and filtering the data. Due to the specificity of each indicator, the time range for collection/monitoring vary greatly. <br><br>Since having a common time period was crucial in allowing any comparison and visualization of trends, I had to design a method that will filter the data in a consistent manner while preserving as many indicators as possible.",
            width: "960px",
            layout: "side",
          },
        ],
        data_visualization: [
          {
            link: "assets/projects/airquality/break-2.png",
            description:
              "<p>The data for each indicator and location vary greatly, and in some cases the values overlap, or the lines showing the trend would cross each other. This required implementing a tooltip using Voronoi.</p><p>In addition, some of the points had to be adjusted to overlap less, without expanding the visualization vertically, which would have visually skewed the data.</p>",
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
      return this.siteContent["airquality"];
    },
  },
};
</script>
