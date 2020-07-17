<template>
  <div class="time-line">
    <div class="time-line__buttons">
      <q-btn label="생성" @click="dialogOpened = true" />
    </div>
    <div class="time-line__contents"></div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpened" @hide="hideDialog">
      <div class="time-line-dialog">
        <div>
          <q-input filled label="시간 or 단계" v-model="timeInput" />
          <q-input filled label="내용" v-model="descriptionInput" />
        </div>
        <div>
          <q-btn label="취소" v-close-popup />
          <q-btn label="확인" @click="onClickAddData" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogOpened: false,
      timeInput: "",
      descriptionInput: ""
    };
  },
  methods: {
    hideDialog() {
      this.timeInput = "";
      this.descriptionInput = "";
    },
    onClickAddData() {
      this.dialogOpened = false;
      console.log(this.timeInput, this.descriptionInput);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.time-line-dialog {
  background-color: white;
}
</style>