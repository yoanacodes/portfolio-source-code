<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <h4 style="font-size: 264px; font-weight: 200; color: #333">404</h4>
        <h5 style="font-size: 34px; font-weight: 300">
          Oops... This page does not exist. Go back to
        </h5>
        <router-link to="/" style="font-size: 50pt; font-weight: 300"
          >PORTFOLIO</router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "errorPage",
};
</script>
