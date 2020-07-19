<template>
  <div class="add-workspace-card">
    <!-- 타이틀, 설명, 멤버 검색창 등 인풋 묶음 -->
    <q-card class="add-workspace-card__info">
      <div class="info-title">워크스페이스 정보</div>
      <q-input filled v-model="title" label="제목" />
      <q-input filled v-model="description" label="설명" />

      <q-form class="search-form" @submit="searchMember">
        <q-input filled ref="keyword" v-model="keyword" placeholder="팀원 이메일 검색" />

        <div class="search-form__button">
          <q-btn flat label="search" color="blue" type="submit" />
        </div>
      </q-form>
    </q-card>

    <!-- 멤버 카드들 -->
    <div class="add-workspace-card__members">
      <add-member-card v-for="(member, index) in members" :key="index" :memberInfo="member" />
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened" @hide="hideDialog">
      <div class="dashboard-dialog">
        <div class="dashboard-dialog__text">
          <div v-for="(user, index) in searchResults" :key="index" class="user-div">
            <div class="user-div__info">
              <span>{{ user.name }}</span>
              <span>{{ user.email }}</span>
            </div>
            <div class="user-div__buttons">
              <q-btn
                :label="user.selected ? 'delete' :'select'"
                :color="user.selected ? 'negative' :'positive'"
                flat
                @click="onResultClick(user)"
              />
            </div>

            <hr v-if="index + 1 != searchResults.length" />
          </div>
        </div>

        <div class="dashboard-dialog__buttons">
          <q-btn label="Cancel" flat color="negative" v-close-popup />
          <q-btn label="Confirm" flat color="primary" @click="onclickConfirm" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";
import AddMemberCard from "./AddMemberCard.vue";

export default {
  name: "add-workspace",
  components: {
    AddMemberCard
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    })
  },
  data() {
    return {
      vueName: "addWorkspace",
      title: "",
      description: "",
      members: [],
      keyword: "",
      dialogOpened: false,

      selectedMembers: [],

      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },

      searchResults: [],

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      }
    };
  },
  mounted() {
    if (this.userInfo.email) {
      this.setMyMember(this.userInfo);
    }
  },
  methods: {
    refineMembers() {
      let refinedMemberList = [];
      const chileVue = this.$children.filter(v => v.vueName == "addMemberCard");
      let returnCheck = true;

      this.members.forEach(member => {
        if (returnCheck) {
          if (
            chileVue.find(v => v.memberInfo.email == member.email)
              .memberDescription == ""
          ) {
            alert("팀원 카드의 정보를 입력해주세요.");
            returnCheck = false;
          } else if (
            !chileVue.find(v => v.memberInfo.email == member.email).memberRole
          ) {
            alert("팀원 카드의 정보를 입력해주세요.");
            returnCheck = false;
          } else {
            refinedMemberList.push({
              email: member.email,
              description: chileVue.find(
                v => v.memberInfo.email == member.email
              ).memberDescription,
              role: chileVue.find(v => v.memberInfo.email == member.email)
                .memberRole
            });
          }
        }
      });

      if (returnCheck) {
        return refinedMemberList;
      } else {
        return false;
      }
    },
    onclickConfirm() {
      if (this.selectedMembers.length) {
        // 1. 이미 있는지 비교
        let flag, duplicate;
        let filtered = [];
        this.selectedMembers.forEach((selMember, sIndex) => {
          flag = true;
          this.members.forEach((member, mIndex) => {
            if (member.email == selMember.email) {
              flag = false;
              duplicate = true;
            }
          });
          if (flag) {
            filtered.push(selMember);
          }
        });

        let pushed = false;
        // 2. this.members에 삽입
        filtered.forEach(selMember => {
          this.members.push(selMember);
          pushed = true;
        });

        // 3. 이미 있는 놈을 리스트에 추가하려 했다면, 추가 후 alert해줘라
        if (duplicate) {
          alert("중복되는 인물은 추가되지 않습니다.");
        }
        if (pushed) {
          this.selectedMembers = [];
          this.dialogOpened = false;
        }
      } else {
        alert("팀원을 선택해주세요.");
      }
    },
    searchMember() {
      if (this.keyword == "") {
        alert("검색어를 입력해주세요.");
      } else {
        let vue = this;
        this.$store.dispatch(T.SEARCH_USER, {
          keyword: this.keyword,
          token: localStorage.getItem("token"),
          cb: res => {
            console.log("search results >> ", res);
            if (res.length > 0) {
              res.forEach(result => {
                result.selected = false;
              });
              vue.searchResults = res;
              vue.dialogOpened = true;
            } else {
              alert("검색된 유저가 없습니다.");
            }
          },
          cErr: err => {
            console.log(err);
            alert("오류가 발생하였습니다.");
          }
        });
      }
    },
    onResultClick(result) {
      if (result.selected) {
        const index = this.selectedMembers.findIndex(
          selected => selected.email == result.email
        );
        if (index !== -1) {
          this.selectedMembers.splice(index, 1);
          result.selected = false;
        }
      } else {
        this.selectedMembers.push(result);
        result.selected = true;
      }
    },
    setMyMember(userInfo) {
      this.members.push({
        name: userInfo.name,
        email: userInfo.email,
        isMe: true
      });
    },
    hideDialog() {
      this.keyword = "";
      this.selectedMembers = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.add-workspace-card {
  display: flex;
  & &__info {
    padding: 10px 15px;
    width: 350px;
    height: fit-content;
    .info-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    label {
      margin-bottom: 10px;
    }
    .search-form {
      display: flex;
      justify-content: space-between;

      label {
        width: calc(100% - 90px);
      }

      &__button {
        height: 56px;
        button {
          height: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.user-div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__info {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  &__buttons {
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }

  hr {
    width: 100%;
    margin: 4px 0;
  }
}

.search-result-list-card {
  width: 800px;

  .scroll-area {
    height: 50vh;

    .result-list {
      list-style-type: none;
      margin: 0;
      padding: 0;

      .result {
        padding: 5px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.is-selected {
  background-color: #c3e9ff;
}
</style>