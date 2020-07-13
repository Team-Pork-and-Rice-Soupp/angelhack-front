<template>
  <div class="add-workspace">
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
.add-workspace{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>