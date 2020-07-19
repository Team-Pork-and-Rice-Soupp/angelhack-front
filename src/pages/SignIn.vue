<template>
  <div class="signin">
    <div class="signin__card">
      <div class="signin-title">엔젤핵 해커톤</div>
      <div class="signin-title">돼지국빱팀</div>
      <div class="signin-title">프로젝트 관리 도구</div>
      <q-input label="Email" type="email" v-model="email" />
      <q-input label="Password" type="password" v-model="password" />
      <q-slide-transition>
        <div class="card-input" v-if="signUpOpened">
          <q-input label="Name" v-model="name" />
        </div>
      </q-slide-transition>
      <div class="card-buttons">
        <q-btn flat :label="signUpOpened ? 'Cancel' : 'Sign in'" @click="onClickSignIn" />
        <q-btn flat label="Sign up" @click="onClickSignUp" />
      </div>
    </div>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      signUpOpened: false
    };
  },
  mounted() {
    this.$store.dispatch(T.LOGIN_CHECK, {
      goFront: () => {
        this.$router.push("/ProjectList");
      }
    });
    this.$store.dispatch(T.CHANGE_TOP_STYLE, "none");
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    onClickSignIn() {
      if (this.signUpOpened) {
        this.signUpOpened = false;
      } else {
        if (this.email == "") {
          alert("이메일을 입력해주세요.");
        } else if (this.password == "") {
          alert("비밀번호를 입력해주세요.");
        } else {
          let vue = this;
          this.$store.dispatch(T.SIGN_IN, {
            email: this.email,
            password: this.password,
            cb: res => {
              let userInfo = {
                email: res.email,
                name: res.name
              };
              vue.$store.dispatch(T.CHANGE_USER_INFO, userInfo);
              localStorage.setItem("token", res.token);
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              vue.movePage("/ProjectList");
            },
            cErr: err => {
              alert("로그인에 문제가 발생하였습니다.");
            }
          });
        }
      }
    },
    onClickSignUp() {
      if (this.signUpOpened) {
        if (this.email == "") {
          alert("이메일을 입력해주세요.");
        } else if (this.password == "") {
          alert("비밀번호를 입력해주세요.");
        } else if (this.name == "") {
          alert("이름을 입력해주세요.");
        } else {
          let vue = this;
          this.$store.dispatch(T.SIGN_UP, {
            email: this.email,
            password: this.password,
            name: this.name,
            cb: () => {
              vue.email = "";
              vue.password = "";
              vue.name = "";
              vue.signUpOpened = false;
              alert("회원가입이 성공적으로 되었습니다.");
            },
            cErr: () => {
              alert("회원가입에 문제가 발생하였습니다.");
            }
          });
        }
      } else {
        this.signUpOpened = true;
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

    .signin-title {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .signin-title:nth-child(3) {
      font-size: 24px;
      font-weight: bold;
    }

    label {
      width: 30%;
      margin-bottom: 10px;
    }
    .card-input {
      width: 30%;
      label {
        width: 100%;
      }
    }

    .card-buttons {
      width: 30%;
      display: flex;
      justify-content: space-between;

      button {
        width: 48%;
      }
    }
  }
}
</style>