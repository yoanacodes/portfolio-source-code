<style lang="sass">
.projectPage
	margin-top: 80px

	#visualizationClinicalTrials
		background-color: #eef1f3
		width: 100%
		padding: 25px 0 50px 0

		svg
			display: block
			margin: auto
			max-width: 72%

		.dot:hover
			stroke: #fff
			stroke-width: 1.5px
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
    <v-row justify="center" class="pa-0 mb-12" style="background: #eef1f3">
      <v-col cols="9" class="pa-0 mb-12">
        <h3 class="text-center mt-6">
          <span style="color: #996896">Alzheimer</span>
          <span style="color: #555"> Clinical Trials.</span>
          <span
            class="font-weight-light"
            style="font-size: 16pt; display: block"
            >The History of 2,207 Clinical Trials between 1981 and today.</span
          >
        </h3>
        <div id="visualizationClinicalTrials"></div>
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
  name: "AlzheimerClinicalTrials",
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
        "<p>After I started working in a clinical trials company and collecting data from patients, doctors, nurses and research directors, I started questioning how can we visualize clincal trials data and make them more accessible to patients, doctors, and researchers. One of the things I was hoping to accomplish as I started learning programming was to be able to visualize the complexity of these types of data as well as healthcare in general.</p><p>This project explores 2,207 clinical trials for Alzheimer's disease between 1981 and 2019. It provides data for the studies unique NCT Number, Title, Status, Study Type, Start and End dates, as well as information about the amount of patients enrolled. The visualization clusters all studies based on the age group of the enrolled patients.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/playground/alzheimerclinicaltrials/tooltip.png",
                description:
                  "Although the visualization quickly gives a general overview of the disproportionately distributed clinical trials, it is hard to draw any conclusions based on just that. To enhance usability, I implemented a detailed tooltip, which provides detailed information about each study. This allows more details to be visible with minimal interaction.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/playground/alzheimerclinicaltrials/ss_creating_age_groups.png",
                description:
                  "Before starting to analyze the dataset, I had to clean and group the data by the age of the participants in each clinical trial. I made a separate column in the Pandas data frame to keep the integrity of the original data, while converting it in a more useful format.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/alzheimerclinicaltrials/ss_enrollment_per_group.png",
                description:
                  "After preparing the data for further exploration in Python, Pandas, and Matplotlib, I started plotting different aspects of it. First, I wanted to explore the distribution of enrolled patients per age group. This, however, did not provide much knowledge on why there are such differences in the ages of patients.",
                width: "660px",
                layout: "side",
              },
              {
                link: "assets/playground/alzheimerclinicaltrials/interventional_vs_observational.png",
                description:
                  "<p>I then explored the split between Interventional vs Observational studies. I visualized them as two separate pie charts, showing the percentage of all studies and the percentage of all enrolled study subjects respectively. </p><p> Although more than 80% of the Clinical Trials are Interventional, the enrollment in them is 21%. This is caused by the limitations of Interventional studies, in which the inclusion and exclusion criteria are far more specific than in Observational studies and the recruitment protocol much more complex.</p><p> Further, Interventional Clinical Trials in general are completed in shorter periods of time because they usually involve the testing of a new drug or equipment, while Observational studies follow the long term effects of already available interventions or the disease itself. </p>",
                width: "560px",
                layout: "side",
              },
              {
                link: "assets/playground/alzheimerclinicaltrials/ss_grouped_bar_status_and_study_type.png",
                description:
                  " In another aspect of the dataset, I explored the possibility of visualizing the data as a grouped bar chart, showing the study status on the x axis, the total enrollment on the y axis, and the study type as the group. This clearly showed that more patients complete the Interventional studies than the Observational ones. This is a known phenomena in the industry and is often caused by the length of Observational studies, and the 'lost-to-follow-up' rate, i.e. patients stop responding to follow ups.",
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
            link: "assets/playground/alzheimerclinicaltrials/break-1.png",
            description:
              "<p>One of the hardest things about the project was cleaning and analyzing the data. The dataset was very unstructured, so multiple steps were required to clean the language and remove or mutate the columns. In order to group the data by the age group of recruited participants, I had to heavily manipulate the original strings to extract the actual numeric values.</p><p>In addition, working with so many rows was a prime example of a dataset which Excel falls short with – one could hardly learn much from it without the power of Python and Pandas or programming in general.</p><p>This project was very gratifying and it made me that much more committed to learning programming and helped me validate the immense power of engineering and data analytics.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_visualization: [
          {
            link: "assets/playground/alzheimerclinicaltrials/break-2.png",
            description:
              "<p>The main challenge for this project was trying to create a visualization that would best cluster the data. Although the circle packing does show all studies grouped by the age of the participants, I think this is not the best way to represent such complex data. It is hard to parse and draw any conclusions based on the clusters, and exploring in detail can be a tedious task due to the amount of data points.</p><p>I am looking forward to having some time to explore further design and engineering techniques that may be more flexible and user friendly.</p>",
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
      return this.siteContent.playground.projects["alzheimerClinicalTrials"];
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    // render the visualization
    render: function () {
      d3.json("data/playground/alzheimerclinicaltrials/alzheimer.json").then(
        function (data) {
          var margin = {
              top: 10,
              right: 10,
              bottom: 10,
              left: 20,
            },
            width = 1140,
            height = 1140,
            viewBoxWidth = width + margin.left + margin.right,
            viewBoxHeight = height + margin.top + margin.bottom;

          var color = d3
            .scaleLinear()
            .domain([0, 1.5])
            .range(["hsl(192.2, 100%, 89.4%)", "hsl(191.9,100%,31.6%)"])
            .interpolate(d3.interpolateHcl);

          var format = d3.format(",d");

          var pack = d3.pack().size([width, height]).padding(3);

          var root = d3
            .hierarchy(data)
            .sum((d) => +d["enrollment"])
            .sort((a, b) => {
              return b.value - a.value;
            });

          var focus = root,
            nodes = pack(root),
            view;

          var tooltip = d3
            .select("#vizTooltip")
            .attr("class", "darkTooltip")
            .style("z-index", 1000);

          var show_tooltip = function (d) {
            var content = "";

            if (d.depth == 4) {
              content = "";
            } else {
              content = "";
              content += "<span>Title: </span>" + d.data["title"];
              content += "<span>Study type: </span>" + d.data["study_type"];
              content += "<span>Enrollment: </span>" + d.data["enrollment"];
              content += "<span>Subjects' age: </span>" + d.data["clean_age"];
              content += "<span>Status: </span>" + d.data["status"];
              content += "<span>NCT number: </span>" + d.data["nct_number"];
            }

            tooltip
              .style("display", function () {
                if (d.depth == 3) {
                  return "block";
                } else {
                  return "none";
                }
              })
              .style("opacity", 1);

            tooltip
              .style("left", d3.event.pageX + 30 + "px")
              .style("top", d3.event.pageY + -20 + "px")
              .html(content);
          };

          var hide_tooltip = function (d) {
            tooltip.style("display", "none");
          };

          var svg = d3
            .select("#visualizationClinicalTrials")
            .append("svg")
            .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
            .attr("transform", "translate(" + margin.left + "," + 0 + ")")
            .append("g")
            .attr(
              "transform",
              "translate(" + width / 2 + "," + height / 2 + ")"
            )
            .style("cursor", "pointer")
            .on("click", () => zoom(root));

          var node = svg
            .append("g")
            .attr("transform", "translate(0, 30)")
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
            .attr("class", "dot")
            .attr("fill", function (d) {
              if (d.depth == 1) {
                return "#dab6d4";
              } else if (d.depth == 2) {
                return "#6c447c";
              } else if (d.depth == 3) {
                return "#996896";
              }
            });

          node
            .on("mousemove", function (d) {
              return show_tooltip(d);
            })
            .on("mouseout", hide_tooltip)
            .on("click", function (d) {
              focus != d && (zoom(d), d3.event.stopPropagation());
            });

          var label = svg
            .append("g")
            .attr("transform", "translate(0, 30)")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .style("fill-opacity", function (d) {
              return d.parent === root ? 1 : 0;
            })
            .style("display", function (d) {
              return d.parent === root ? "inline" : "none";
            })
            .style("fill", function (d) {
              if (d.depth == 1) {
                return "#fff";
              } else if (d.depth == 2) {
                return "#fff";
              } else if (d.depth == 3) {
                return "#999";
              }
            })
            .style("font-size", (d) => {
              return d.depth === 1 || d.depth === 2 ? "18pt" : "12pt";
            })
            .style("font-weight", (d) => {
              return d.depth === 1 || d.depth === 2 ? "800" : "555";
            })
            .text(function (d) {
              return d.data.name;
            });

          zoomTo([root.x, root.y, root.r * 2]);

          function zoomTo(v) {
            svg.attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight);

            var k = width / v[2];
            view = v;

            label.attr(
              "transform",
              (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
            );
            node.attr(
              "transform",
              (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
            );
            node.attr("r", (d) => d.r * k);
          }

          function zoom(d) {
            if (d.depth > 1) return;

            var focus0 = focus;
            focus = d;

            var transition = svg
              .transition()
              .duration(d3.event.altKey ? 7500 : 750)
              .tween("zoom", function (d) {
                var i = d3.interpolateZoom(view, [
                  focus.x,
                  focus.y,
                  focus.r * 2,
                ]);
                return (t) => zoomTo(i(t));
              });

            label
              .filter(function (d) {
                return d.parent === focus || this.style.display === "inline";
              })
              .transition(transition)
              .duration(500)
              .style("fill-opacity", function (d) {
                d.parent === focus ? 1 : 0;
              })
              .on("start", function (d) {
                if (d.parent === focus) this.style.display = "inline";
              })
              .on("end", function (d) {
                if (d.parent !== focus) this.style.display = "none";
              });
          }
        }
      );
    },
  },
};
</script>
