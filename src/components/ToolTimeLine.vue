<template>
  <div class="time-line">
    <div class="time-line__buttons">
      <q-btn label="생성" @click="dialogOpened = true" />
    </div>
    <div class="time-line__contents" ref="contents">
      <div
        class="time-line-node"
        v-for="(node, index) in timeLine"
        :key="index"
        :style="'width:' + (100/timeLine.length) + '%'"
      >
        <div>
          <q-card>
            <span>{{node.description}}</span>
            <q-btn label="삭제" flat size="11px" color="red" @click="onClickDelete(timeLine, index)" />
          </q-card>
        </div>
        <div>{{node.time}}</div>
      </div>

      <svg>
        <line
          :x1="item.x1"
          :y1="item.y1"
          :x2="item.x2"
          :y2="item.y2"
          stroke="black"
          v-for="(item, index) in svgList"
          :key="index"
        />
      </svg>
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened" @hide="hideDialog">
      <div class="time-line-dialog">
        <div class="time-line-dialog__contents">
          <q-input filled label="시간 or 단계" v-model="timeInput" />
          <q-input filled label="내용" v-model="descriptionInput" />
        </div>
        <div class="time-line-dialog__buttons">
          <q-btn label="취소" flat v-close-popup />
          <q-btn label="확인" flat @click="onClickAddData" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vueName: "timeLine",
      dialogOpened: false,
      timeInput: "",
      descriptionInput: "",
      timeLine: [],
      svgList: []
    };
  },
  mounted() {
    this.setLine();
  },
  methods: {
    hideDialog() {
      this.timeInput = "";
      this.descriptionInput = "";
    },
    onClickAddData() {
      if (this.timeInput == "") {
        alert("시간 or 단계를 입력하세요.");
      } else if (this.descriptionInput == "") {
        alert("내용을 입력하세요.");
      } else {
        this.timeLine.push({
          time: this.timeInput,
          description: this.descriptionInput
        });

        this.setLine();
        this.dialogOpened = false;
      }
    },
    onClickDelete(arr, index) {
      arr.splice(index, 1);
      this.setLine();
    },
    setLine() {
      let halfHeight = this.$refs.contents.getBoundingClientRect().height / 2;
      let width = this.$refs.contents.getBoundingClientRect().width;
      this.svgList = [];

      this.svgList.push({
        x1: 0,
        y1: halfHeight,
        x2: width,
        y2: halfHeight
      });

      this.timeLine.forEach((el, index) => {
        let y = 80;
        let num = width / this.timeLine.length;
        if (index % 2 != 0) {
          y = halfHeight * 2 - 80;
        }

        this.svgList.push({
          x1: num * (index + 1) - num / 2,
          y1: y,
          x2: num * (index + 1) - num / 2,
          y2: halfHeight
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.time-line {
  &__contents {
    height: 50vh;
    display: flex;
    justify-content: space-around;
    position: relative;

    .time-line-node {
      height: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 18px;
        .q-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6px 10px;
          width: fit-content;
          span {
            font-size: 16px;
            margin-bottom: 6px;
          }
        }
      }
    }

    .time-line-node:nth-child(2n) {
      align-self: flex-end;
      flex-direction: column-reverse;
    }

    svg {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
    }
  }
}
</style>

<style lang="scss">
.time-line-dialog {
  background-color: white;

  &__contents {
    padding: 10px;
    label {
      margin-bottom: 10px;
    }
  }

  &__buttons {
    button {
      width: 50%;
    }
  }
}
</style>