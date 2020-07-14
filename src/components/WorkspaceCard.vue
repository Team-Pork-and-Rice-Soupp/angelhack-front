<template>
  <q-card @click="clickAction" class="workspace-card">
    <div v-if="!addButton" class="workspace-card__contents">
      <q-card-section>
        <h1>
          <slot name="card-title"></slot>
        </h1>
      </q-card-section>

      <q-card-section>
        <p>
          <slot name="card-description"></slot>
        </p>
      </q-card-section>
    </div>

    <div v-if="addButton === true" class="workspace-card__contents">
      <q-card-section>
        <div class="add-card">
          <slot name="add-card"></slot>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "workspace-card",
  props: ["workspaceId", "addButton"],
  data() {
    return {};
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    clickAction() {
      if (this.addButton) {
        this.$router.push("/AddProject");
      } else {
        this.movePage("/Dashboard?id=" + this.workspaceId);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.workspace-card {
  // width: 100%;
  // height: 100%;
  // max-width: 250px;
  // max-height: 250px;
  width: 250px;
  height: 250px;
  margin: 25px;
  background-color: #aae0ff;
  color: white;
  display: flex;
  &:hover {
    cursor: pointer;
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  p {
    font-size: 10px;
  }
  .add-card {
    font-size: 60px;
    font-weight: bold;
    text-align: center;
  }
  &__contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>