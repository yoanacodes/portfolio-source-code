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
    <!-- live viz -->
    <v-row justify="center" class="pa-0 mb-12">
      <v-col cols="9" class="pa-0 mb-12">
        <div id="visualizationRefugeesDeaths"></div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectDescription from "@/components/projects/ProjectDescription";
import ImageWithDescription from "@/components/projects/ImageWithDescription.vue";
import CodingSection from "@/components/projects/CodingSection.vue";
import LinkButtons from "@/components/projects/LinkButtons.vue";

export default {
  name: "RefugeesDeaths",
  components: {
    ProjectMeta,
    ProjectDescription,
    ImageWithDescription,
    CodingSection,
    LinkButtons,
  },
  data() {
    return {
      description:
        "<p>This project visualizes the tragic circumstances under which refugees and migrants died or went missing while trying to reach Europe or upon their arrival. It focuses on the number of people who died and the cause of their death.</p><p>The dataset includes a general, as well as specific cause of death, date, location, description of the event, and data source. It contains more than 3000 rows, some of which involve the loss of life of multiple people, on occasions up to 800 dead or missing in a single event.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/playground/refugeesdeaths/colors.png",
                description:
                  "The different causes of death are represented first as groups and then broken down by exact cause as nodes in the treemap. To enhance the differentiation I also color coded them, using saturation to signify greater number of people who lost their lives to this cause of death.",
                width: "1040px",
                layout: "side",
              },
              {
                link: "assets/playground/refugeesdeaths/tooltip.png",
                description:
                  "The color is not critical for the interpretation of the visualization, as all information is communicated in the tooltip and the subtitles of each major group. The tooltip also allows exploration of otherwise too small sections of the treemap, hence representing each live lost.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/playground/refugeesdeaths/ss_data_cleaning.png",
                description:
                  "Working with a dataset on such a devastating topic, I wanted to visualize the human loss as granularly as possible. Although I believed a map would represent visually the amount of events and their locations very well, I did not want to move the focus away from the people who lost their lives. As a first step, I removed and cleaned the dataset in Pandas to make the dataset more managable.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/refugeesdeaths/ss_bar_dead_and_missing_per_year.png",
                description:
                  "Working with the clean dataset, I explored different possibilities to visualize it in Matplotlib. First, I grouped all cases by year and plotted the total amount of refugees who died or went missing by year regardless of the cause.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/refugeesdeaths/ss_bar_ref_death_per_year_and_cause.png",
                description:
                  "<p>After that, I separated the total amount of refugees and grouped them per the general cause of death. There are two main outliers in the dataset - the cases where the cause of death is unknown and the cases where the refugees drowned.</p><p>We all know about these cases as they are the most predominant ones we hear about, however, there is little information about all the other reasons why people die. I wanted to focus on those reasons, and shed some light on the many unfortunate, and sometimes cruel circumstances in which people die looking for a better and safer life.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/refugeesdeaths/ss_grouped_bar_violent_accidental_death.png",
                description:
                  "I then explored the different groups and type of events in a series of grouped bar charts solidifying my decision to remove the unknown and drowned categories from the D3.js visualization. The image here represents the specific causes under the general 'Violent accidental death'.",
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
            link: "assets/playground/refugeesdeaths/break-1.png",
            description:
              "Although I did not want to leave out any parts of the data, I had to make the decision to remove two of the general reasons for refugees' deaths: drowning and unknown. This allowed me to show other reasons, which usually do not get as much attention and are less known by the public.",
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
      return this.siteContent.playground.projects["refugeesDeaths"];
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render: function () {
      // set the dimensions and margins of the graph
      var margin = {
          top: 30,
          right: 0,
          bottom: 10,
          left: 10,
        },
        width = 1145 - margin.left - margin.right,
        height = 1045 - margin.top - margin.bottom,
        viewBoxWidth = width + margin.left + margin.right,
        viewBoxHeight = height + margin.top + margin.bottom;

      var svg = d3
        .select("#visualizationRefugeesDeaths")
        .append("svg")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.json("data/playground/refugeesdeaths/refugees_deaths.json").then(
        function (data) {
          var cause_of_death = [];

          data.children.map(function (d) {
            cause_of_death.push(d.name);
          });

          var root = d3
            .hierarchy(data)
            .sum(function (d) {
              return +d.size;
            })
            .sort(function (a, b) {
              return b.value - a.value;
            });

          d3
            .treemap()
            .tile(d3.treemapSquarify)
            .size([width, height])
            .paddingTop(28)
            .paddingRight(3)
            .paddingInner(3)
            .round(true)(root);

          // prepare a color scale
          var color = d3
            .scaleOrdinal()
            .domain(cause_of_death)
            .range(d3.schemeDark2);

          // And a opacity scale
          var opacity = d3
            .scaleLinear()
            .domain([
              d3.min(root.leaves(), function (d) {
                return +d.data.size;
              }),
              d3.max(root.leaves(), function (d) {
                return +d.data.size;
              }),
            ])
            .range([0.5, 1]);

          var tooltip = d3.select("#vizTooltip").attr("class", "darkTooltip");

          var cell = svg
            .selectAll("g")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("transform", function (d) {
              return "translate(" + d.x0 + "," + d.y0 + ")";
            });

          cell
            .append("rect")
            .attr("id", function (d) {
              return d.data.name.replace(/\s/g, "");
            })
            .attr("width", function (d) {
              return d.x1 - d.x0;
            })
            .attr("height", function (d) {
              return d.y1 - d.y0;
            })
            .attr("fill", function (d) {
              return color(d.parent.data.name);
            })
            .style("stroke", "black")
            .style("opacity", function (d) {
              return opacity(d.data.size);
            });

          cell
            .append("clipPath")
            .attr("id", function (d) {
              return "clip-" + d.data.name.replace(/\s/g, "");
            })
            .append("use")
            .attr("xlink:href", function (d) {
              return "#" + d.data.name.replace(/\s/g, "");
            });

          cell
            .append("text")
            .style("display", function (d) {
              return d.data.size > 4 ? "block" : "none";
            })
            .attr("clip-path", function (d) {
              return "url(#clip-" + d.data.name.replace(/\s/g, "") + ")";
            })
            .selectAll("tspan")
            .data(function (d) {
              return d.data.name.split(/(?=[A-Z][^A-Z])/g);
            })
            .enter()
            .append("tspan")
            .attr("x", 4)
            .attr("y", function (d, i) {
              return 13 + i * 10;
            })
            .text(function (d) {
              return d;
            })
            .style("font-size", "8pt");

          // // and to add the text labels
          cell
            .append("text")
            .attr("x", 4)
            .attr("y", 27)
            .text(function (d) {
              return d.data.size > 10 ? d.data.size : "";
            })
            .attr("font-size", "8pt")
            .attr("fill", "#111");

          cell
            .on("mousemove", function (d) {
              var content = "";
              content += "" + d.parent.data.name.toUpperCase() + "<br>";
              content += "<span>Cause of death: </span>" + d.data.name + "<br>";
              content += "<span>Amount of people: </span>" + d.data.size;

              tooltip
                .style("display", "block")
                .style("left", d3.event.pageX + 10 + "px")
                .style("top", d3.event.pageY + 10 + "px")
                .html(content);
            })
            .on("mouseleave", function (d) {
              tooltip.style("display", "none");
            });

          // Add title for the groups
          svg
            .selectAll("titles")
            .data(
              root.descendants().filter(function (d) {
                return d.depth == 1;
              })
            )
            .enter()
            .append("text")
            .attr("x", function (d) {
              return d.x0;
            })
            .attr("y", function (d) {
              return d.y0 + 21;
            })
            .text(function (d) {
              return d.data.name.charAt(0).toUpperCase() + d.data.name.slice(1);
            })
            .attr("font-size", "9pt");

          svg
            .append("text")
            .attr("x", 0)
            .attr("y", 14)
            .text("Refeguee Deaths Between 2000 and 2016 years")
            .attr("font-size", "28px")
            .attr("fill", "grey");
        }
      );
    },
  },
};
</script>
