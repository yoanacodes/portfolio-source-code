<style lang="sass">
#playgroundDescription
	background: #f1f1f1
	margin: -11px 0 100px 0
	padding-top: 75px
</style>
<template>
  <div>
    <v-row justify="center" id="playgroundDescription">
      <v-col cols="10">
        <ProjectMeta
          :title="meta.name"
          :description="meta.description"
          :technologies="meta.technologies"
        />
      </v-col>
    </v-row>

    <PlaygroundTabs />

    <router-view name="playgroundPage"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PlaygroundTabs from "@/components/playground/PlaygroundTabs";
import ProjectMeta from "@/components/ProjectMeta";

export default {
  name: "Playground",
  components: {
    PlaygroundTabs,
    ProjectMeta,
  },
  computed: {
    ...mapState(["siteContent"]),
    meta: function () {
      return this.siteContent.playground;
    },
  },
};
</script>
