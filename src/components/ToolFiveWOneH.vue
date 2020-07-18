<template>
  <div class="five-w-one-h">
    <div v-for="(item, index) in fiveWOneH" :key="index" class="five-w-one-h__line">
      <div class="five-w-one-h__label">
        <span>{{item.label}}</span>
      </div>
      <div class="five-w-one-h__form">
        <q-input filled v-model="fiveWOneH[index].input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vueName: "fiveWOneH",
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
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
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
</style>