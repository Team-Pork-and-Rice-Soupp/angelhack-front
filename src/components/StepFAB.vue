<template>
  <div class="step-div">
    <div class="step-div__title">
      <q-fab
        :color="stepData.locked ? 'grey' : 'blue'"
        icon="keyboard_arrow_down"
        direction="down"
        :disable="stepData.locked"
        ref="fab"
        @show="showFAB()"
      >
        <q-fab-action
          external-label
          color="primary"
          @click="addStep(title)"
          icon="add"
          label="추가하기"
        />

        <q-fab-action
          v-for="(item, index) in stepData.writed"
          :key="index"
          external-label
          color="primary"
          @click="item.click"
          icon="article"
          :label="item.label"
        />
      </q-fab>
      <span class="title">{{title}}</span>
    </div>
    <span class="contents">{{description}}</span>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "stepData", "addStep"],
  methods: {
    onClick() {
      console.log("click");
    },
    hideFAB() {
      this.$refs.fab.hide();
    },
    showFAB() {
      this.$parent.$parent.toggleFAB(this.title);
    }
  }
};
</script>

<style lang="scss" scoped>
.step-div {
  padding: 0 10px;
  min-width: 150px;
  &__title {
    display: flex;
    align-items: center;
    .q-fab {
      width: 56px;
      height: 56px;
    }

    .title {
      margin-left: 10px;
      height: fit-content;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .contents {
    margin-left: 66px;
  }
}
</style>