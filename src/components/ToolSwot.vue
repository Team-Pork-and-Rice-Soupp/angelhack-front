<template>
  <div class="swot">
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
</template>

<script>
export default {
  data() {
    return {
      vueName: "swot",
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
      }
    };
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>