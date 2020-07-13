<template>
  <div>프로젝트 리스트</div>
</template>

<script>
import { T } from "../store/module/types.js";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch(T.CHANGE_TOP_STYLE, "");
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>