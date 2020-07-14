<template>
  <div class="edit-workspace">
    <add-workspace />
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import AddWorkspace from "../components/AddWorkspace.vue";

export default {
  data() {
    return {};
  },
  components: {
    AddWorkspace
  },
  mounted() {},
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>