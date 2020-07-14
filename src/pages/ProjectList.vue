<template>
  <div class="project-list">
    <workspace-card :workspaceId="item.Id" v-for="(item, index) in projects" :key="index">
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
          title: "test1",
          description: "설명입니다.",
          Id: "q1w2e3r4"
        },
        {
          title: "test2",
          description: "설명입니다.",
          Id: "mansbuy13579"
        }
      ]
    };
  },
  components: {
    WorkspaceCard
  },
  mounted() {
    this.$store.dispatch(T.CHANGE_TOP_STYLE, "");

    this.getProjects();
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    getProjects() {
      this.$store.dispatch(T.GET_PROJECTS, {
        userId: "",
        cb: () => {
          console.log("GET_PROJECTS");
        }
      });
    },
    action1() {
      console.log("action1");
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