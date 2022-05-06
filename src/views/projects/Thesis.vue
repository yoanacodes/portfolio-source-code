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

        <h3 class="mb-4">Application Setup</h3>

        <template
          v-for="(image, index) in sections.process.application_setup.images"
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
        <h3 class="mb-4">Backend</h3>

        <template v-for="(image, index) in sections.process.backend.images">
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
  name: "Thesis",
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
        "<p><i>Is Food Making You Sick?</i> is exploring the relationship between diet and health in 184 countries through the analysis and visualization of extensive data on nutritional factors and diseases. The project aims to study and visualize these relationships by juxtaposing 42 nutrients and 84 health conditions, allowing users to explore and analyze them.</p><p><i>Is Food Making You Sick?</i> will answer questions such as do countries that have a high fat diet, also struggle with heart disease? Are countries in which people are consuming high amounts of sugar also overburdened with diabetes? and many others. By exploring the patterns between food consumption and health outcomes, users could better inform their dietary choices and be empowered by high quality, research data rather than speculative data that often float around the Internet. Exposing the data visually could also spark discussion amongst researchers about less researched correlations, setting the stage for testing hypotheses and performing additional studies.</p>",
      sections: {
        process: {
          application_setup: {
            images: [
              {
                link: "assets/projects/thesis/schema.png",
                description:
                  "<i>Is Food Making You Sick?</i> is built by analyzing and extracting the dataset powering it, from almost 6 Gigabytes of raw data from two extensive static sources - the <a href='https://www.globaldietarydatabase.org/' target='_blank'>Global Dietary Database</a> and the <a href='https://www.healthdata.org/gbd/2019' target='_blank'>Global Burden of Diseases</a>. <p>As there is no existing API with these datasets, I created my own, storing the data in a MySQL database. The API layer is implemented in Node.js and Express and is hosted on Heroku. The front-end itself is built in d3.js, Vue, Vuex, and Vuetify<p>",
                width: "960px",
                layout: "side",
              },
            ],
          },
          design: {
            images: [
              {
                link: "assets/projects/thesis/project_image.png",
                description:
                  "<i>Is Food Making You Sick?</i> allows users to explore the relationship between the nutrient and health condition they choose in an interactive scatterplot. <p>The main goal is to empower users to explore any patterns, trends, and relationships by juxtaposing data on nutrition consumption and health outcomes.<p>To achieve this, the user interface incorporates several selections, which gives users the power to compare and analyze the data in a way that serves them best.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/thesis/visualization_filtered.png",
                description:
                  "<p>The experience and analytical capabilities of the visualization are enhanced by adding the option to plot the regression line, as well as contextualize the datapoints geographically and with metadata such as population size, obesity, overweight, or underweight rates, used to size the countries.</p>",

                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/thesis/storytelling.png",
                description:
                  "An important part of the design process was creating the storytelling part of the application. The data, its representation and distribution are presented in two separate views, allowing users to understand better what are the building blocks of the main visualization.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/thesis/raw_datasources.png",
                description:
                  "The raw data from the Global Dietary Database and the Global Burden of Diseases contains approximately 6 Gigabytes of CSV files. They were cleaned, analyzed and curated, resulting in over 3 million rows of data.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/thesis/data_cleaning_nutrition.png",
                description:
                  "The data was cleaned, and prepared for injestion to the MySQL database with Python, Pandas and Matplotlib, resulting in two master dataframes.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/thesis/data_analysis_scatterplots.png",
                description:
                  "After the two datasets were prepared, the data was analyzed with Python and Pandas. In order to explore the correlations better, a series of scatterplots with regression line were created with Matplotlib and explored.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          backend: {
            images: [
              {
                link: "assets/projects/thesis/database.png",
                description:
                  "After cleaning, formatting, and analyzing the nutrition and health data, the two master datasets were injested in two MySQL tables. Additional metadata for country population and obesity, overweight, underweight rates from the World Bank and WHO respectively was added to the database in a separate table.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/thesis/api.png",
                description:
                  "The Node.js/Express API performs a JOIN on the three tables when users change their search parameters, and serves the data to the front-end.",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        UX_UI: [
          {
            link: "assets/projects/thesis/break-1.png",
            description:
              "<p>A challenge in creating the interactions for the visualization was managing the possible comparisons users may want to explore. Different filtering and highlighting capabilities were encoded in the user interface design, allowing users to make comparisons not only within a region, but also between regions.</p> <p>Additionally, the ability to highlight a specific country and compare it with other regions was implemented, providing the users with one more way they can explore, analyze and compare the data.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_visualization: [
          {
            link: "assets/projects/thesis/break-2.png",
            description:
              "<p>Due to the amount and density of the data, in some of the cases and areas of the scatterplot there is overplotting of countries. </p><p>To ensure users can explore the whole dataset and no data points will be lost, a Voronoi tooltip and a zoom functionality were added to the visualization. Combining the two functionalities was not an easy task, but it was a great learning opportunity.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        frontend: [
          {
            link: "assets/projects/thesis/break-3.png",
            description:
              "Implementing the user interactions required closely monitoring the state of the filters and current user behavior. This is achieved by keeping track of each possible selection, triggered by selection or hover, in the Vuex store.",
            width: "960px",
            layout: "side",
          },
        ],
        data_analysis: [
          {
            link: "assets/projects/thesis/break-4.png",
            description:
              "<p><i>Is Food Making You Sick?</i> utilizes data from multiple sources - the Global Dietary Database, Global Burden of Diseases, World Bank, and Who. </p><p>A challenge in preparing and analyzing the data was the different way countries' names are encoded in the different datasets. To automate the process as much as possible, the check and renaming were implemented in Python and Pandas, utilizing functions.</p>",
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
      return this.siteContent["thesis"];
    },
  },
};
</script>
