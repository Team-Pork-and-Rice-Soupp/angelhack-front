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
      <div v-if="title == 'SWOT'" class="swot tool">
        <div class="swot-line">
          <div class="swot-cell swot-cell__left"></div>
          <div class="swot-cell">Helpful</div>
          <div class="swot-cell">Harmful</div>
        </div>
        <div class="swot-line">
          <div class="swot-cell swot-cell__left">Internal</div>
          <div class="swot-cell swot-cell__form">
            <span class="swot-cell__title">Strengths</span>
            <div class="swot-input" v-for="(item, index) in swot.data[0]" :key="index">
              <q-input filled v-model="item.input" />
              <q-btn v-if="index != 0" label="delete" @click="onClickDelSwot(swot.data[0], index)" />
            </div>
            <q-btn label="Plus" @click="onClickPlusSwot(0)" />
          </div>
          <div class="swot-cell swot-cell__form">
            <span class="swot-cell__title">Weaknesses</span>
            <div class="swot-input" v-for="(item, index) in swot.data[1]" :key="index">
              <q-input filled v-model="item.input" />
              <q-btn v-if="index != 0" label="delete" @click="onClickDelSwot(swot.data[1], index)" />
            </div>
            <q-btn label="Plus" @click="onClickPlusSwot(1)" />
          </div>
        </div>
        <div class="swot-line">
          <div class="swot-cell swot-cell__left">External</div>
          <div class="swot-cell swot-cell__form">
            <span class="swot-cell__title">Opportunities</span>
            <div class="swot-input" v-for="(item, index) in swot.data[2]" :key="index">
              <q-input filled v-model="item.input" />
              <q-btn v-if="index != 0" label="delete" @click="onClickDelSwot(swot.data[2], index)" />
            </div>
            <q-btn label="Plus" @click="onClickPlusSwot(2)" />
          </div>
          <div class="swot-cell swot-cell__form">
            <span class="swot-cell__title">Threats</span>
            <div class="swot-input" v-for="(item, index) in swot.data[3]" :key="index">
              <q-input filled v-model="item.input" />
              <q-btn v-if="index != 0" label="delete" @click="onClickDelSwot(swot.data[3], index)" />
            </div>
            <q-btn label="Plus" @click="onClickPlusSwot(3)" />
          </div>
        </div>
      </div>
      <div v-else-if="title == '브레인 스토밍'">
        <span>개발중 입니다.</span>
      </div>
      <!-- 1-3 PEST -->
      <div v-else-if="title == 'PEST 분석'" class="pest tool">
        <div v-for="(item, index) in pest" :key="index" class="pest__line">
          <div class="pest__label">
            <span>{{item.label}}</span>
          </div>
          <div class="pest__form">
            <div class="pest-input" v-for="(data, index) in item.data" :key="index">
              <q-input filled v-model="data.input" />
              <q-btn v-if="index != 0" label="delete" @click="onClickDelSwot(item.data, index)" />
            </div>
            <q-btn label="Plus" @click="onClickPlusPest(item)" />
          </div>
        </div>
      </div>
      <!-- 2-1 5Whys -->
      <div v-else-if="title == '5Whys'" class="five-whys tool">
        <div class="five-whys__line" v-for="(item, index) in fiveWhys" :key="index">
          <div class="five-whys__title">
            <q-icon v-if="index != 0" name="subdirectory_arrow_right" />
            {{index == 0 ? 'Problems' : 'Whys?'}}
          </div>
          <div class="five-whys__form">
            <q-input filled :v-model="item" />
          </div>
          <hr />
        </div>
      </div>
      <div v-else-if="title == '원인 결과 도표'">
        <span>개발중 입니다.</span>
      </div>
      <div v-else-if="title == '파레토 차트'">
        <pareto-chart></pareto-chart>
      </div>
      <!-- 3-1 Logic Tree -->
      <div v-else-if="title == 'Logic Tree'">
        <logic-tree />
      </div>
      <!-- 3-2 육하원칙 -->
      <div v-else-if="title == '육하원칙'" class="five-w-one-h">
        <div v-for="(item, index) in fiveWOneH" :key="index" class="five-w-one-h__line">
          <div class="five-w-one-h__label">
            <span>{{item.label}}</span>
          </div>
          <div class="five-w-one-h__form">
            <q-input filled :v-model="item.input" />
          </div>
        </div>
      </div>
      <div v-else-if="title == '아이디어 도출'">
        <span>개발중 입니다.</span>
      </div>
      <div v-else-if="title == 'ASIS-TOBE'" class="asis-tobe">
        <div class="asis-tobe__card">
          <div class="card-title">
            <span>AS IS</span>
          </div>
          <div class="card-contents">
            <div class="card-contents__input">
              <q-input filled v-model="asisTobe.asisInput" />
              <q-btn
                label="입력"
                @click="onClickAsisTobe(asisTobe.asisList, asisTobe.asisInput, 'asisInput')"
              />
            </div>
            <div v-for="(item, index) in asisTobe.asisList" :key="index">
              <span>{{item}}</span>
              <q-btn label="삭제" @click="onClickDeleteAT(asisTobe.asisList, index)" />
            </div>
          </div>
        </div>
        <div class="asis-tobe__keyword">
          <div class="card-title">
            <q-icon name="trending_flat" style="font-size: 32px;" />
            <span>Keyword</span>
            <q-icon name="trending_flat" style="font-size: 32px;" />
          </div>
          <div class="card-contents">
            <div class="card-contents__input">
              <q-input filled v-model="asisTobe.keywordInput" />
              <q-btn
                label="입력"
                @click="onClickAsisTobe(asisTobe.keywordList, asisTobe.keywordInput, 'keywordInput')"
              />
            </div>
            <div v-for="(item, index) in asisTobe.keywordList" :key="index">
              <span>{{item}}</span>
              <q-btn label="삭제" @click="onClickDeleteAT(asisTobe.keywordList, index)" />
            </div>
          </div>
        </div>
        <div class="asis-tobe__card">
          <div class="card-title">
            <span>TO BE</span>
          </div>
          <div class="card-contents">
            <div class="card-contents__input">
              <q-input filled v-model="asisTobe.tobeInput" />
              <q-btn
                label="입력"
                @click="onClickAsisTobe(asisTobe.tobeList, asisTobe.tobeInput, 'tobeInput')"
              />
            </div>
            <div v-for="(item, index) in asisTobe.tobeList" :key="index">
              <span>{{item}}</span>
              <q-btn label="삭제" @click="onClickDeleteAT(asisTobe.tobeList, index)" />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="title == 'Time Line'">
        <time-line></time-line>
      </div>
      <div v-else-if="title == '축약해서 설명하기'">
        <span>개발중 입니다.</span>
      </div>
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
    TimeLine
  },
  data() {
    return {
      title: "",
      dialogOpened: false,
      swot: {
        data: [
          [
            {
              input: ""
            }
          ],
          [
            {
              input: ""
            }
          ],
          [
            {
              input: ""
            }
          ],
          [
            {
              input: ""
            }
          ]
        ]
      },
      pest: [
        {
          label: "Political",
          data: [
            {
              input: ""
            }
          ]
        },
        {
          label: "Economic",
          data: [
            {
              input: ""
            }
          ]
        },
        {
          label: "Social",
          data: [
            {
              input: ""
            }
          ]
        },
        {
          label: "Technological",
          data: [
            {
              input: ""
            }
          ]
        }
      ],
      fiveWhys: ["", "", "", "", "", ""],
      fiveWOneH: [
        {
          label: "Who",
          input: ""
        },
        {
          label: "What",
          input: ""
        },
        {
          label: "Where",
          input: ""
        },
        {
          label: "When",
          input: ""
        },
        {
          label: "How",
          input: ""
        },
        {
          label: "Why",
          input: ""
        }
      ],
      asisTobe: {
        asisInput: "",
        asisList: [],
        tobeInput: "",
        tobeList: [],
        keywordInput: "",
        keywordList: []
      }
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
              toolData.contents = JSON.stringify(this.swot);
              break;
            case "3":
              toolData.toolName = "pest";
              toolData.contents = JSON.stringify(this.pest);
              break;
          }
          break;
        case "2":
          switch (tool.second) {
            case "1":
              toolData.toolName = "fiveWhys";
              toolData.contents = JSON.stringify(this.fiveWhys);
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
              toolData.contents = JSON.stringify(this.fiveWOneH);
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
              toolData.contents = JSON.stringify(this.asisTobe);
              break;
            case "2":
              toolData.toolName = "timeLine";
              toolData.contents = JSON.stringify();
              break;
          }
          break;
      }

      console.log(toolData);
    },
    onClickPlusSwot(type) {
      let preData = this.swot.data[type][this.swot.data[type].length - 1];
      if (preData) {
        if (preData.input != "") {
          this.swot.data[type].push({ input: "" });
        } else {
          alert("이전 입력 폼에 데이터를 입력하세요.");
        }
      } else {
        this.swot.data[type].push({ input: "" });
      }
    },
    onClickDelSwot(arr, index) {
      arr.splice(index, 1);
    },
    onClickPlusPest(pest) {
      console.log(pest, pest.data[0]);

      let preData = pest.data[pest.data.length - 1];
      console.log(preData);
      if (preData) {
        if (preData.input == "") {
          alert("이전 입력 폼에 데이터를 입력하세요.");
        } else {
          pest.data.push({ input: "" });
        }
      } else {
        pest.data.push({ input: "" });
      }
    },
    onClickAsisTobe(list, item, key) {
      list.push(item);
      this.asisTobe[key] = "";
    },
    onClickDeleteAT(list, index) {
      list.splice(index, 1);
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

    .swot {
      &-line {
        display: flex;
        width: 100%;
        justify-content: center;
      }
      &-cell {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        width: 30%;
        &__left {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &__form {
          align-items: flex-start;
          .swot-input {
            display: flex;
            margin-bottom: 10px;
            label {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .pest {
      &__line {
        display: flex;
        justify-content: space-between;
        width: 60%;
        border-bottom: 1px solid black;
        margin-bottom: 10px;
        padding-bottom: 10px;
      }

      &__line:nth-child(4) {
        border-bottom: 0;
      }

      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
      }

      &__form {
        width: 70%;
        .pest-input {
          margin-bottom: 10px;
          display: flex;
          justify-content: flex-start;

          label {
            width: 60%;
            margin-right: 10px;
          }
        }
      }
    }

    .five-whys {
      &__line {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin-bottom: 15px;
        align-items: center;
      }

      &__title {
        width: 30%;
      }

      &__form {
        width: 70%;
      }

      hr {
        width: 100%;
        margin: 15px 0 0;
      }
    }

    .five-w-one-h {
      &__line {
        display: flex;
        margin-bottom: 10px;
      }

      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        span {
          font-size: 18px;
        }
      }

      &__form {
        width: 80%;
      }
    }

    .asis-tobe {
      display: flex;
      &__card,
      &__keyword {
        width: 30%;

        .card-title {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          span {
            font-size: 16px;
            font-weight: bold;
          }
          i {
            margin: 0 40px;
          }
        }

        .card-contents {
          div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #babaab;
            margin-bottom: 10px;
            padding-bottom: 10px;
            label,
            span {
              width: 68%;
            }
            button {
              width: 30%;
              height: 100%;
            }
          }

          &__input {
            border-bottom: 1px solid black !important;
          }
        }
      }
      &__keyword {
        padding: 20px;
        width: 40%;
      }
    }
  }
}
</style>
