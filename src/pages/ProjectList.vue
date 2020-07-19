<template>
  <div class="project-list">
    <workspace-card v-for="(item, index) in projects" :key="index" :workspace="item" />
    <workspace-card />
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import WorkspaceCard from "../components/WorkspaceCard";

export default {
  data() {
    return {
      projects: []
    };
  },
  components: {
    WorkspaceCard
  },
  mounted() {
    this.$store.dispatch(T.LOGIN_CHECK, {
      goBack: () => {
        this.$router.push("/");
      }
    });

    this.$store.dispatch(T.CHANGE_TOP_STYLE, "");

    this.getProjects();
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    getProjects() {
      let vue = this;
      this.$store.dispatch(T.GET_PROJECTS, {
        token: localStorage.getItem("token"),
        cb: res => {
          console.log(res);
          vue.projects = res;
        },
        cErr: err => {
          console.log(err);
        }
      });
    },
    addProject() {
      this.movePage("/AddProject");
    }
  }
};
</script>

<style lang="scss" scoped>
.project-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>