<template>
  <div class="dd-handle">
    <div class="flex justify-between">
      <h6>{{ task.head }}</h6>
      <p>{{ task.title }}</p>
      <!-- <img class="w-6 h-6 rounded-full ml-3" src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        alt="Avatar"> -->
    </div>
    <!-- <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{ task.date }}</span>
      <badge v-if="task.type" :color="badgeColor">{{ task.type }}</badge>
    </div> -->
  </div>
</template>
<script>
import Badge from "./Badge.vue";
export default {
  components: {
    Badge
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green",
        default: "teal"
      };
      return mappings[this.task.type] || mappings.default;
    }
  }
};
</script>
