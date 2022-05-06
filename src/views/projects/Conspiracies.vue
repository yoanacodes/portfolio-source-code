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
  name: "Conspiracies",
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
        "<p>Conspiracy theories and the belief in them have exponentially grown in the last few years and are increasingly influencing public opinion and life. Therefore, it is of great importance to analyze what we know historically about what makes certain groups more likely to subscribe to such believes and see if there are any strategies successfully employed in the past to unite people who are likely to be divided by such believes. This project explores which conspiracy theories are most 'popular' and if there is any pattern in the way different demographic groups respond to them.</p><p>This project visualizes the data collected based on the <a href='https://www.frontiersin.org/articles/10.3389/fpsyg.2013.00279/full' target='_blank'>Generic Conspiracist Beliefs (GCB) scale</a>. The data was collected by Open Psychometrics through a <a href='https://openpsychometrics.org/tests/GCBS/' target='_blank'>self-reported online survey</a> in 2016. The GCB scale includes 15 questions related to important facets of conspiracism, and respondents can answer them on a 5-point scale: from strongly disagree to strongly agree. After the initial 15 questions, respondents are asked to complete an additional survey with the listed demographics metrics, and only respondents over 13 years of age who agree to have their data collected and used for research are provided in the dataset.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/conspiracies/overview.png",
                description:
                  "<p>The project explores how different demographic groups respond to prompts related to conspiracy theories.</p><p>I decided to use a more widely used visualization type - a bar chart - in order to make the project more accessible and easy to read for the variety of users who may be interested in the data.</p><p>In addition, bar charts enhance the ability to make comparisons between the represented groups, which is the main purpose of the project.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/conspiracies/detailed_gender.png",
                description:
                  "<p>The dataset used for the project has great variety of additional information on top of the answers to the questions.</p><p>I wanted to give users the ability to explore all of the dimensions of the data easily and draw their own conclusions based on the comparisons they make.</p><p>To achieve this, the project contains a two-step selection process - selection of a question, and selection of demographic grouping. This way users can explore any patterns between and within the different demographics.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/conspiracies/tooltip.png",
                description:
                  "<p>To enhance the user experience, the visualization includes a legend and a tooltip. Although the colors of the bars, representing different demographics, are not crucial for exploration, they do allow parsing of the visualization and quick recognition of any emerging patterns.</p><p>Further, a tooltip indicating details and the data for each bar as percent and absolute value, is implemented to enhance accessibility.</p>",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/conspiracies/data.png",
                description:
                  "<p>The data used for the project was encoded as numeric values only, and the actual human-friendly ones were part of the Generic Conspiracist Beliefs (GCB) scale paper.</p><p>As part of the data preparation, I had to manually connect the encoded values with the underlying prompts and demographic information.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/conspiracies/age.png",
                description:
                  "<p>As the data for different ages is continuous, and not binned, I have represented each available value as a separate category. This causes outliers, where there are only one or two respondents, to skew the data.</p><p>In future iterations of the project, I would like to find an appropriate clustering algorithm and group the respondents' ages.</p>",
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
            link: "assets/projects/conspiracies/break-1.png",
            description:
              "<p>One challenge in visualizing the data was dealing with outliers, especially in the groups family size and age. There is great variability in the data, and some outliers dwarf the other values.</p><p>To work around that, I normalized the data and represented it as percentage in the visualization, while displaying the absolute values in the tooltip.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        programming: [
          {
            link: "assets/projects/conspiracies/break-2.png",
            description:
              "When exploring the project, users can make many interactions and selections, and the order in which they make them is unpredictable. To ensure the visualization will display the proper dataset and remain flexible, I had to implement several checks and render conditionally the graphs.",
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
      return this.siteContent["conspiracies"];
    },
  },
};
</script>
