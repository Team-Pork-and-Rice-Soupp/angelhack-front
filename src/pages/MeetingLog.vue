<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 90vh;">
      <template v-slot:before>
        <!-- <q-tabs v-model="tab" vertical class="text-black">
          <q-tab v-for="(meetinglog, index) in meetinglogs" :key="index" :name="meetinglog.title" :label="meetinglog.title" />
        </q-tabs>-->
        <q-btn
          v-for="(meetinglog, index) in meetinglogs"
          :key="index"
          :label="meetinglog.title"
          flat
          class="log-title"
          @click="onclickLog(meetinglog)"
        />
      </template>

      <template v-slot:after>
        <!-- <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel v-for="(meetinglog, index) in meetinglogs" :key="index" :name="meetinglog.title">
            <div class="text-h4 q-mb-md">{{ meetinglog.title }}</div>
            <div v-html="meetinglog.log"></div>
          </q-tab-panel>

        </q-tab-panels>-->
        <div v-if="currentLog" class="log-description">
          <div class="text-h4 q-mb-md">{{ currentLog.title }}</div>
          <div v-html="currentLog.log"></div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";

export default {
  name: "meeting-log",
  data() {
    return {
      tab: "mails",
      splitterModel: 20,
      meetinglogs: [],
      currentLog: null
    };
  },
  computed: {
    ...mapGetters({
      workspaceId: "getWorkspaceId"
    })
  },
  mounted() {
    this.getMeetingLogs();
  },
  methods: {
    onclickLog(meetinglog) {
      this.currentLog = meetinglog;
    },
    getMeetingLogs() {
      let vue = this;
      console.log(localStorage.getItem("token"));
      this.$store.dispatch(T.GET_MEETINGLOG, {
        workspaceId: this.workspaceId,
        token: localStorage.getItem("token"),
        cb: res => {
          console.log(res);
          res.forEach(log => {
            vue.meetinglogs.push({
              title: log.title,
              log: log.content
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.log-title {
  display: block;
  width: 100%;
}
.log-description {
  padding: 20px;
}
</style>