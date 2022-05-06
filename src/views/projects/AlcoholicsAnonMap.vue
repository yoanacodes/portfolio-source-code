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

        <v-row
          v-for="(video, index) in videos"
          :key="`v-${index}`"
          justify="center"
          class="mb-12"
        >
          <v-col cols="12">
            <v-card color="transparent" class="elevation-3">
              <v-row>
                <v-col cols="9">
                  <video
                    width="100%"
                    controls=""
                    autoplay=""
                    playsinline=""
                    muted=""
                    loop=""
                    controlslist="nodownload"
                  >
                    <source :src="video.link" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </v-col>
                <v-col cols="3">
                  <p class="pr-2" v-html="video.description"></p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col cols="10">
        <h3 class="mb-4">Data Cleaning and Backend</h3>
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
  name: "AlcoholicsAnonMap",
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
        "<p>This project plots all Alcoholics Anonymous meetings in Manhattan. It helps users find meetings that would match their schedule and needs, filtered based on several criteria: day and time of the meeting, meeting type, special interest, and accessibility of the location. The main goal of the project was to create a user-friendly interface, that is simple to navigate and efficient.</p><p>The project takes data from scraped versions of the old version of the Alcoholics Anonymous Website. It utilizes Node.js, Cheerio and underscore.js for scraping and cleaning the data, and PostgreSQL, AWS and Express to store the data in a database and serve it to the front-end.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/projects/aameetings/project-image.png",
                description:
                  "<p>For this project I wanted to visualize the Alcoholics Anonymous Meetings in Manhattan in the most useful and easy to navigate way. Apart of visually representing them as points on a map, so users can geographically orient themselves, I wanted to include several filtering options to help users narrow down the search based on their needs.</p><p>Furthermore, I included the option to filter out meetings based on the accessibility of the location to make sure users who need such facilities can find them easily.</p>",
                width: "1040px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/projects/aameetings/original-source.png",
                description:
                  "The original data for the Alcoholics Anonymous meetings was from scraped version of the website. Cleaning and extracting the valuable information out of it was one of the first challanges in creating this project as the source code contained a lot of empty spaces and lines.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/aameetings/clean-addresses.png",
                description:
                  "After managing to extract the data for the meetings and the locations using Cheerio, I was faced with the inconcistancies in the data. Since the data is not entered in a standardized way, there were many exceptions and edge cases. Some locations had several distinct entries as the name was spelled in a slightly different way each time.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/projects/aameetings/api-request.png",
                description:
                  "Linking the addresses with their latitude and longtitude using the TAMU Geoservices API was also an important part of the process. As there are limitations coming with each API, I had to make sure my code works for every scenario.",
                width: "960px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      videos: [
        {
          link: "assets/projects/aameetings/select-location.mp4",
          description:
            "<p>Upon lending on the page users see all of the locations of Alcoholics Anonymous meetings in Manhattan. They can parse over the circles and see how many meetings per weekday are held in the location of interest and the exact address. In addition, they could also see if the location is accessible.</p>",
        },
        {
          link: "assets/projects/aameetings/side-view.mp4",
          description:
            "<p>Further exploration is possible when users click on a specific location. The side view shows all details about the location itself, and then lists all meetings per weekday. In this view users can see more information about each meeting - start and end time, type of meeting, and special interest.</p>",
        },
        {
          link: "assets/projects/aameetings/filtering.mp4",
          description:
            "Alcoholics Anonymous meetings fall into different categories based on their type or their focus. In addition to those two important distinctions, I believe the ability to search for meetings based on when they take place is crucial for users - they would either want to make a plan when to visit meetings, or would need to know which meetings start soon.",
        },
      ],
      codeChallanges: {
        backend: [
          {
            link: "assets/projects/aameetings/break-1.png",
            description:
              "<p>The data was stored in two PostgreSQL tables in AWS. I wanted to make as little API calls as possible, while providing the required data to the front-end at the moment the user needs it.</p><p>I created a separate query to make on load of the application, which creates the filters at the top of the page. What I found challanging was getting data from the two separate tables and merging them together in the API call.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        "ux/ui": [
          {
            link: "assets/projects/aameetings/break-2.png",
            description:
              "<p>Knowing how important it is for users to have access to upcoming meetings quickly. In this sketch I included a button which shows the meetings in the next two hours.</p><p>This is part of the next steps of the project, as the code needs to be refactored to make the proper calculations, even when the call is made less than two hours before midnight and includes meetings from the next day.</p>",
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
      return this.siteContent["alcoholicsAnonMap"];
    },
  },
};
</script>
