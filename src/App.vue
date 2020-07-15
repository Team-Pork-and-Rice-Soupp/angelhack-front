<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.meeting-log {
  &__dialog {
    width: 1500px;
    .card-container {
      display: flex;
      justify-content: space-between;
      &__card {
        width: 400px;
        height: 400px;
        padding: 20px;
        transition: all 200ms ease;
        &:hover {
          filter: brightness(95%);
          cursor: pointer;
        }
      }
      &__foot {
        display: flex;
        justify-content: space-between;
      }
    }
    span {
      font-size: 20px;
    }
  }
}
</style>