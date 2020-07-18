<template>
  <div class="pest">
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
</template>

<script>
export default {
  data() {
    return {
      vueName: "pest",
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
      ]
    };
  },
  methods: {
    onClickPlusPest(pest) {
      let preData = pest.data[pest.data.length - 1];
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
    onClickDelSwot(arr, index) {
      arr.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>