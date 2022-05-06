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
  name: "ErrorBars",
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
        "<p>This project was created as part of the Visualizing Uncertainty class in the MS Data Visualization program at Parsons School of Design. It proposes a novel way to visualize uncertainty, specifically in polling data. Uncertainty in polling data is often represented by statistical concepts such as margin of error, standard deviation or confidence intervals, which are not easily understood by people with little to no background in statistics. This project suggest using intuitive measures and language, such as minimum, maximum, and average, to make uncertainty data available to everyone.</p><p>The inspiration for the idea comes from error bars and density plots. These two visualization methods are used very often when representing uncertainty, however, the consepts behind them are not easy to grasp without having advanced understanding of statistics. Because of that, this project takes advantage of measures which are very well known by people from all backgrounds - minimum, maximum, and average value - in an attempt to represent uncertainty in an intuitive way.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/error_bars/project-image.png",
                description:
                  "The project proposes a new way of visualizing uncertainty in polling data. As concepts such as standard deviation, confidence interval, and error require some knowledge of statistics, not everyone is able to fully grasp what stands behind the average usually shown as a single point estimate. Because of this, the project utilizes more intuitive language and measures - minimum, maximu, and average values.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/error_bars/main_view.png",
                description:
                  "<p>Initially users see only the minimum, maximum and average value of polling data for each month. This simplified interface allows users to easily follow and explore the trend and how values have changed from month to month. In addition to that, users can quickly see how big or small the range is in each month and compare this visually.</p>",

                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/error_bars/plots_no_size.png",
                description:
                  "Once they decide to see the distribution of polls, a circle is plotted for each plot. Initially they are sized by the amount of people participating in the poll. If the circles are not sized, users can see the distribution of polls across the different approval scores.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/error_bars/filtering_data.png",
                description:
                  "The data were cleaned and analized the data in Python and Pandas. The first task was to remove the polls for 2022, as they were included in the dataset, and then - aggregate all polls by month.",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        data_visualization: [
          {
            link: "assets/projects/error_bars/break-1.png",
            description:
              "<p>Representing uncertainty data is always a challanging task, especially when it comes to polling data, as so many different options have already been explored. Designing an experience which is both easy to understand by people of all backgrounds, and providing sufficient amount of data, was one of the biggest challanges. </p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_analysis: [
          {
            link: "assets/projects/error_bars/break-2.png",
            description:
              "<p>A challenging part of the data preparation and analysis was creating a supplementary table, containing the confidence intervals, percentiles, and standard deviation. Although a lot of those measures were not used in the project, it was a challange and great exercise calculating them.</p>",
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
      return this.siteContent["error_bars"];
    },
  },
};
</script>
