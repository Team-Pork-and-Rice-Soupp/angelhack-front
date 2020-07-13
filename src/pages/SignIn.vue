<template>
  <div class="signin">
    <div class="signin__card">
      <h1>서비스 이름 or 서비스 로고</h1>
      <q-input label="Email" type="email" v-model="email" />
      <q-input label="Password" type="password" v-model="password" />
      <q-btn flat label="Sign in" @click="onClickSignIn" />
    </div>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    this.$store.dispatch(T.CHANGE_TOP_STYLE, "none");
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    onClickSignIn() {
      if (this.email == "") {
        alert("이메일을 입력해주세요.");
      } else if (this.password == "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        let vue = this;
        this.$store.dispatch(T.SIGNIN, {
          email: this.email,
          password: this.password,
          cb: () => {
            console.log("Sign In");
            vue.movePage("/ProjectList");
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.signin {
  &__card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    h1 {
      font-size: 18px;
    }

    label {
      width: 30%;
      margin-bottom: 10px;
    }

    button {
      width: 30%;
    }
  }
}
</style>