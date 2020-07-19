<template>
  <div class="create-tools">
    <div class="create-tools__title">
      <span>{{title}}</span>
    </div>
    <div class="create-tools__buttons">
      <q-btn label="나가기" @click="onClickBack" />
      <q-btn label="저장하기" @click="onClickSave" v-if="!isEdit" />
      <q-btn label="수정하기" @click="onClickEdit" v-if="isEdit" />
    </div>
    <div class="create-tools__contents">
      <!-- 1-1 SWOT -->
      <swot v-if="title == 'SWOT'" class="tool" />
      <!-- 1-3 PEST -->
      <pest v-else-if="title == 'PEST 분석'" class="tool" />
      <!-- 2-1 5Whys -->
      <five-whys v-else-if="title == '5Whys'" class="tool" />
      <pareto-chart v-else-if="title == '파레토 차트'" />
      <!-- 3-1 Logic Tree -->
      <logic-tree v-else-if="title == 'Logic Tree'" />
      <!-- 3-2 육하원칙 -->
      <five-w-one-h v-else-if="title == '육하원칙'" />
      <!-- 4-1 아이디어 도출 -->
      <div v-else-if="title == '아이디어 도출'">
        <span>개발중 입니다.</span>
      </div>
      <!-- 5-1 ASIS TOBE -->
      <asis-tobe v-else-if="title == 'ASIS-TOBE'" />
      <!-- 5-2 Time Line -->
      <time-line v-else-if="title == 'Time Line'" />
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened">
      <div class="dashboard-dialog">
        <div class="dashboard-dialog__text">도구를 종료하시겠습니까?</div>
        <div class="dashboard-dialog__buttons">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="종료" color="red" @click="onClickExit" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";
import Swot from "../components/ToolSwot";
import Pest from "../components/ToolPest";
import FiveWhys from "../components/ToolFiveWhys";
import FiveWOneH from "../components/ToolFiveWOneH";
import AsisTobe from "../components/ToolAsisTobe";
import LogicTree from "../components/ToolLogicTree";
import TimeLine from "../components/ToolTimeLine";
import ParetoChart from "../components/ParetoChart";

export default {
  computed: {
    ...mapGetters({
      workspaceId: "getWorkspaceId"
    })
  },
  components: {
    LogicTree,
    ParetoChart,
    TimeLine,
    Swot,
    Pest,
    FiveWhys,
    FiveWOneH,
    AsisTobe
  },
  data() {
    return {
      title: "",
      dialogOpened: false,
      isEdit: false
    };
  },
  mounted() {
    if (!this.workspaceId) {
      alert("문제가 발생하였습니다.");
      this.movePage("/ProjectList");
    }

    this.setTool(this.$route.query.type);

    if (this.$route.query.edit) {
      this.isEdit = true;
      this.getData();
    }
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    setTool(type) {
      const tool = {
        first: type.split("-")[0],
        second: type.split("-")[1]
      };

      switch (tool.first) {
        case "1":
          switch (tool.second) {
            case "1":
              this.title = "SWOT";
              break;
            case "2":
              this.title = "브레인 스토밍";
              break;
            case "3":
              this.title = "PEST 분석";
              break;
          }
          break;
        case "2":
          switch (tool.second) {
            case "1":
              this.title = "5Whys";
              break;
            case "2":
              this.title = "원인 결과 도표";
              break;
            case "3":
              this.title = "파레토 차트";
              break;
          }
          break;
        case "3":
          switch (tool.second) {
            case "1":
              this.title = "Logic Tree";
              break;
            case "2":
              this.title = "육하원칙";
              break;
          }
          break;
        case "4":
          this.title = "아이디어 도출";
          break;
        case "5":
          switch (tool.second) {
            case "1":
              this.title = "ASIS-TOBE";
              break;
            case "2":
              this.title = "Time Line";
              break;
            case "3":
              this.title = "축약해서 설명하기";
              break;
          }
          break;
      }

      console.log(tool);
    },
    onClickBack() {
      this.dialogOpened = true;
    },
    onClickExit() {
      this.movePage("/Dashboard?id=" + this.workspaceId);
    },
    refineParams() {
      let toolData = {
        workSpaceId: this.workspaceId
      };
      const tool = {
        first: this.$route.query.type.split("-")[0],
        second: this.$route.query.type.split("-")[1]
      };

      switch (tool.first) {
        case "1":
          switch (tool.second) {
            case "1":
              toolData.toolName = "SWOT";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "swot").swot
              );
              break;
            case "3":
              toolData.toolName = "PEST";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "pest").pest
              );
              break;
          }
          break;
        case "2":
          switch (tool.second) {
            case "1":
              toolData.toolName = "FiveWhys";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "fiveWhys").fiveWhys
              );
              break;
            case "3":
              toolData.toolName = "ParetoChart";
              toolData.contents = JSON.stringify({
                data: this.$children.find(v => v.vueName == "paretoChart").data,
                scaleOption: this.$children.find(
                  v => v.vueName == "paretoChart"
                ).scaleOption
              });
              break;
          }
          break;
        case "3":
          switch (tool.second) {
            case "1":
              toolData.toolName = "LogicTree";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "logicTree").logicTree
              );
              break;
            case "2":
              toolData.toolName = "FiveWOneH";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "fiveWOneH").fiveWOneH
              );
              break;
          }
          break;
        case "5":
          switch (tool.second) {
            case "1":
              toolData.toolName = "AsisTobe";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "asisTobe").asisTobe
              );
              break;
            case "2":
              toolData.toolName = "TimeLine";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "timeLine").timeLine
              );
              break;
          }
          break;
      }

      return toolData;
    },
    onClickSave() {
      let toolData = this.refineParams();

      let vue = this;

      this.$store.dispatch(T.ADD_TOOL, {
        token: localStorage.getItem("token"),
        workspaceId: this.workspaceId,
        toolData,
        cb: () => {
          alert("도구가 작성되었습니다.");
          vue.movePage("/Dashboard?id=" + this.workspaceId);
        },
        cErr: err => {
          alert("오류가 발생하였습니다.");
          vue.movePage("/Dashboard?id=" + this.workspaceId);
        }
      });
    },
    onClickEdit() {
      let toolData = this.refineParams();

      let vue = this;

      this.$store.dispatch(T.EDIT_TOOL, {
        token: localStorage.getItem("token"),
        workspaceId: this.workspaceId,
        toolData,
        toolId: this.$route.query.id,
        cb: () => {
          alert("도구가 수정되었습니다.");
          vue.movePage("/Dashboard?id=" + this.workspaceId);
        },
        cErr: err => {
          alert("오류가 발생하였습니다.");
          vue.movePage("/Dashboard?id=" + this.workspaceId);
        }
      });
    },
    getData() {
      let vue = this;
      this.$store.dispatch(T.GET_TOOLS, {
        token: localStorage.getItem("token"),
        workspaceId: this.workspaceId,
        toolId: this.$route.query.id,
        cb: res => {
          const tool = {
            first: vue.$route.query.type.split("-")[0],
            second: vue.$route.query.type.split("-")[1]
          };

          switch (tool.first) {
            case "1":
              switch (tool.second) {
                case "1":
                  vue.$children.find(v => v.vueName == "swot").swot = res;
                  break;
                case "3":
                  vue.$children.find(v => v.vueName == "pest").pest = res;
                  break;
              }
              break;
            case "2":
              switch (tool.second) {
                case "1":
                  vue.$children.find(
                    v => v.vueName == "fiveWhys"
                  ).fiveWhys = res;
                  break;
                case "3":
                  vue.$children.find(v => v.vueName == "paretoChart").data =
                    res.data;
                  vue.$children.find(
                    v => v.vueName == "paretoChart"
                  ).scaleOption = res.scaleOption;
                  vue.$children
                    .find(v => v.vueName == "paretoChart")
                    .getTable();
                  vue.$children
                    .find(v => v.vueName == "paretoChart")
                    .generateParetoChart(res.data);
                  break;
              }
              break;
            case "3":
              switch (tool.second) {
                case "1":
                  vue.$children.find(
                    v => v.vueName == "logicTree"
                  ).logicTree = res;
                  vue.$children.find(v => v.vueName == "logicTree").drawLine();

                  break;
                case "2":
                  vue.$children.find(
                    v => v.vueName == "fiveWOneH"
                  ).fiveWOneH = res;
                  break;
              }
              break;
            case "5":
              switch (tool.second) {
                case "1":
                  vue.$children.find(
                    v => v.vueName == "asisTobe"
                  ).asisTobe = res;
                  break;
                case "2":
                  vue.$children.find(
                    v => v.vueName == "timeLine"
                  ).timeLine = res;
                  vue.$children.find(v => v.vueName == "timeLine").setLine();
                  break;
              }
              break;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.create-tools {
  &__title {
    display: flex;
    span {
      font-size: 26px;
      font-weight: bold;
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #bababa;
    button {
      margin-left: 10px;
    }
  }

  &__contents {
    padding: 20px;
    .tool {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
