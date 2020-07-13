<template>
  <div class="mylayout">
    <div class="mylayout__top" :class="topStyle">
      <div class="title">Title</div>
      <div>Moon Juhan</div>
    </div>

    <div class="mylayout__contents">
      <router-view></router-view>
    </div>

    <div class="mylayout__overlay" v-if="loading">
      <q-spinner color="white" size="5em" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters({
      topStyle: "getTopStyle"
    })
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>

<style lang="scss">
html {
  width: 100vw;
  height: 100vh;
  #q-app {
    height: 100vh;
    .mylayout {
      height: 100%;
      display: flex;
      flex-direction: column;
      &__top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #bababa;
        padding: 10px 15px;

        .title {
          font-size: 16px;
          font-weight: bold;
        }
      }

      .none {
        display: none;
      }

      &__contents {
        padding: 10px 15px;
        height: 100%;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #5c656bcc;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
