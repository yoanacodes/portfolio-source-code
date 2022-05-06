<style lang="sass">

.projectPage
	h3.mb-4
		margin-top: 80px
		margin-bottom: 30px !important

	h2 + h3
		margin-top: 0px !important
.logo
	color: #fff !important
	font-family: Roboto
	cursor: pointer
	font-size: 0.875rem
	font-weight: 500
	letter-spacing: 0.0892857143em
	line-height: normal
	outline: none
	position: relative
	text-decoration: none
	text-transform: uppercase

	&:active
		color: #fff
	&:hover
		color: #fff
	&:visited
		color: #fff


//***********/ app level styles //***********/
a
	color: rgb(199, 117, 240)
	text-decoration: none

	&.router-link-exact-active
		color: rgb(199, 117, 240)

.v-tab:hover
	color: rgb(199, 117, 240) !important
	transition: color 0.7s
.v-chip
	pointer-events: none
// sticky nav
#sticky
	position: sticky
	width: 100%
	background: #fff
	top: 0
	bottom: 0
	z-index: 100

//***********/ reusable styles for components //***********/
.projectPage
	#projectMeta
		a
			color: #111
			text-decoration: none

			&:hover
				color: purple
				transition: color 0.6s

	.longDescription
		font-family: Georgia, Times New Roman, serif
		font-size: 18pt
		line-height: 1.8em

		a
			color: hotpink
			text-decoration: none

			&:hover
				color: purple
				transition: color 0.3s

	.bgDescription
		background: #f1f1f1

	.imageDescription
		font-size: 12pt
		// from v-card text
		font-weight: 400
		line-height: 1.375rem
		letter-spacing: 0.0071428571em
		color: rgba(0, 0, 0, 0.6)
		font-family: Roboto, sans-serif
	h3
		font:
			size: 26pt
			weight: 600
		text-transform: uppercase

	.majorSection
		font-weight: 200
		font-size: 46pt

		a
			color: #111 !important
			text-decoration: none

		a:link
			color: #111
			text-decoration: none
			transition: color .4s ease-out

		a:visited
			color: #111
			text-decoration: none

		a:hover
			color: purple !important
			transition: color 0.6s
			text-decoration: none

		a:active
			color: purple
			text-decoration: none

//***********/ tooltip settings //***********/
#vizTooltip
	display: none
	position: absolute
	padding: 10px 15px 12px 15px
	max-width: 250px


#vizTooltip span
	display: block
	font-weight: 800
	margin: 5px 0 0 0

.darkTooltip
	background-color: #333
	color: #ddd
	opacity: 0.95
	line-height: 1.2em
</style>

<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-4"
      dark
      dense
      flat
      elevate-on-scroll
      elevation="2"
    >
      <router-link to="/" class="logo">
        Yoana Kosturska<span v-if="!$vuetify.breakpoint.xs"
          >: Front-end and Data Visualization Engineer</span
        >
      </router-link>

      <v-spacer></v-spacer>

      <v-chip-group
        v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
        active-class="primary--text"
        column
      >
        <v-chip
          outlined
          x-small
          v-for="tag in ['d3.js', 'JS', 'Vue', 'Node', 'Python', 'UX/UI']"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-app-bar>

    <v-main>
      <Barchart v-if="routeIsHome" />

      <div id="sticky">
        <v-tabs
          background-color="transparent"
          color="basil"
          grow
          slider-color="black"
          slider-size="3"
          :show-arrows="true"
          style="border-bottom: 1px solid #222"
        >
          <v-tab to="/">Portfolio Home</v-tab>
          <v-tab to="/playground">Playground</v-tab>
          <v-tab to="/about">About</v-tab>
          <v-tab to="/contact">Contact</v-tab>
        </v-tabs>
      </div>

      <v-container>
        <v-card color="basil" elevation="0">
          <router-view></router-view>
        </v-card>
      </v-container>
    </v-main>

    <div id="vizTooltip" />

    <Footer />
  </v-app>
</template>

<script>
import Barchart from "./components/Barchart";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",

  components: {
    Barchart,
    Footer,
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
    },
  },
  computed: {
    routeIsHome: function () {
      const routes = ["Home", "Playground", "About", "Contact"];
      return routes.indexOf(this.$route.name) > -1 ||
        this.$route.fullPath.indexOf("playground") > -1
        ? true
        : false;
    },
  },
  mounted() {
    this.$store.dispatch("getSiteContent");
  },
};
</script>
