<style lang="sass">
.projectPage
	margin-top: 80px

	#vizTitle
		font-size: 28pt
		font-weight: 300
		color: white
		padding-bottom: 35px
		text-align: center

	#visualizationRefugeesInBg
		background-color: #222

		text
			font-family: Roboto, Arial, sans-serif

		.tick
			text
				font-size: 10pt
				fill: #999
			line
				stroke: #999
		.domain
			stroke: #999

		table
			table-layout: fixed
			width: 100%
			margin: 0 auto
			margin-bottom: 50px
			margin-top: 50px
			font-family: 'Open Sans', sans-serif
			font-size: 12pt

		th
			background: #292929
			border: 1px solid #ccc
			text-align: left
			color: #F5F5F5
			font-weight: bold
			padding: 6px

		td, tr
			padding: 6px
			border: 1px solid #ccc
			text-align: left
			color: #F5F5F5
			background: #3d3d3d

		h4
			color: #fff
			font-weight: 300
			font-size: 14pt
			border-bottom: 1px solid #555
			padding: 0 0 15px 0

	#special_cases
		display: block
		float: left
		width: 67%
		margin-left: 15%
		margin-right: 15%
		border-top: 1px solid #ddd
		padding-top: 5px
		font-size: 9pt

		span
			font-weight: 600

		a
			text-decoration: none
			color: #778899
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
    <v-row justify="center" class="pa-0 mb-6" style="background: #222">
      <v-col cols="9" class="pa-0 mt-12">
        <h5 id="vizTitle">
          Refugees in Bulgaria
          <span style="display: block; font-size: 21pt; font-weight: 200"
            >1992 - 2017</span
          >
        </h5>
        <div id="visualizationRefugeesInBg"></div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="pa-0 mb-8">
        <p id="special_cases" v-html="special_cases" />
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
import * as _ from "underscore";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectDescription from "@/components/projects/ProjectDescription";
import ImageWithDescription from "@/components/projects/ImageWithDescription.vue";
import CodingSection from "@/components/projects/CodingSection.vue";
import LinkButtons from "@/components/projects/LinkButtons.vue";

export default {
  name: "RefugeesInBulgaria",
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
        "<p>The European migrant crisis has been a hot topic since its start in 2015, and it has affected the Balkans and the countries surrounding the Mediterranean. In this project I wanted to explore the number of refugees that came to seek better future in Bulgaria. The dataset I used shows refugees and asylum seekers from 98 countries who came to Bulgaria between 1992 and 2017.</p><p>As the project represents data on refugees and asylum seekers and their countries of origin, I wanted to contextualize the data with the geographical region in which each of those countries belong. My decision was to use the Unites Nations classification: <a href='https://www.un.org/depts/DGACM/RegionalGroups.shtml' target='_blank'>United Nations Regional Groups of Member States</a> to cluster the countries in 6 region groups: Asia-Pacific, Eastern European, African, Western European and Others, Latin American and Caribbean, and Other/Not Specified. The 6 groups are color-coded in order to enhance the ability to parse each separate line chart.</p>",
      special_cases:
        "<span>* China, Macao SAR</span> – officially the Macao Special Administrative Region of the People's Republic of China, is a Special Administrative Region, which maintains separate governing and economic systems from that of mainland China (<a href='https://en.wikipedia.org/wiki/Macau' target='_blank'>Wikipedia</a>)<br><span>* Israel</span> - In May 2000 Israel became a WEOG full member, on a temporary basis (subject to renewal), in WEOG's headquarters in the US, thereby enabling it to put forward candidates for election to various UN General Assembly bodies. In 2004 Israel obtained a permanent renewal to its membership (<a href='https://www.un.org/depts/DGACM/RegionalGroups.shtml' target='_blank'>United Nations Regional Groups of Member States</a>)<br><span>* Turkey</span> - Turkey, participates fully in both WEOG and Asian Group, but for electoral purposes is considered a member of WEOG only (<a href='https://www.un.org/depts/DGACM/RegionalGroups.shtml' target='_blank'>United Nations Regional Groups of Member States</a>)<br><span>* Serbia and Kosovo (S/RES/1244 (1999))</span> – as per United Nations Security Council Resolution 1244, the region Kosovo and Metohija is a province of Serbia (<a href='https://en.wikipedia.org/wiki/United_Nations_Security_Council_Resolution_1244' target='_blank'>Wikipedia</a>)<br><span>*  Western Sahara</span> - Western Sahara has been on the United Nations list of Non-Self-Governing Territories since 1963 following the transmission of information on Spanish Sahara by Spain under Article 73 e of the Charter of the United Nations (<a href='https://www.un.org/dppa/decolonization/en/nsgt/western-sahara' target='_blank'>United Nations</a>)<br><span>* State of Palestine</span> – the State of Palestine is a de jure sovereign state in Western Asia claiming the West Bank and Gaza Strip with East Jerusalem as the designated capital, although its administrative center is currently located in Ramallah (<a href='https://en.wikipedia.org/wiki/State_of_Palestine' target='_blank'>Wikipedia</a>)</p>",
      sections: {
        process: {
          dataAnalysis: {
            images: [
              {
                link: "assets/playground/refugeesinbulgaria/ss_bar_value_per_year.png",
                description:
                  "<p> After grouping the countries in regions, I analyzed the data in a Jupyter Notebook using Python 3, Pandas and Matplotlib. In order to find the best way to represent the data, I ran descriptive statistical analysis and explored different visualizations in Matplotlib. </p> <p>I first created a bar chart that showed the number of refugees per year in order to analyze the general trend. The chart confirmed that the numbers peak at 2015 with the onset of the migrant crisis.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/refugeesinbulgaria/grouped_and_stacked_barchart.png",
                description:
                  "<p>Another aspect of the data I wanted to explore was the four types of refugees: asylum-seekers, refugees, returned refugees, and stateless persons. I created a stacked and grouped bar charts, showing the number of refugees by refugee type per year, in order to see any emerging patterns. </p><p> As the data are unevenly distributed and the small nuances are lost, I continued my analysis with the total number of people and not with the separation by type of refugees.</p>",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/refugeesinbulgaria/ss_ref_line.png",
                description:
                  "I then wanted to look at the individual countries of origin and the trends and patterns throughout time. As some countries are experiencing wars and conflicts, the number of refugees and asylum seekers spike drastically. This causes other countries' timelines to be invisible when plotted on the same axis as the outliers.",
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
            link: "assets/playground/refugeesinbulgaria/break-2.png",
            description:
              "<p>This is one of the first projects I implemented in d3.js as I was preparing my application to the Master of Science in Data Visualization program at Parsons School of Design. </p>A great challange was making sure all data are visible, and outliers do not dwarf all other data. During my analysis in Python and Matplotlib, it became evident that this cannot be achieved if all linecharts are using the same axis. I grouped the countries based on the maximum value of refugees and asylum seekers per year and plotted the different groups separately.</p>",
            width: "960px",
            layout: "side",
          },
        ],
        data_analysis: [
          {
            link: "assets/playground/refugeesinbulgaria/break-1.png",
            description:
              "Another challange in visualizing the data were outliers - countries from which only 1 person came to Bulgaria as refugee or asylum seeker. As those cases could not be plotted as a timeline, I showed them at the end of the visualization in a table. This way I could represent them in an equally legible way, and avoid the need to remove them from the dataset.",
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
      return this.siteContent.playground.projects["refugeesInBulgaria"];
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render: function () {
      // set margin, width and height of the graph
      var margin = {
          top: 30,
          right: 20,
          bottom: 55,
          left: 90,
        },
        width = 400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

      // load the data from the csv
      d3.csv("data/playground/refugeesinbulgaria/refugees_clean.csv").then(
        function (data) {
          // group the countries based on max value per year
          var value_groups = function (d) {
            var set = "";
            if (d <= 30) {
              set = "set-1";
            }
            if (d > 30 && d <= 100) {
              set = "set-2";
            }
            if (d > 100 && d <= 300) {
              set = "set-3";
            }
            if (d > 300 && d <= 1000) {
              set = "set-4";
            }
            if (d > 1000 && d <= 3000) {
              set = "set-5";
            }
            if (d > 3000 && d <= 5000) {
              set = "set-6";
            }
            if (d > 5000) {
              set = "set-7";
            }
            return set;
          };

          var region_names = [
            "African Group",
            "Asia-Pacific Group",
            "Eastern European Group",
            "Western European and Others Group (WEOG)",
            "Latin American and Caribbean Group (GRULAC)",
            "Other / Not specified",
          ];

          var color_scale = [
            "#90EE90",
            "#BA55D3",
            "#ff6363",
            "#00BFFF",
            "#FFB6C1",
            "#DAA520",
          ];

          var colors = d3
            .scaleOrdinal()
            .domain(region_names)
            .range(color_scale);

          // convert year in date format, 'value' to int
          var formatTime = d3.timeParse("%Y");

          data.map(function (d) {
            d.year = formatTime(d.year);
            d.value = +d.value;
          });

          // nest the data
          var grouped = d3
            .nest()
            .key(function (d) {
              return d.origin;
            })
            .entries(data);

          var exceptions = [];

          // find the max values
          grouped.forEach(function (d, i) {
            var max = d3.max(d.values, function (c) {
              return c.value;
            });
            d.max = max;
            d.region = d.values[0].region_groups;
            d.set = value_groups(max);

            if (d.values.length == 1) {
              exceptions.push(d);
              d.set = "exception";
            }
          });

          // remove exceptions
          grouped = grouped.filter(function (d) {
            return d.set != "exception";
          });

          // assign each country to the respective set based on max value
          var sets = d3
            .nest()
            .key(function (d) {
              return d.set;
            })
            .entries(grouped);

          function draw(title, data) {
            var container = d3
              .select("#visualizationRefugeesInBg")
              .append("div");

            // add title to each chart
            container.append("h4").text(title);

            // add an svg for each group
            var svg = container
              .selectAll("svg")
              .data(data)
              .enter()
              .append("svg")
              .attr("class", function (d) {
                return (
                  "individualLineChart-" +
                  d.key.replace(/\./g, "").replace("'", "").split(" ").join("_")
                );
              })
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
              );

            // add year and value to each country
            var years = [];
            var values = [];
            data.forEach(function (country) {
              country.values.forEach(function (d) {
                years.push(d.year);
                values.push(d.value);
              });
            });

            // define and append X axis
            var x = d3
              .scaleTime()
              .domain(
                d3.extent(years, function (d) {
                  return d;
                })
              )
              .range([0, width]);

            var xAxis = svg
              .append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).ticks(5));

            // define and append Y axis
            var y = d3
              .scaleLinear()
              .domain([
                0,
                d3.max(values, function (d) {
                  return d;
                }),
              ])
              .range([height, 0]);

            svg.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(4));

            // sort the data
            var sorted = function (data, key) {
              return data.sort(function (a, b) {
                return b[key] - a[key];
              });
            };

            var line = d3
              .line()
              .x(function (d) {
                return x(d.year);
              })
              .y(function (d) {
                return y(+d.value);
              });

            // draw the linechart
            svg
              .append("path")
              .attr("d", function (d) {
                return line(sorted(d.values, "year"));
              })
              .attr("fill", "none")
              .attr("stroke", function (d) {
                return colors(d.region);
              })
              .attr("stroke-width", 1.9);

            // add axis titles
            svg
              .append("text")
              .attr("text-anchor", "end")
              .attr("x", width)
              .attr("y", height + margin.top + 10)
              .attr("font-family", "Open Sans")
              .attr("font-size", "12pt")
              .style("fill", "#999")
              .text("Year");

            svg
              .append("text")
              .attr("text-anchor", "start")
              .attr("transform", "rotate(-90)")
              .attr("y", function () {
                return y.domain()[1] > 1000
                  ? -margin.left + 33
                  : -margin.left + 45;
              })
              .attr("x", function (d) {
                return y.domain()[1] > 1000
                  ? -margin.top - 25
                  : -margin.top - 25;
              })
              .attr("font-family", "Open Sans")
              .attr("font-size", "12pt")
              .style("fill", "#999")
              .text("Refugees");

            // add the country name as title
            svg
              .append("text")
              .attr("text-anchor", "start")
              .attr("font-family", "Open Sans")
              .attr("font-size", "11pt")
              .style("fill", "#fff")
              // .attr('y', 12)
              .attr("y", 10)
              .attr("x", +8)
              .text(function (d) {
                return d.key;
              });

            svg
              .append("text")
              .attr("text-anchor", "start")
              .attr("font-family", "Open Sans")
              .attr("font-size", "10pt")
              .attr("y", -10)
              .attr("x", 8)
              .text(function (d) {
                return d.region;
              })
              .style("fill", function (d) {
                return colors(d.region);
              });
          }

          draw("More than 5,000 refugees", sets[0].values);
          draw("Between 1,000 and 3,000 refugees", sets[5].values);
          draw("Between 300 and 1,000 refugees", sets[3].values);
          draw("Between 100 and 300 refugees", sets[2].values);
          draw("Between 30 and 100 refugees", sets[4].values);
          draw("Up to 30 refugees", sets[1].values);

          // create a table for the one-time cases
          var table = d3.select("#visualizationRefugeesInBg").append("table");
          var titles = ["Country", "Refugees", "Region", "Year"];

          var headers = table
            .append("thead")
            .append("tr")
            .selectAll("th")
            .data(titles)
            .enter()
            .append("th")
            .text(function (d) {
              return d;
            });

          exceptions.forEach(function (country) {
            var year = country.values[0].year;
            var new_date = year.getFullYear();
            var row_data = [country.key, country.max, country.region, new_date];

            var rows = table
              .append("tr")
              .selectAll("td")
              .data(row_data)
              .enter()
              .append("td")
              .text(function (d) {
                return d;
              });
          });
        }
      );
    },
  },
};
</script>
