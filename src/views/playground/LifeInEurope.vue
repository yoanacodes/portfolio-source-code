<style lang="sass">
	.projectPage
		margin-top: 80px

		#visualizationLifeInEurope
			svg
				display: block
				min-width: 50%

			ul 
				float: left
				margin-bottom: 20px
				list-style-type: none

			ul li 
				font-family: 'Open Sans', sans-serif
				float: left
				padding: 5px
				border: 1px solid #111
				background-color: #f8f8ff
				border-radius: 3px
				margin: 0 3px 3px 0
				cursor: pointer

			.clicked 
				color: #f8f8ff
				font-weight: 600
				background-color: #222

			ul li:hover 
				opacity: 0.5
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
					:links="project.links"/>
			</v-col>
		</v-row>
		<!-- live viz -->
		<v-row justify="center" class="pa-0 mb-12">
			<v-col cols="9" class="pa-0 mb-12">
				<div id="visualizationLifeInEurope">
					<ul>
						<li data-set='avg_hrs_worked'>Average hours worked</li>
						<li data-set='median_income'>Income (EUR)</li>
						<li data-set='life_expect'>Life Expectancy (Years)</li>
						<li data-set='prct_job_satis_high'>Job Satisfaction (%)</li>
						<li data-set='prct_life_satis_high'>Life Satisfaction (%)</li>
					</ul>
				</div>
			</v-col>
		</v-row>

		<v-row justify="center" class="pa-0 mb-12" style="background: #f1f1f1">
			<v-col cols="10" class="pa-0 mb-12">
				<ProjectDescription :description="description"/>
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
				<template v-for="(image, index) in sections.process.dataAnalysis.images">
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
				<CodingSection :codeView="codeChallanges"/>
			</v-col>
		</v-row>	

		<v-row no-gutters justify="center">
			<v-col cols="10" class="mb-10">
				<h2 class="majorSection">LINKS TO PROJECT</h2>
				<LinkButtons :links="project.links"/>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';
import * as $ from 'jquery';
import ProjectMeta from '@/components/ProjectMeta';
import ProjectDescription from '@/components/projects/ProjectDescription';
import ImageWithDescription from '@/components/projects/ImageWithDescription.vue';
import CodingSection from '@/components/projects/CodingSection.vue';
import LinkButtons from '@/components/projects/LinkButtons.vue';

export default {
	name: 'LifeInEurope',
	components: {
		ProjectMeta,
		ProjectDescription,
		ImageWithDescription,
		CodingSection,
		LinkButtons
	},
	data () {
		return {
			description: "<p>This project visualizes trends in average hours worked, income, life expectancy, job satisfaction, and life satisfaction in Europe. The data are from Euro Stats, an official provider of statistical information to the institutions of the European Union</p><p>With this project I am trying to understand what patterns, if any, exist between income and working hours and life expectancy and satisfaction. As I studied Economics and Accounting in undergrad, I am deeply interested the question how do certain economic metrics can affect people's lives.</p>",
			sections: {
				process: {
					design: {
						images: [
						
							{
								link: "assets/playground/lifeineurope/diverging scale.png",
								description: "When visualizing the five indicators I used for the project, I had to decide if I would use one color scale for all of them or alternate between different scales, while making sure changing the context did not interfere with the analytical experience of users. I decided to use a green and red sequential schemes, and a diverging red-yellow-green scale to indicate different measures, based on whether high values were considered good or bad.",
								width: "960px",
								layout: "side"
							},
							{
								link: "assets/playground/lifeineurope/tooltip.png",
								description: "In order to enhance comparison, especially between countries with similar values, I implemented a tooltip. It shows the exact value for the selected indicator for the country users hover over.",
								width: "960px",
								layout: "side"
							}
						]	
					},
					dataAnalysis: {
						images: [
							{
								link: "assets/playground/lifeineurope/exploratory_bars.png",
								description: "The first step after getting to know the dataset in Python and Pandas was to select the data I wanted to work with. The original dataset contains 36 different indicators for 32 European countries. <p>I explored all indicators through several bar charts in Matplotlib, which allowed me to see some trends and possible correlations.</p>",
								width: "960px",
								layout: "side"
							},
							{
								link: "assets/playground/lifeineurope/life_satisfaction_and_expectancy.png",
								description: "Due to the geographic nature of the data I also plotted several indicators using GeoPandas to explore visually the distribution between countries. This helped me a lot in deciding which measures are most suitable for my project. Here are two of those maps representing life expectancy and life satisfaction.",
								width: "960px",
								layout: "side"
							},
							{
								link: "assets/playground/lifeineurope/hours_worked_and_median_income.png",
								description: "For example, one interesting pattern I noticed while exploring the data, was that countries with higher average hours worked had also smaller median income. In addition, they also had lower life expectancy and satisfaction.",
								width: "960px",
								layout: "side"
							},
						]
					},										
				}, //process									
			}, // sections
			codeChallanges: {
				data_visualization: [{
					link: "assets/playground/lifeineurope/dataset_columns.png",
					description: "<p>One of the biggest challanges for this project was mainly deciding how many and which indicators to visualize, as the dataset contains 36 different indicators. </p><p>Visualizing that many measures, most of which unrelated to each other, would have made it very hard to explore and see any patterns and correlations. The data analysis in Python, Pandas and Matplot was very helpful in making this decision.</p>",
					width: "1040px",
					layout: "side"
				}],				
			}				
		}
	},
	computed: {
		...mapState(['siteContent', 'dataIsReady']),
		project: function() {
			if (!this.dataIsReady) return;
			return this.siteContent.playground.projects['lifeInEurope'];
		},
	},
	mounted() {
		this.render();
	},
	watch: {
		'$vuetify.breakpoint': function(to, from) {
				this.render()
			}
	},
	methods: {
		render: function() {

			d3.select('#visualizationLifeInEurope svg').remove();

			var margin = {
				top: 0,
				right: 20,
				bottom: 55,
				left: 89
			},
			width = 1000 - margin.left - margin.right,
			height = 900 - margin.top - margin.bottom,
			viewBoxWidth = width + margin.left + margin.right,
			viewBoxHeight = height + margin.top + margin.bottom;

		var projection = d3.geoMercator()
			.scale(700)
			.translate([width / 2.12, height * 1.5]);

		var path = d3.geoPath().projection(projection);

		d3.json('data/playground/lifeineurope/euromap.geojson').then(function(geojson) {
			d3.csv('data/playground/lifeineurope/job_satisfaction.csv').then(function(data) {

				geojson.features.forEach(function(feature) {

					data.forEach(function(d) {
						if (feature.properties.name == d.country) {
							delete d.country;
							d.avg_hrs_worked = +d.avg_hrs_worked;
							d.life_expect = +d.life_expect;
							d.median_income = +d.median_income;
							d.prct_job_satis_high = +d.prct_job_satis_high;
							d.prct_life_satis_high = +d.prct_life_satis_high;

							feature.properties['data'] = d;
						}
					});

				});

				// colors
				var avg_hrs_worked_colors = d3.scaleThreshold()
					.domain([32, 34, 36, 38, 40, 42, 44])
					.range(d3.schemeReds[8]);

				var median_income_colors = d3.scaleThreshold()
					.domain([5000, 7000, 10000, 15000, 20000, 24000, 30000])
					.range(d3.schemeRdYlGn[8]);

				var life_expect_colors = d3.scaleThreshold()
					.domain([75, 77, 79, 80, 82, 83])
					.range(d3.schemeRdYlGn[7]);

				var prct_job_satis_high_colors = d3.scaleThreshold()
					.domain([14, 20, 24, 28, 32, 36, 40, 44])
					.range(d3.schemeYlGn[9]);

				var prct_life_satis_high_colors = d3.scaleThreshold()
					.domain([10, 13, 16, 20, 24, 28, 35, 40, 44])
					.range(d3.schemeYlGn[9]);

				$('#visualizationLifeInEurope ul li').on('click', function() {
					var $this = $(this);
					var $set = $this.data('set');
					var $button = $('#visualizationLifeInEurope ul li')
					if ($button.hasClass('clicked')) {
						$button.removeClass('clicked');
					}
					$this.addClass('clicked');
					draw(geojson, $set, eval($set + '_colors'));

				});

				$('#visualizationLifeInEurope ul li:first-child').trigger('click');
			});
		});

		function draw(map, setname, colors) {
			var features = map.features;
			var data = [];

			features.forEach(function(d) {
				if (Object.prototype.hasOwnProperty.call(d.properties, 'data')) {
					data.push(d.properties.data[setname])
				}
			});

			d3.select('#visualizationLifeInEurope svg').remove();

			var svg = d3.select('#visualizationLifeInEurope')
				.append('svg')
				.attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
			.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			var tooltip = d3.select('#vizTooltip')
				.attr('class', 'darkTooltip')

			var show_tooltip = function(d) {
				var content = '';

				if (Object.prototype.hasOwnProperty.call(d.properties, 'data')) {
					content += '<span>' + d.properties['name'] + '</span>';
					content += d.properties.data[setname];
				} else {
					content += '<span>' + d.properties['name'] + '</span>';
					content += 'no available data'
				}

				d3.selectAll('.country')
					.style('opacity', 0.95)
					.attr('stroke', '#999');
				d3.select(this)
					.style('opacity', 1)
					.attr('stroke', '#1e384d');

				tooltip
					.style('display', 'block')
					.style('opacity', 0.5)
					.transition()
					.duration(500)
					.style('opacity', 1)

				tooltip
					.style('left', (d3.event.pageX + 20) + 'px')
					.style('top', (d3.event.pageY + 30) + 'px')
					.style('display', 'block')
					.html(content);
			}

			svg
				.selectAll('path')
				.data(map.features)
				.enter()
				.append('path')
				.attr('class', 'country')
				.attr('d', path)
				.attr('stroke', '#999')
				.attr('fill', function(d) {

					if (Object.prototype.hasOwnProperty.call(d.properties, 'data')) {
						return colors(d.properties.data[setname])
					} else {
						return '#fff';
					}
				})
				.style('opacity', 0.95)
				.on('mousemove', show_tooltip)
				.on('mouseout', hide_tooltip);

			function hide_tooltip(d) {
				d3.selectAll('.country').style('opacity', 0.95)
					.attr('stroke', '#999');
				d3.select(this)
					.attr('stroke', '#999');
				tooltip
					.style('display', 'none')
				}
			}
		},
	}
}
</script>