<template>
  <div class="add-workspace">
    <div class="add-workspace__buttons">
      <q-btn label="나가기" @click="movePage('/ProjectList')" />
      <q-btn label="생성하기" @click="onClickAddWorkspace" />
    </div>
    <add-workspace />
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";
import AddWorkspace from "../components/AddWorkspace.vue";

export default {
  data() {
    return {};
  },
  components: {
    AddWorkspace
  },
  mounted() {
    this.$store.dispatch(T.LOGIN_CHECK, {
      goBack: () => {
        this.$router.push("/");
      }
    });
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    onClickAddWorkspace() {
      let addWorkspaceInfo = {
        title: this.$children.find(v => v.vueName == "addWorkspace").title,
        description: this.$children.find(v => v.vueName == "addWorkspace")
          .description,
        members: this.$children.find(v => v.vueName == "addWorkspace").members
      };

      if (addWorkspaceInfo.title == "") {
        alert("워크스페이스의 제목을 입력해주세요.");
      } else if (addWorkspaceInfo.description == "") {
        alert("워크스페이스의 설명을 입력해주세요.");
      } else {
        let vue = this;
        this.$store.dispatch(T.ADD_WORKSPACE, {
          token: localStorage.getItem("token"),
          addWorkspaceInfo,
          cb: () => {
            vue.movePage("/ProjectList");
            alert("워크스페이스가 생성되었습니다.");
          },
          cErr: () => {
            alert("문제가 발생하였습니다.");
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-workspace {
  width: 100%;
  display: flex;
  align-items: center;

  flex-direction: column;

  &__buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 10px;
    }
  }
}
</style>