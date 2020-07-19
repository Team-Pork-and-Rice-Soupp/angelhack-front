<template>
  <q-card @click="onClickCard" class="workspace-card">
    <div class="top">
      <q-icon :name="workspace ? 'assignment' : 'add_box'" />
      <q-btn v-if="workspace" label="DELETE" flat color="red" @click="clickLock = true" />
    </div>

    <span class="title">{{workspace ? workspace.title : "워크스페이스 생성"}}</span>
    <span>{{workspace ? workspace.description : ''}}</span>

    <!-- Dialog -->
    <q-dialog v-model="clickLock">
      <div class="dashboard-dialog">
        <div class="dashboard-dialog__text">워크스페이스를 삭제하시겠습니까?</div>
        <div class="dashboard-dialog__buttons">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="삭제" color="red" @click="onClickDelete" />
        </div>
      </div>
    </q-dialog>
  </q-card>
</template>

<script>
import { T } from "../store/module/types.js";

export default {
  props: ["workspace"],
  data() {
    return {
      clickLock: false
    };
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    onClickCard() {
      if (!this.clickLock) {
        if (this.workspace) {
          this.movePage("/Dashboard?id=" + this.workspace.id);
        } else {
          this.$router.push("/AddProject");
        }
      }
    },
    onClickDelete() {
      let vue = this;
      this.$store.dispatch(T.DELETE_WORKSPACE, {
        workspaceId: this.workspace.id,
        token: localStorage.getItem("token"),
        cb: () => {
          vue.$parent.getProjects();
          alert("워크스페이스가 삭제되었습니다.")
        },
        cErr: err => {
          console.log(err);
          alert("오류가 발생하였습니다.");
        }
      });
      this.clickLock = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.workspace-card {
  padding: 10px 15px;
  margin: 0 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  min-height: 160px;

  cursor: pointer;
  color: #070819;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    i {
      font-size: 40px;
      color: #070819;
    }
  }

  .title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  span {
    font-size: 14px;
  }

  &:hover {
    background-color: #ececec;
  }

  &:active {
    background-color: #b9b9b9;
  }
}
</style>