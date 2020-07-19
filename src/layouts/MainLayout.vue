<template>
  <div class="mylayout">
    <div class="mylayout__top" :class="topStyle">
      <div class="title">프로젝트 관리 도구</div>
      <div class="account">
        <span>{{userInfo.name}}</span>
        <q-btn label="LOGOUT" color="red" @click="onClickLogout" flat />
      </div>
    </div>

    <div class="mylayout__contents">
      <router-view></router-view>
    </div>

    <div class="mylayout__overlay" v-if="loading">
      <q-spinner color="white" size="5em" />
    </div>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters({
      topStyle: "getTopStyle",
      userInfo: "getUserInfo"
    })
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    onClickLogout() {
      this.$store.dispatch(T.LOGOUT);
      this.movePage("/");
      alert("로그아웃 되었습니다.");
    }
  }
};
</script>

<style lang="scss">
.row {
  font-family: "Nanum Gothic", sans-serif;
  margin: 0;
}
html {
  width: 100vw;
  height: 100vh;

  #q-app {
    height: 100vh;
    .mylayout {
      height: 100%;
      display: flex;
      flex-direction: column;
      &__top {
        display: flex;
        justify-content: space-between;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.12);

        padding: 10px 15px;
        margin-bottom: 4px;

        .title {
          font-size: 16px;
          font-weight: bold;
        }

        .account {
          display: flex;
          align-items: center;
          span {
            font-size: 16px;
          }
          button {
            margin-left: 10px;
          }
        }
      }

      .none {
        display: none;
      }

      &__contents {
        padding: 10px 15px;
        height: 100%;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #5c656bcc;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.dashboard-dialog {
  background-color: white;
  width: 40%;

  &__text {
    padding: 20px;
  }

  &__buttons {
    display: flex;
    border-top: 1px solid black;
    button {
      width: 50%;
    }
  }
}
</style>
