<style lang="sass"></style>

<template>
  <v-row align="center" justify="center">
    <v-col
      cols="12"
      class="ma-0 pb-0"
      style="position: absolute; text-align: center"
    >
    </v-col>
    <v-col cols="12" class="pa-0 ma-0">
      <div id="viz"></div>
    </v-col>
  </v-row>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Barchart",
  data: () => ({
    dataset: [],
    width: 960,
    yLimit: 120,
    margin: { top: 40, right: 0, bottom: 0, left: 0 },
    svg: Object,
  }),
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 300;
        case "sm":
          return 150;
        case "md":
          return 150;
        case "lg":
          return 70;
        case "xl":
          return 100;
        default:
          return 100;
      }
    },
    svgHeight() {
      return this.height + this.margin.top + this.margin.bottom;
    },
    yScale() {
      const yScale = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, this.yLimit]);
      return yScale;
    },
  },
  mounted() {
    this.createData();
    this.render();
    this.transitionBarChart();
  },
  watch: {
    "$vuetify.breakpoint.name": function (to, from) {
      d3.select("svg").remove();
      this.render();
    },
  },
  methods: {
    //***************  DRAW BAR CHART  ***************//
    render: function () {
      let dataset = this.dataset;
      let width = this.width;
      let height = this.svgHeight;

      this.svg = d3
        .select("#viz")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .classed("svg-content", true)
        .style("background", "#2c3333")
        .append("g")
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );

      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(d3.range(dataset.length))
        .paddingInner(0.05);

      const randomColor = () => {
        let limit = Math.floor(Math.random() * (190 - 110 + 1) + 200);
        return `hsla(${~~limit},80%,70%,1)`;
      };

      // create axes
      this.svg
        .append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")");

      this.svg.append("g").attr("class", "yAxis");

      // append rectangles
      let bars = this.svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xScale(i))
        .attr("y", height)
        .transition()
        .duration(400)
        .delay(function (d, i) {
          return i * 6;
        })
        .attr("y", (d) => this.yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - this.yScale(d))
        .attr("fill", () => randomColor())
        .style("opacity", 1);
    },

    //***************  ANIMATE BARS  ***************//
    updateBars: function () {
      // Update all rects
      let yScale = this.yScale;

      this.svg
        .selectAll("rect")
        .data(this.dataset)
        .transition()
        .duration(1500)
        .attr("y", (d) => {
          return this.height - yScale(d);
        })
        .attr("height", function (d) {
          return yScale(d);
        });
    },

    //***************  CREATE AND UPDATE DATASET  ***************//
    createData: function () {
      let tempArray = [];
      for (let i = 0; i < 150; i++) {
        let newNumber = Math.floor(Math.random() * (this.yLimit - 10)) + 1;
        tempArray.push(Math.abs(newNumber));
      }
      this.dataset = tempArray;
    },
    // perform the transition animation
    transitionBarChart: function () {
      setInterval(() => {
        this.createData();
        this.updateBars();
      }, 1500);
    },
  },
};
</script>
