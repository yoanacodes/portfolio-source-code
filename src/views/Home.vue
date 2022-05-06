<template>
  <div class="home">
    <h2
      class="text-center justify-center py-6 font-weight-bold text-h2 basil--text"
    >
      Portfolio
    </h2>
    <ProjectsGrid />
  </div>
</template>

<script>
import ProjectsGrid from "@/components/ProjectsGrid";

export default {
  name: "Home",
  components: {
    ProjectsGrid,
  },
};
</script>
