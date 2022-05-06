<style lang="sass">
#projectMeta
	#techCol
		margin-left: 20px
		font-size: 14pt
	h2
		max-width: 550px
	p
		max-width: 450px
	h4.techAspect
		font-size: 10pt
		font-weight: 500
	.techs
		font-weight: 500
	#projectLinks
		font-size: 10pt
		span
			color: #555
</style>

<template>
  <v-row id="projectMeta" class="mb-12">
    <v-col cols="12" xs="12" sm="12" md="5">
      <h2 class="py-3 font-weight-bold text-h3">
        {{ title.toUpperCase() }}
      </h2>
      <p class="text-h5 font-weight-light" v-html="description" />
    </v-col>

    <v-spacer />

    <v-col
      v-if="technologies"
      id="techCol"
      cols="12"
      xs="12"
      sm="12"
      md="3"
      :class="{
        'mt-7 ml-10': !$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm,
      }"
    >
      <v-row v-for="(technology, i) in technologiesAll" :key="i">
        <div v-if="hasTech(technology)" class="mb-4">
          <h4 class="techAspect">
            {{ technology.replace(/_/g, " ").toUpperCase() }}:
          </h4>
          <template v-for="(tech, i) in technologies[technology]">
            <v-chip label color="#333" dark :key="i" class="mr-1 mb-1 mt-1">
              {{ tech }}
            </v-chip>
          </template>
        </div>
      </v-row>
    </v-col>

    <v-col cols="12" id="projectLinks">
      <template v-if="links">
        <div v-if="links.live != false">
          <span>Live Project:</span>
          <a
            v-if="links.live.src_link != false"
            :href="links.live.src_link"
            target="_blank"
          >
            {{ links.live.name }}
          </a>
          <span v-else style="color: black"> Coming soon</span>
        </div>

        <div v-if="links.github != false">
          <span>Github: </span>
          <a
            v-if="links.github.src_link != false"
            :href="links.github.src_link"
            target="_blank"
          >
            {{ links.github.name }}
          </a>
          <span v-else style="color: black"> Coming soon</span>
        </div>
      </template>
      <template v-if="data_source">
        <div v-if="data_source != false">
          <span>Data Source: </span>
          <template v-for="(src, index) in data_source">
            <a
              v-if="src.src_link != false"
              :key="index"
              :href="src.src_link"
              target="_blank"
            >
              {{ src.name }} <br
            /></a>
            <span v-else :key="index" style="color: black">
              {{ src.name }}
            </span>
          </template>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProjectMeta",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: String,
    technologies: {
      type: [Object, Boolean],
      required: false,
    },
    data_source: {
      type: [Array, Boolean],
      required: false,
    },
    links: {
      type: Object,
      required: false,
    },
    project: Object,
  },
  computed: {
    technologiesAll: function () {
      let technologiesArray = [];
      for (const [key, value] of Object.entries(this.technologies)) {
        technologiesArray.push(key);
      }
      return technologiesArray;
    },
  },
  methods: {
    hasTech: function (techType) {
      return (
        Object.prototype.hasOwnProperty.call(this.technologies, techType) &&
        this.technologies[techType].length
      );
    },
  },
};
</script>
