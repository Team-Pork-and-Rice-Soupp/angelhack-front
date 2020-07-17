<template>
  <div class="dashboard">
    <div class="dashboard__top">
      <q-card class="card__workspace">
        <q-card-section>
          <div class="text-h4">{{title}}</div>
          <div class="text-subtitle1">{{description}}</div>
          <q-btn label="Close" @click="onClickClose" />
        </q-card-section>
      </q-card>
      <q-card class="card__member">
        <q-card-section>
          <div v-for="(item,index) in members" :key="index">
            <span>{{item.email}}</span>
            <span>{{item.name}}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="dashboard__mid">
      <q-card class="card__step">
        <div class="step-wrapper">
          <step-fab
            title="문제 인식"
            description="설명"
            :stepData="stepData[0]"
            :addStep="addStep"
            ref="fab01"
          ></step-fab>
          <hr />
          <step-fab
            title="문제 정의"
            description="설명"
            :stepData="stepData[1]"
            :addStep="addStep"
            ref="fab02"
          ></step-fab>
          <hr />
          <step-fab
            title="문제 정검"
            description="설명"
            :stepData="stepData[2]"
            :addStep="addStep"
            ref="fab03"
          ></step-fab>
          <hr />
          <step-fab
            title="아이디어 도출"
            description="설명"
            :stepData="stepData[3]"
            :addStep="addStep"
            ref="fab04"
          ></step-fab>
          <hr />
          <step-fab
            title="IF"
            description="설명"
            :stepData="stepData[4]"
            :addStep="addStep"
            ref="fab05"
          ></step-fab>
        </div>
      </q-card>
    </div>
    <div class="dashboard__bottom">
      <q-card class="card__meeting-log">
        <q-card-section>
          <q-btn label="회의록 생성" @click="createMeetingLog" />
          <q-btn label="회의록 확인" @click="movePage('/MeetingLog')" />
        </q-card-section>
      </q-card>

      <q-card class="card__contribution" :class="seeResult" @click="showContribution">
        <q-card-section>기여도 관련</q-card-section>
      </q-card>
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened">
      <div class="dashboard-dialog">
        <div class="dashboard-dialog__text">워크스페이스를 종료하시겠습니까?</div>
        <div class="dashboard-dialog__buttons">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="종료" color="red" @click="movePage('/ProjectList')" />
        </div>
      </div>
    </q-dialog>

    <!-- 회의록 템플릿 선택 Dialog -->
    <q-dialog v-model="logTemplateDialog">
      <q-card class="meeting-log__dialog" style="max-width: 100vw;">
        <q-card-section horizontal class="card-container">
          <q-card-section>
            <q-card class="card-container__card" @click="selectTemplate(templates.template1)">
              <div v-html="templates.template1"></div>
            </q-card>
          </q-card-section>

          <q-card-section>
            <q-card class="card-container__card" @click="selectTemplate(templates.template2)">
              <div v-html="templates.template2"></div>
            </q-card>
          </q-card-section>

          <q-card-section>
            <q-card class="card-container__card" @click="selectTemplate(templates.template3)">
              <div v-html="templates.template3"></div>
            </q-card>
          </q-card-section>
        </q-card-section>

        <q-card-section class="card-container__foot">
          <span>회의록 템플릿을 선택하세요. (템플릿을 다시 설정하면 이전에 작성된 글은 저장되지 않고 지워집니다.)</span>
          <q-btn label="템플릿 없이 시작하기" color="dark" flat @click="selectTemplate(null)" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";

import StepFab from "../components/StepFAB";
export default {
  components: {
    StepFab
  },
  computed: {
    ...mapGetters({
      workspaceId: "getWorkspaceId"
    }),
    seeResult() {
      return {
        "result-button": this.dummy_data_from_server.isAllDone
      };
    }
  },
  data() {
    return {
      title: "워크스페이스 제목",
      description: "워크스페이스 설명",
      members: [
        {
          email: "codemike@naver.com",
          name: "문주한"
        },
        {
          email: "codemike@gmail.com",
          name: "이주한"
        }
      ],
      stepData: [
        {
          locked: false,
          writed: [
            {
              label: "SWOT",
              click: () => {
                console.log("Click");
              }
            }
          ]
        },
        {
          locked: false,
          writed: []
        },
        {
          locked: false,
          writed: []
        },
        {
          locked: false,
          writed: []
        },
        {
          locked: false,
          writed: []
        }
      ],
      dialogOpened: false,
      logTemplateDialog: false,

      templates: {
        template1: `<p>회의록 제목:</p><p>날짜:</p><p>참여인원:</p>`,
        template2: `<p><b>템플릿2</b><br></p><p style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"><u>와 더멋지다!</u></p><ol><li style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;">우와</li></ol>`,
        template3: "<p>템플릿 3</p>"
      },
      dummy_data_from_server: {
        isAllDone: true // 프로젝트의 모든 단계를 다 마치고 기여도확인을 할 수 있나? boolean
      }
    };
  },
  mounted() {
    this.$store.dispatch(T.LOGIN_CHECK, {
      goBack: () => {
        this.$router.push("/");
      }
    });

    const id = this.$route.query.id;
    if (id) {
      this.getWorkspace(id);
    } else {
      this.getWorkspace(this.workspaceId);
    }
  },
  methods: {
    showContribution() {
      if (this.dummy_data_from_server.isAllDone) {
        this.$router.push("/ContributionStat");
      }
    },
    selectTemplate(template) {
      this.$router.push({
        name: "AddMeetingLog",
        params: { template: template }
      });
      this.logTemplateDialog = false;
    },
    createMeetingLog() {
      this.logTemplateDialog = true;
    },
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    getWorkspace(id) {
      if (id) {
        let vue = this;
        console.log(id);
        this.$store.dispatch(T.CHANGE_WORKSPACE_ID, id);
        this.$store.dispatch(T.GET_WORKSPACE_DETAIL, {
          workspaceId: id,
          token: localStorage.getItem("token"),
          cb: res => {
            console.log(res);
            vue.title = res.title;
            vue.description = res.description;
            vue.members = res.members;
            //vue.setToos(res.tools);
          },
          cErr: err => {
            console.log(err);
          }
        });
      } else {
        alert("잘못된 접근입니다.");
        this.movePage("/ProjectList");
      }
    },
    setToos(tools) {
      console.log(tools);
    },
    addStep(type) {
      switch (type) {
        case "문제 인식":
          this.movePage("/StepIntro?type=0");
          break;
        case "문제 정의":
          this.movePage("/StepIntro?type=1");
          break;
        case "문제 정검":
          this.movePage("/StepIntro?type=2");
          break;
        case "아이디어 도출":
          this.movePage("/StepIntro?type=3");
          break;
        case "IF":
          this.movePage("/StepIntro?type=4");
          break;
      }
    },

    toggleFAB(title) {
      switch (title) {
        case "문제 인식":
          this.$refs.fab02.hideFAB();
          this.$refs.fab03.hideFAB();
          this.$refs.fab04.hideFAB();
          this.$refs.fab05.hideFAB();
          break;
        case "문제 정의":
          this.$refs.fab01.hideFAB();
          this.$refs.fab03.hideFAB();
          this.$refs.fab04.hideFAB();
          this.$refs.fab05.hideFAB();
          break;
        case "문제 정검":
          this.$refs.fab01.hideFAB();
          this.$refs.fab02.hideFAB();
          this.$refs.fab04.hideFAB();
          this.$refs.fab05.hideFAB();
          break;
        case "아이디어 도출":
          this.$refs.fab01.hideFAB();
          this.$refs.fab02.hideFAB();
          this.$refs.fab03.hideFAB();
          this.$refs.fab05.hideFAB();
          break;
        case "IF":
          this.$refs.fab01.hideFAB();
          this.$refs.fab02.hideFAB();
          this.$refs.fab03.hideFAB();
          this.$refs.fab04.hideFAB();
          break;
      }
    },
    onClickClose() {
      this.dialogOpened = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__top,
  &__mid,
  &__bottom {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 20px;

    button {
      margin-right: 10px;
    }
  }

  &__top,
  &__bottom {
    height: 25%;
  }

  &__mid {
    height: 50%;
  }

  .card {
    &__workspace {
      width: 59%;
    }
    &__member {
      width: 39%;
    }
    &__step {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .step-wrapper {
        padding: 5%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        hr {
          width: 5%;
          border: 0;
          border-bottom: 1px solid black;
        }
      }
    }
    &__meeting-log {
      width: 59%;
    }
    &__contribution {
      width: 39%;
    }
  }
}
</style>

<style lang="scss">
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
.result-button {
  &:hover {
    cursor: pointer;
  }
}
</style>
