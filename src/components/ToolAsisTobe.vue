<template>
  <div class="asis-tobe">
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
</template>

<script>
export default {
  data() {
    return {
      vueName: "asisTobe",
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
  methods: {
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
</style>