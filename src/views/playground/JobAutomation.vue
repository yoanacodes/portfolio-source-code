<style lang="sass">
.projectPage
	margin-top: 80px

	#visualizationJobs
		background-color: #222
		.dot
			stroke-width: 1px
			stroke: #fff
			opacity: 0.7

			&:hover
				opacity: 1
		.tick
			text
				font-size: 10pt
				fill: #fff
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
    <v-row justify="center" class="pa-0 mb-12" style="background: #222">
      <v-col cols="9" class="pa-0 mb-12">
        <div id="visualizationJobs"></div>
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
  name: "JobAutomation",
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
        "<p>The data for the visualization comes from the paper <a class='font-italic' href='https://www.oxfordmartin.ox.ac.uk/downloads/academic/The_Future_of_Employment.pdf' target='_blank'>The Future Of Employment: How Susceptible Are Jobs To Computerisation?</a> containing 702 job occupations and their probability of computerization. The jobs are separated into 3 groups, based on the probability of automation: low risk (0 to 0.3), medium risk (0.3 to 0.7) and high risk (0.7 to 1) occupations. </p><p>As I studied Economics and Accounting in undergrad, the topic of job security and automation has been of interest to me for a long time. Now that I have started learning to program and I am taking classes such as Machine Learning, I have become that much more intrigued by the pace of development of artificial intelligence and the progress of science that are rapidly changing our lives. </p><p> I augmented the above dataset with another one from <a class='font-italic' href='https://www.bls.gov/oes/current/oes_nat.htm' target='_blank'>Occupational Employment Statistics of the Bureau of Labor Statistics</a> so I can represent the economical effect of automation. The data become far more powerful when contextualized with their effect on the population.</p>",
      sections: {
        process: {
          design: {
            images: [
              {
                link: "assets/playground/job_automation/hero.png",
                description:
                  "<p>When I analyzed the data, I was looking for what the story is and how to best highlight the risk of automation. Initially, I wanted to focus on just the high risk occupations but quickly discovered that important comparisons are being lost. </p><p>I settled on a scatter plot so I can visualize 3 dimensions and correlations – Mean Salary (y), Probability of automation (x), and bubble size reflecting the number of people affected.</p> ",
                width: "1040px",
                layout: "side",
              },
              {
                link: "assets/playground/job_automation/colors.png",
                description:
                  "The color coding intuitively landed on the traffic lights system of green, yellow, and red. While not universally recognized, it is only used to enhance the ability to parse and not critical for interpretation of the data.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/job_automation/tooltip.png",
                description:
                  "The tooltip exposes the data associated with each bubble - the occupation, probability of automation, the annual salary for the position and the total number of employees affected.",
                width: "960px",
                layout: "side",
              },
            ],
          },
          dataAnalysis: {
            images: [
              {
                link: "assets/playground/job_automation/ss_pie_all_risks.png",
                description:
                  "I analyzed both datasets in a Jupyter Notebook using Python 3, Pandas and Matplotlib. I first filtered the data from the Bureau of Labor Statistics down to only the Job SOC (Standard Occupational Classification) code and the Annual Mean Salary for the United States on a national level. I used the SOC code as an index in order to merge the two datasets which resulted in the final data frame containing the probability of computerization, annual mean salary, and employees per state for each of the 702 occupations. I then started exploring the data in Python and first looked at how many jobs are in each group.",
                width: "460px",
                layout: "side",
              },
              {
                link: "assets/playground/job_automation/histograms.png",
                description:
                  "I then looked at the distributions and created histograms. The one on the left shows the distribution of the probabilities for all jobs, while the one on the right shows just jobs with high probability of automation – it contains 46.1% (almost half) of all jobs.",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/job_automation/ss_scatter_high_risk.png",
                description:
                  "I initially focused on the biggest group of occupations – the high risk ones. The scatter plot shows all occupations with a probability of computerization between 0.7 and 1 (the y axis), the annual mean salary on national level (on the x axis), and the total amount of employees (the size of the bubbles).",
                width: "960px",
                layout: "side",
              },
              {
                link: "assets/playground/job_automation/ss_scatter_all_risks.png",
                description:
                  "Although the high risk group can easily be classified as the most interesting one due to the expected impact of the automation, the scatter plot containing only those occupations did not seem to provide good visual representation of the problem's magnitude. To show this, I plotted a scatter plot, representing all job positions. This required some changes in the way the data is presented within the plot – the x axis now shows the probability of automation; the y axis shows the annual median salary, the size of the bubbles represents the total amount of employees, and the colors show the 3 risk groups: green for the lowest risk, yellow for the medium risk, and red for the high risk positions.",
                width: "660px",
                layout: "side",
              },
              {
                link: "assets/playground/job_automation/ss_lollipop_high_risk.png",
                description:
                  "<p>From the scatter plot one can see that not only the majority of positions are in the medium to high risk groups but also the size of the bubble show that the number of employees in these groups is significantly higher than the low automation group. This doubles the impact that computerization would have on these populations. </p><p>I also created a lollipop chart for the number of employees affected by automation in the high risk group and later decided to add that information in a tooltip in the D3 visualization as I found the correlation very interesting.</p>",
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
            link: "assets/playground/job_automation/break-1.png",
            description:
              "This is one of the first projects I implemented in d3.js as I was preparing my application to the Master of Science in Data Visualization program at Parsons School of Design. It was rather challenging, to say the least, but I felt like I gained an appreciation for some of the logic of d3.js and how to apply it.",
            width: "960px",
            layout: "side",
          },
        ],
        data_analysis: [
          {
            link: "assets/playground/job_automation/break-2.png",
            description:
              "Similarly as with the data viz aspects, I was beginning to exercise more heavily my Python skills and trying to learn how to analyze and transform data in pandas and matplotlib. Not all results were useful but by the end of the process I felt I arrived at a useful analysis. ",
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
      return this.siteContent.playground.projects["jobAutomation"];
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render: function () {
      var margin = {
          top: 60,
          right: 20,
          bottom: 70,
          left: 80,
        },
        width = 990 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom,
        viewBoxWidth = width + margin.left + margin.right,
        viewBoxHeight = height + margin.top + margin.bottom;

      var svg = d3
        .select("#visualizationJobs")
        .append("svg")
        .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", -10)
        .style("fill", "#fff")
        .style("font-size", "18pt")
        .text("Probability of Job Automation and Number of Affected Workers");

      // Add axis titles
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top - 20)
        .attr("fill", "#fff")
        .style("font-size", "10pt")
        .text("Probability of automation");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10)
        .attr("x", 0)
        .attr("fill", "#fff")
        .style("font-size", "10pt")
        .text("Mean salary, USA");

      // append clip paths for the bubbles
      svg
        .append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

      // load the data from the csv file
      d3.csv("data/playground/job_automation/clean_salary_and_jobs.csv").then(
        function (data) {
          data = data.sort(function (a, b) {
            return b.sum_people - a.sum_people;
          });

          // define and append X axis
          var x = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(data, function (d) {
                return d.probability;
              }),
            ])
            .range([0, width]);

          svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .call((g) => g.selectAll(".domain").attr("stroke", "#fff"))
            .call((g) => g.selectAll(".tick line").attr("stroke", "#fff"))
            .call((g) => g.selectAll(".tick text").attr("fill", "#fff"));

          // define and append Y axis
          var y = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(data, function (d) {
                return +d.annual_mean;
              }),
            ])
            .range([height, 0]);

          svg
            .append("g")
            .call(d3.axisLeft(y))
            .call((g) => g.selectAll(".domain").attr("stroke", "#fff"))
            .call((g) => g.selectAll(".tick line").attr("stroke", "#fff"))
            .call((g) => g.selectAll(".tick text").attr("fill", "#fff"));

          // define bubble size scale
          var bubbleSize = d3
            .scaleLinear()
            .domain([
              d3.min(data, function (d) {
                return d.sum_people;
              }),
              d3.max(data, function (d) {
                return d.sum_people;
              }),
            ])
            .range([1, 2.5]);

          // define colors for the 3 risk groups
          var colors = d3
            .scaleOrdinal()
            .domain(["High Risk", "Medium Risk", "Low Risk"])
            .range(["#ff5350", "#ffd700", "#9acd32"]);

          // graph the data on the scatter plot
          var bubbles = svg
            .append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) {
              return x(d.probability);
            })
            .attr("cy", function (d) {
              return y(d.annual_mean);
            })
            .attr("r", function (d) {
              return 0;
            })
            .attr("fill", function (d) {
              return colors(d.risk_groups);
            })
            .attr("stroke", "#fff");

          svg
            .selectAll("circle")
            .transition()
            .delay(function (d) {
              return Math.random() * 1000;
            })
            .duration(1000)
            .attr("r", function (d) {
              return bubbleSize(d.sum_people);
            });

          bubbles.attr("clip-path", "url(#clip)");

          // select tooltip
          var tooltip = d3.select("#vizTooltip").attr("class", "darkTooltip");
          var format_comma = d3.format(",");

          // add the tooltip to the visualization
          bubbles
            .on("mouseover", (d) => {
              var content = "";

              if (d.annual_mean > 0) {
                content +=
                  "<span>Occupation: </span>" + d.occupation + "<br><br>";
                content +=
                  "<span>Probability: </span>" + d.probability + "<br><br>";
                content +=
                  "<span>Annual Salary: </span>" +
                  "$" +
                  format_comma(d.annual_mean) +
                  "<br><br>";
                content +=
                  "<span>Total number of employees: </span>" +
                  format_comma(d.sum_people);
              } else {
                content +=
                  "<span>Occupation: </span>" + d.occupation + "<br><br>";
                content +=
                  "<span>Probability: </span>" + d.probability + "<br><br>";
                content += "<span>Annual Salary: </span>" + "No available data";
                content +=
                  "<span>Total number of employees: </span>" +
                  format_comma(d.sum_people);
              }

              tooltip
                .style("display", "block")
                .style("opacity", 0.5)
                .transition()
                .duration(500)
                .style("opacity", 1);

              tooltip
                .style("left", d3.event.pageX + 30 + "px")
                .style("top", d3.event.pageY + "px")
                .style("display", "block")
                .html(content);
            })
            .on("mouseout", () => {
              tooltip.style("display", "none");
            });
        }
      );
    },
  },
};
</script>
