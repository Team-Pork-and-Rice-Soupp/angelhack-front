<template>
  <div class="project-list">
    <workspace-card :workspaceId="item.id" v-for="(item, index) in projects" :key="index">
      <template v-slot:card-title>{{item.title}}</template>
      <template v-slot:card-description>{{item.description}}</template>
    </workspace-card>

    <workspace-card :addButton="true">
      <template v-slot:add-card>new+</template>
    </workspace-card>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import WorkspaceCard from "../components/WorkspaceCard";

export default {
  data() {
    return {
      projects: [
        {
          id: 3,
          title: "운영체제",
          description: "유닉스 컴파일 후 나만의 운영체제 개발하기",
          createDate: "2020-07-17T19:52:27",
          updateDate: "2020-07-17T19:52:27"
        },
        {
          id: 3,
          title: "운영체제",
          description: "유닉스 컴파일 후 나만의 운영체제 개발하기",
          createDate: "2020-07-17T19:52:27",
          updateDate: "2020-07-17T19:52:27"
        }
      ]
    };
  },
  components: {
    WorkspaceCard
  },
  mounted() {
    this.$store.dispatch(T.CHANGE_TOP_STYLE, "");

    const token = localStorage.getItem("token");
    this.getProjects(token);
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    getProjects(token) {
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
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
</style>