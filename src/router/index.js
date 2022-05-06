import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("../views/Home.vue"),
    },
  },
  {
    path: "/about",
    name: "About",
    components: {
      default: () => import("../views/About.vue"),
    },
  },
  {
    path: "/contact",
    name: "Contact",
    components: {
      default: () => import("../views/Contact.vue"),
    },
  },
  // projects
  {
    path: "/projects",
    name: "Projects",
    redirect: "/",
  },
  {
    path: "/projects/activism",
    name: "Activism",
    components: {
      default: () => import("../views/projects/Activism.vue"),
    },
  },
  {
    path: "/projects/thesis",
    name: "Thesis",
    components: {
      default: () => import("../views/projects/Thesis.vue"),
    },
  },
  {
    path: "/projects/onexhibit",
    name: "onexhibit",
    components: {
      default: () => import("../views/projects/OnExhibit.vue"),
    },
  },
  {
    path: "/projects/airquality",
    name: "airquality",
    components: {
      default: () => import("../views/projects/AirQuality.vue"),
    },
  },
  {
    path: "/projects/alcoholicsAnonMap",
    name: "alcoholicsAnonMap",
    components: {
      default: () => import("../views/projects/AlcoholicsAnonMap.vue"),
    },
  },
  {
    path: "/projects/earthquakesMonitor",
    name: "earthquakesMonitor",
    components: {
      default: () => import("../views/projects/EarthquakesMonitor.vue"),
    },
  },
  {
    path: "/projects/conspiracies",
    name: "conspiracies",
    components: {
      default: () => import("../views/projects/Conspiracies.vue"),
    },
  },
  {
    path: "/projects/sotu",
    name: "sotu",
    components: {
      default: () => import("../views/projects/Sotu.vue"),
    },
  },
  {
    path: "/projects/error_bars",
    name: "error_bars",
    components: {
      default: () => import("../views/projects/ErrorBars.vue"),
    },
  },
  {
    path: "/projects/visualizingGradSchool",
    name: "visualizingGradSchool",
    components: {
      default: () => import("../views/projects/VisualizingGradSchool.vue"),
    },
  },

  //playground
  {
    path: "/playground",
    name: "Playground",
    redirect: "/playground/jobAutomation",
    components: {
      default: () => import("../views/Playground.vue"),
    },
    children: [
      {
        path: "jobAutomation",
        name: "job_automation",
        components: {
          playgroundPage: () => import("../views/playground/JobAutomation.vue"),
        },
      },

      {
        path: "refugeesInBulgaria",
        name: "refugees_in_bulgaria",
        components: {
          playgroundPage: () =>
            import("../views/playground/RefugeesInBulgaria.vue"),
        },
      },

      {
        path: "diseasesInEurope",
        name: "diseases_in_europe",
        components: {
          playgroundPage: () =>
            import("../views/playground/DiseasesInEurope.vue"),
        },
      },

      {
        path: "lifeInEurope",
        name: "life_in_europe",
        components: {
          playgroundPage: () => import("../views/playground/LifeInEurope.vue"),
        },
      },

      {
        path: "alzheimerClinicalTrials",
        name: "alzheimer_clinical_trials",
        components: {
          playgroundPage: () =>
            import("../views/playground/AlzheimerClinicalTrials.vue"),
        },
      },

      {
        path: "refugeesDeaths",
        name: "refugees_deaths",
        components: {
          playgroundPage: () =>
            import("../views/playground/RefugeesDeaths.vue"),
        },
      },
    ],
  },
  // 404
  {
    path: "*",
    name: "Error",
    components: {
      default: () => import("../views/errorPage.vue"),
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { x: 0, y: 0 };
  },
});

export default router;
