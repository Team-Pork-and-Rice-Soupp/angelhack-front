<template>
  <div class="project-list">
    <!--
    <workspace-card :workspaceId="item.id" v-for="(item, index) in projects" :key="index">
      <template v-slot:card-title>{{item.title}}</template>
      <template v-slot:card-description>{{item.description}}</template>
    </workspace-card>

    <workspace-card :addButton="true">
      <template v-slot:add-card>new+</template>
    </workspace-card>
    -->

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

    const token = localStorage.getItem("token");
    this.getProjects(token);
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    getProjects(token) {
      let vue = this;
      this.$store.dispatch(T.GET_PROJECTS, {
        token,
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