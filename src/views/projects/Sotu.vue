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
  name: "Sotu",
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
        "<p>The research question for this project was how do presidential speeches differ among presidents as well as between different years for the same president. Is there an overarching language pattern or does the context of the time period the speech was given in determine its language?</p><p>The project is focused on the ability to compare Presidents' speeches and visualizing which words they used the most. To achieve this, a rule was introduced that only words with five or more occurrences are displayed – this allows for an easier comparison as it removes a lot of noise.</p><p>The visualization allows users to draw insights not only about the words most used and potential topics discussed but also look at the evolution of language and how speeches become more wordy as time goes by. For example, while Washington’s word cloud barely contains 100 words fitting the criteria, Trump and Obama’s have hundreds of words. Further, some presidents, like Trump, consistently have specific words dominating their speech. In his case, comparing his speeches from 2017 and 2018 clearly shows that the words America, American, Americans dominate the rest of the language used.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/sotu/project_image.png",
                description:
                  "<p>With this project I wanted to explore the way State of the Union Speeches have changed throughout time, how current political and economical circumstances may affect them, and how language used by politicians has evolved. The main focus is on the words themselves, and not on the semantics of the speech as a whole.</p><p>To achieve this, I chose a word cloud - although not widely used for analysis, this type of graphs help quickly compare which words are used the most, focusing on repetitiveness itself and not on the context in which those words were used.</p>",
                width: "1040px",
                layout: "side",
              },
              {
                link: "assets/projects/sotu/washington_trump.png",
                description:
                  "In order to reduce noise, only words repeated at least five times during a speech were included in the word clouds. This helps emphasize the predominant language used and for longer, more repetitive speeches to have much bigger clouds than shorter or more diverse ones.",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        data_processing: [
          {
            link: "assets/projects/sotu/break-1.png",
            description:
              "<p>The State of the Union Speeches dataset is made of text (.txt) files with the whole speeches transcribed. A challenge in working with data formatted in such a way was making sure the names of the Presidents and years of each speech were linked dynamically.</p><p>Due to some inconsistencies and missing aspects of the data, a new dataset has to be used for the project to ensure all datapoint are displayed accordingly. Part of the next steps for the project is refactoring the code to work with more precise and detailed data.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        coding_challange: [
          {
            link: "assets/projects/sotu/break-2.png",
            description:
              "<p>The data only contains the surname of each President, and Presidents with the same surnames cannot be differentiated (for example Theodore Roosevelt and Franklin Delano Roosevelt). In result, they are merged and displayed as one, unless all first names are manually added.</p><p>Because of this and other inconsistencies in the data, my decision is to look for a new dataset to replace the one currently used.</p>",
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
      return this.siteContent["sotu"];
    },
  },
};
</script>
