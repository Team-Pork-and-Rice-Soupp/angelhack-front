<template>
  <div class="work-space-form">
    <!-- 타이틀, 설명, 멤버 검색창 등 인풋 묶음 -->
    <div class="inputs">
      <q-input v-model="title" label="title" />
      <q-input v-model="description" label="description" autogrow />

      <q-form class="search-form" @submit="searchMember">
        <q-input ref="keyword" v-model="keyword" placeholder="검색어를 입력해주세요." />

        <div class="search-form__button">
          <q-btn flat label="search" color="blue" type="submit" />
        </div>
      </q-form>
    </div>

    <!-- 멤버 카드들 -->
    <div class="member-cards">
      <add-member-card v-for="(member, index) in members" :key="index" :memberInfo="member" />
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened">
      <div class="search-result-list-card">
        <q-card>
          <q-card-section>
            <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="scroll-area">
              <ul class="result-list">
                <li
                  class="result"
                  :class="result.selected? 'is-selected' : ''"
                  v-for="(result, index) in searchResults"
                  :key="index"
                >
                  <div class="result__info">
                    <div>{{ result.name }}</div>
                    <div>{{ result.email }}</div>
                  </div>
                  <q-btn
                    v-if="!result.selected"
                    label="select"
                    color="positive"
                    flat
                    @click="onResultClick(result)"
                  />
                  <q-btn
                    v-if="result.selected"
                    label="remove"
                    color="negative"
                    flat
                    @click="onResultClick(result)"
                  />
                </li>
              </ul>
            </q-scroll-area>
          </q-card-section>

          <q-card-actions>
            <q-btn label="Confirm" flat color="primary" @click="onclickConfirm" />
            <q-btn label="Cancel" flat color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
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
  created() {
    for (let i = 0; i < 20; i++) {
      this.searchResults.push({
        name: `dummy's name ${i}`,
        email: `dummys${i}@emaidddddddddl.com`,
        selected: false
      });
    }
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
    console.log(this.userInfo);
    if (this.userInfo.email) {
      this.setMyMember(this.userInfo);
    }
  },
  methods: {
    onclickConfirm() {
      this.members.push.apply(this.members, this.selectedMembers);
      this.dialogOpened = false;
    },
    addingMember() {
      this.$children
        .find(el => el.vueName == "add-members")
        .addMember(res => {
          this.members.push(res);
        });
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
            console.log(res);
            if (res.length > 0) {
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
      console.log("this.selectedMembers >> ", this.selectedMembers);
    },
    setMyMember(userInfo) {
      this.members.push({
        email: userInfo.email,
        description: "테스트입니다.",
        role: "MANAGER"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.work-space-form {
  width: 30%;
  .inputs {
    margin-bottom: 40px;
    .search-form {
      display: flex;
      justify-content: space-between;
      &__button {
        height: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
.search-result-list-card {
  width: 800px;

  .scroll-area {
    height: 800px;

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