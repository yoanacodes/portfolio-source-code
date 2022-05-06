<style lang="sass">
.projectPage
	margin-top: 80px

	#visualizationDiseases
		background-color: transparent

		#dropdown
			margin: 0 0 30px 45px
			padding: 10px

			#selecter
				font-family: 'Open Sans', sans-serif
				font-size: 12pt
				border: 1px solid #555
				border-radius: 5px
				padding: 3px
				appearance: listbox

			span
				font-family: 'Open Sans', sans-serif
				float: left
				display: block
				margin: 2px 10px 0 0

		svg
			display: block
			margin: auto
			max-width: 92%

		.bars:hover
			stroke: #696969
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
    <v-row justify="center" class="pa-0 mb-12">
      <v-col cols="9" class="pa-0 mb-12" style="background: #fff">
        <div id="visualizationDiseases">
          <div id="dropdown">
            <span>Select Country: </span>
          </div>
        </div>
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
  name: "DiseasesInEurope",
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
        "<p>After working in the clinical trials industry, I became very interested in healthcare. I wanted to explore data on different diseases and how they affect countries. The dataset I used for the visualization represents information about 15 diseases in 30 European countries, as well as the European Union as a whole, and percentage of males, females and total people affected.</p><p>The visualization allows exploration of the prevalence of different diseases in European countries. As it shows data for females, males, and total number of people suffering from the disease, it allows comparison on a granular level between the sexes. Different countries can be explored by selecting them from the dropdown menu above the visualization.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/playground/diseasesineurope/colors_and_tooltip.png",
                description:
                  "<p>When I analyzed the data, I was looking for what is the best way to highlight the differences between different diseases, as well as highlught the distribution between females and males. I further wanted to allow the ability to explore any country of interest from the dataset.</p><p>I used colors to differentiate between the sexes and totals, which enables visual comparison, and added a tooltip that provides the exact percentage associated with the selection.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/diseasesineurope/dropdown.png",
                description:
                  "I decided to use a dropdown, for selecting a country of interest, due to the great amount of possible options (30 countries including the European Union as a whole).",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/playground/diseasesineurope/ss_hbar_eu.png",
                description:
                  "One of the first visualizations I explored was a bar graph showing how each condition affects the total population of people in the European Union only. While this is very interesting it was not what I wanted to show as my goal was to allow comparisons on a more granular level.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/diseasesineurope/ss_arthrosis_map.png",
                description:
                  "<p>I also explored the possibility of presenting the data on a map. On this image I have selected a subset of one condition only - arthrosis - and I am showing its distribution in Europe.</p><p> Although I found this representation of the data useful, it was only possible to represent a single metric at ta time (either totals or females or males) and valuable comparisons were omitted.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/diseasesineurope/ss_bulgaria_by_sex.png",
                description:
                  "Finally, I decided to visualize the data as a grouped bar chart taking Bulgaria as an example. This allows to show any differences, influenced by the sex of the population, clearly showing that some conditions are more prevalent in females while others in males.",
                width: "660px",
                layout: "side",
              },
            ],
          },
        }, //process
      }, // sections
      codeChallanges: {
        data_visualization: [
          {
            link: "assets/playground/diseasesineurope/break-1.png",
            description:
              "<p>This is one of the first projects I implemented in d3.js as I was preparing my application to the Master of Science in Data Visualization program at Parsons School of Design.</p><p> It was a very humbling experience trying to implement a grouped bar chart. My belief was that this is an easy, basic type of chart, however, the intricacy of positioning the bars turned out to be pretty complex. I could not make it perfect this time but later on learned how to relate the groups to each other and center them perfectly.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_analysis: [
          {
            link: "assets/playground/diseasesineurope/break-2.png",
            description:
              "During the data analysis phase in Python, Pandas and Matplotlib, I created multiple visualizations exploring the dataset. This visualization shows the total population affected by each disease in each country. Although it could be useful to an extent, if one could zoom in it, this graph thaught me that there is that much information one can try to visualize at the same time.",
            width: "640px",
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
      return this.siteContent.playground.projects["diseasesInEurope"];
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render: function () {
      var margin = {
          top: 10,
          right: 30,
          bottom: 150,
          left: 50,
        },
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        viewBoxWidth = width + margin.left + margin.right,
        viewBoxHeight = height + margin.top + margin.bottom;

      d3.json("data/playground/diseasesineurope/euro_diseases.json").then(
        function (data) {
          var countries = [];

          data.forEach(function (d) {
            countries.push(d.country);
          });

          // add the dropdown menu
          var dropdown = d3
            .select("#dropdown")
            .append("select")
            .attr("id", "selecter")
            .on("change", function (d) {
              var selected = document.getElementById("selecter");
              var selectedValue = selected.value;

              data.forEach(function (d) {
                if (d.country === selectedValue) {
                  drawbars(d.diseases);
                }
              });
            });

          dropdown
            .selectAll("option")
            .data(countries)
            .enter()
            .append("option")
            .attr("value", function (d) {
              return d;
            })
            .text(function (d) {
              return d;
            });

          // draw the default bars
          var selected = document.getElementById("selecter");
          selected.value = "European Union - 28 countries";
          drawbars(data[8].diseases);

          function drawbars(set) {
            var conditions = [];

            set.forEach(function (d) {
              conditions.push(d.disease);
            });

            d3.select("#visualizationDiseases svg").remove();

            // append SVG
            var svg = d3
              .select("#visualizationDiseases")
              .append("svg")
              .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
              .append("g")
              .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
              );

            // disease
            var x0 = d3.scaleBand().domain(conditions).range([0, width]);

            //sex
            var x1 = d3
              .scaleBand()
              .domain(["Total", "Males", "Females"])
              .range([0, x0.bandwidth() - 10]);

            svg
              .append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x0).ticks(0))
              .selectAll("text")
              .style("font-size", "10pt")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-45)");

            //value
            var y = d3.scaleLinear().domain([0, 50]).range([height, 0]);

            svg
              .append("g")
              .attr("class", "y-axis")
              .call(d3.axisLeft(y).ticks(6))
              .call((g) => g.selectAll(".tick text").text((d) => d + "%"));

            var colors = d3
              .scaleOrdinal()
              .domain(["Total", "Males", "Females"])
              .range(["#c7acff", "#ace5ff", "#ffacbb"]);

            var hover_colors = d3
              .scaleOrdinal()
              .domain(["Total", "Males", "Females"])
              .range(["#9f71ff", "#5dcdff", "#ff718b"]);

            var groups = svg
              .selectAll("disease")
              .data(set)
              .enter()
              .append("g")
              .attr("class", "disease")
              .attr("transform", function (d) {
                return "translate(" + x0(d.disease) + ",0)";
              });

            groups
              .selectAll("rect")
              .data(function (d) {
                return d.breakdown;
              })
              .enter()
              .append("rect")
              .attr("class", "bars")
              .attr("width", x1.bandwidth())
              .attr("height", function (d) {
                return height - y(0);
              })
              .attr("x", function (d) {
                return x1(d.gender);
              })
              .attr("y", function (d) {
                return y(0);
              })
              .attr("fill", function (d) {
                return colors(d.gender);
              })
              .on("mousemove", function (d) {
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr("fill", function (d) {
                    return hover_colors(d.gender);
                  });
              })
              .on("mouseleave", function (d) {
                d3.select(this)
                  .transition()
                  .duration(300)
                  .attr("fill", function (d) {
                    return colors(d.gender);
                  });
              });

            groups
              .selectAll("rect")
              .transition()
              .delay(function (d) {
                return Math.random() * 1000;
              })
              .duration(1000)
              .attr("y", function (d) {
                return y(d.value);
              })
              .attr("height", function (d) {
                return height - y(d.value);
              });

            var tooltip = d3.select("#vizTooltip").attr("class", "darkTooltip");

            var show_tooltip = function (d) {
              var content = "<span>" + d.gender + ": </span>" + d.value + "%";

              tooltip
                .style("display", "block")
                .style("opacity", 0.5)
                .transition()
                .duration(500)
                .style("opacity", 1);

              tooltip
                .style("left", d3.event.pageX + 10 + "px")
                .style("top", d3.event.pageY + 10 + "px")
                .style("display", "block")
                .html(content);
            };

            var hide_tooltip = function (d) {
              tooltip.style("display", "none");
            };

            // add the tooltip to the visualization
            groups
              .selectAll("rect")
              .on("mouseover", show_tooltip)
              .on("mouseout", hide_tooltip);
          }
        }
      );
    },
  },
};
</script>
