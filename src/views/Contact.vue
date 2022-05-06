<template>
  <v-row class="contact" justify="center">
    <v-col cols="10" class="mb-10">
      <h2 class="py-3 font-weight-bold text-h3 mt-10">CONTACT</h2>
      <LinkButtons :links="links" />
    </v-col>
  </v-row>
</template>

<script>
import LinkButtons from "@/components/projects/LinkButtons.vue";

export default {
  name: "Contact",
  components: {
    LinkButtons,
  },
  data() {
    return {
      links: {
        email: {
          name: "Link to email",
          src_link: "mailto:yoana.kosturska@gmail.com",
        },
        linkedin: {
          name: "Link to LinkedIn",
          src_link: "https://www.linkedin.com/in/yoana-kosturska-65bb8b150/",
        },
        github: {
          name: "Link to github",
          src_link: "https://github.com/yoanacodes",
        },
      },
    };
  },
};
</script>
