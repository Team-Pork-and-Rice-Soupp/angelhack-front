<template>
  <div class="five-whys">
    <div class="five-whys__line" v-for="(item, index) in fiveWhys" :key="index">
      <div class="five-whys__title">
        <q-icon v-if="index != 0" name="subdirectory_arrow_right" />
        {{index == 0 ? 'Problems' : 'Whys?'}}
      </div>
      <div class="five-whys__form">
        <q-input filled v-model="fiveWhys[index]" />
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vueName: "fiveWhys",
      fiveWhys: ["", "", "", "", "", ""]
    };
  }
};
</script>

<style lang="scss" scoped>
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
</style>