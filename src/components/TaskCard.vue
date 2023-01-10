<template>


  <div class="dd-handle">
    <div class="flex justify-between">
      <div class="headerChild">
        <h6>{{ task.head }}</h6>
        <ul class="header-dropdown">
          <div>
            <li style="display: inline-block"><a href="javascript:void(0);" @click="onOpenModel(column.taskId);"><i
                  class="icon-note"></i></a>
            </li>
            <li style="display: inline-block;padding: 0 3px;"><a href="javascript:void(0);"
                @click="onOpenModel(column.taskId);"><i class="icon-close"></i></a>
            </li>
          </div>
        </ul>
      </div>
      <p>{{ task.title }}</p>
    </div>
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
