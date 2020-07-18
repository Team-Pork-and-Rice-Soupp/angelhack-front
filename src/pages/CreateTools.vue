<template>
  <div class="create-tools">
    <div class="create-tools__title">
      <span>{{title}}</span>
    </div>
    <div class="create-tools__buttons">
      <q-btn label="나가기" @click="onClickBack" />
      <q-btn label="저장하기" @click="onClickSave" />
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
      dialogOpened: false
    };
  },
  mounted() {
    if (!this.workspaceId) {
      alert("문제가 발생하였습니다.");
      this.movePage("/ProjectList");
    }

    this.setTool(this.$route.query.type);
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
    onClickSave() {
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
              toolData.toolName = "swot";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "swot").swot
              );
              break;
            case "3":
              toolData.toolName = "pest";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "pest").pest
              );
              break;
          }
          break;
        case "2":
          switch (tool.second) {
            case "1":
              toolData.toolName = "fiveWhys";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "fiveWhys").fiveWhys
              );
              break;
            case "3":
              toolData.toolName = "paretoChart";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "paretoChart").data
              );
              break;
          }
          break;
        case "3":
          switch (tool.second) {
            case "1":
              toolData.toolName = "logicTree";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "logicTree").logicTree
              );
              break;
            case "2":
              toolData.toolName = "fiveWOneH";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "fiveWOneH").fiveWOneH
              );
              break;
          }
          break;
        case "4":
          toolData.toolName = "thinkIdea";
          toolData.contents = JSON.stringify();
          break;
        case "5":
          switch (tool.second) {
            case "1":
              toolData.toolName = "asisTobe";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "asisTobe").asisTobe
              );
              break;
            case "2":
              toolData.toolName = "timeLine";
              toolData.contents = JSON.stringify(
                this.$children.find(v => v.vueName == "timeLine").timeLine
              );
              break;
          }
          break;
      }

      this.$store.dispatch(T.ADD_TOOL, {
        token: localStorage.getItem("token"),
        workspaceId: this.workspaceId,
        toolData,
        cb: res => {
          console.log(res);
        },
        cErr: err => {
          console.log(err);
        }
      });

      console.log(toolData);
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
