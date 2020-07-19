<template>
  <div class="dashboard">
    <div class="dashboard__top">
      <q-card class="card__workspace">
        <span class="title">{{title}}</span>
        <span>{{description}}</span>
      </q-card>
      <q-card class="card__member">
        <span class="title">참여 멤버 (총 {{members.length}}명)</span>
        <div class="scroll">
          <div v-for="(item,index) in members" :key="index">
            <span>{{item.email}}</span>
            <span>{{item.name}}</span>
          </div>
        </div>
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
            title="해결 정리"
            description="설명"
            :stepData="stepData[4]"
            :addStep="addStep"
            ref="fab05"
          ></step-fab>
        </div>
      </q-card>
    </div>

    <div class="dashboard__bottom">
      <q-card class="card__bottom-button" @click="createMeetingLog">
        <q-icon name="create" />
        <span>회의록 작성</span>
      </q-card>

      <q-card class="card__bottom-button" @click="movePage('/MeetingLog')">
        <q-icon name="assignment" />
        <span>회의록 확인</span>
      </q-card>

      <q-card class="card__bottom-button" @click="showContribution">
        <q-icon name="assessment" />
        <span>기여도 확인</span>
      </q-card>

      <q-card class="card__bottom-button" @click="onClickClose">
        <q-icon name="close" />
        <span>워크스페이스 종료</span>
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

    <!-- Dialog -->
    <q-dialog v-model="assessmentDialog">
      <div class="dashboard-dialog">
        <div class="dashboard-dialog__text ass">
          <div v-for="(m, index) in assData" :key="index">
            <q-input
              filled
              v-model="m.score"
              :label="m.name +'의 점수'"
              :disable="userInfo.name == m.name ? true : false "
            />
          </div>
        </div>
        <div class="dashboard-dialog__buttons">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="제출" color="blue" @click="submitAssessment" />
        </div>
      </div>
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
      workspaceId: "getWorkspaceId",
      userInfo: "getUserInfo"
    })
  },
  data() {
    return {
      title: "Title",
      description: "Description",
      members: [],
      stepData: [
        {
          locked: false,
          writed: []
        },
        {
          locked: true,
          writed: []
        },
        {
          locked: true,
          writed: []
        },
        {
          locked: true,
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
      },
      assessmentDialog: false,
      assD: null,
      assData: [],

      documentCheck: true
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

            vue.setAssessmentData(res.members);
            vue.setToos(res.tools);
            if (res.documents.length > 0) {
              vue.getDocument(res.documents);
            }

            vue.$store.dispatch(T.CHANGE_MEMBERS, res.members);
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
      tools.forEach(t => {
        let pushObj = {
          label: t.type
        };

        switch (t.type) {
          case "SWOT":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=1-1&edit=true&id=" + t.toolId
              );
            };
            this.stepData[1].locked = false;
            this.stepData[0].writed.push(pushObj);

            if (
              this.stepData[0].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[0].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[0].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 0;
              }
            });

            break;
          case "PEST":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=1-3&edit=true&id=" + t.toolId
              );
            };
            this.stepData[1].locked = false;
            this.stepData[0].writed.push(pushObj);

            if (
              this.stepData[0].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[0].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[0].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 0;
              }
            });
            break;
          case "FiveWhys":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=2-1&edit=true&id=" + t.toolId
              );
            };
            this.stepData[2].locked = false;
            this.stepData[1].writed.push(pushObj);

            if (
              this.stepData[1].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[1].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[1].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 1;
              }
            });
            break;
          case "ParetoChart":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=2-3&edit=true&id=" + t.toolId
              );
            };
            this.stepData[2].locked = false;
            this.stepData[1].writed.push(pushObj);

            if (
              this.stepData[1].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[1].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[1].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 1;
              }
            });
            break;
          case "LogicTree":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=3-1&edit=true&id=" + t.toolId
              );
            };
            this.stepData[3].locked = false;
            this.stepData[2].writed.push(pushObj);

            if (
              this.stepData[2].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[2].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[2].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 2;
              }
            });
            break;
          case "FiveWOneH":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=3-2&edit=true&id=" + t.toolId
              );
            };
            this.stepData[3].locked = false;
            this.stepData[2].writed.push(pushObj);

            if (
              this.stepData[2].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[2].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[2].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 2;
              }
            });
            break;
          case "AsisTobe":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=5-1&edit=true&id=" + t.toolId
              );
            };
            this.stepData[4].writed.push(pushObj);

            if (
              this.stepData[4].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[4].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[4].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 4;
              }
            });
            break;
          case "TimeLine":
            pushObj.click = () => {
              this.$router.push(
                "/CreateTools?type=5-2&edit=true&id=" + t.toolId
              );
            };
            this.stepData[4].writed.push(pushObj);

            if (
              this.stepData[4].writed.findIndex(
                el => el.label == "기여도 작성"
              ) != -1
            ) {
              this.stepData[4].writed.splice(
                this.stepData[0].writed.findIndex(
                  el => el.label == "기여도 작성"
                ),
                1
              );
            }

            this.stepData[4].writed.push({
              label: "기여도 작성",
              click: () => {
                this.assessmentDialog = true;
                this.assD = 4;
              }
            });
            break;
        }
      });
    },
    getDocument(document) {
      document.forEach(el => {
        this.stepData[3].writed.push({
          label: "아이디어 도출 문서",
          click: () => {
            const url = "http://kalin.iptime.org:4000/page/document/" + el.id;
            window.open(url);
          }
        });
      });

      this.documentCheck = false;
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
          console.log("hi");

          this.$store.dispatch(T.ADD_CO_OP_TOOL, {
            token: localStorage.getItem("token"),
            document: {
              title: "아이디어 도출",
              workspaceId: this.workspaceId
            },
            cb: () => {}
          });

          break;
        case "해결 정리":
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
    },
    seeResult() {
      return {
        "result-button": this.dummy_data_from_server.isAllDone
      };
    },
    setAssessmentData(members) {
      members.forEach(m => {
        let pushObj = {
          email: m.email,
          name: m.name,
          score: ""
        };

        this.assData.push(pushObj);
      });
    },
    submitAssessment() {
      this.assessmentDialog = false;
      let sendData = [];

      this.assData.forEach(d => {
        let pushObj = {
          email: d.email,
          score: d.score
        };

        if (this.userInfo.email != d.email) {
          sendData.push(pushObj);
        }
      });

      console.log(sendData);
      this.$store.dispatch(T.ADD_ASSESSMENT, {
        workspaceId: this.workspaceId,
        assessment: {
          members: sendData,
          step: this.assD
        },
        token: localStorage.getItem("token"),
        cb: () => {
          console.log("S");
        }
      });
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
      padding: 10px 15px;
      width: 59%;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      span {
        font-size: 14px;
      }
    }
    &__member {
      padding: 10px 15px;
      width: 39%;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .scroll {
        overflow: scroll;
        div {
          margin-bottom: 4px;
          width: 80%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    &__step {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .step-wrapper {
        padding: 4px;
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

    &__bottom-button {
      width: 24%;
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      i {
        font-size: 40px;
        color: #070819;
      }
      span {
        color: #070819;
        font-size: 18px;
      }
    }

    &__bottom-button:hover {
      background-color: #ececec;
    }

    &__bottom-button:active {
      background-color: #b9b9b9;
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

  .ass {
    label {
      margin-bottom: 10px;
    }
  }
}
.result-button {
  &:hover {
    cursor: pointer;
  }
}
</style>
