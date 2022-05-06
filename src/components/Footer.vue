<template>
  <v-footer style="margin-top: 200px" color="grey darken-4" dark>
    <v-row justify="center" no-gutters>
      <v-btn color="white" text small to="/"> HOME </v-btn>
      <v-btn color="white" text small to="/playground"> PLAYGROUND </v-btn>
      <v-btn color="white" text small to="/about"> ABOUT </v-btn>
      <v-btn color="white" text small to="/contact"> CONTACT </v-btn>

      <v-spacer />
      <span style="padding-top: 3px; padding-right: 3px; font-size: 10pt">
        Yoana Kosturska | &copy; 2021 - {{ new Date().getFullYear() }}</span
      >
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
