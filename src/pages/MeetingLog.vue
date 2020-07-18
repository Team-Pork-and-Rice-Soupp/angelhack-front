<template :key="refresh">
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
        <div v-if="currentLog" class="log-description">
          <div style="display: flex; justify-content: space-between;">
            <h3>{{ currentLog.title }}</h3>
            <div style="display: flex;">
              <q-btn label="회의록 수정" flat color="warning" @click="editLog(currentLog)" size="15px" />
              <q-btn label="회의록 삭제" flat color="negative" @click="deleteLog(currentLog)" size="15px" />
            </div>
          </div>
          
          <div v-html="currentLog.content"></div>
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
  computed: {
    ...mapGetters({
      workspaceId: "getWorkspaceId"
    })
  },
  mounted() {
    //workspaceId, token, cb, cErr
    this.$store.dispatch(T.GET_MEETINGLOG, {
      workspaceId: this.workspaceId,
      token: localStorage.getItem("token"),
      cb: result => {
        result.forEach(log => {
          this.meetinglogs.push({
            title: log.title,
            content: log.content,
            timestamp: log.timestamp,
            id: log.id
          });
        });
        console.log("result! >> ", result);
        console.log("this.meetinglogs >> ", this.meetinglogs);
      },
      cErr: result => {
        alert("회의록을 불러오던 중 오류가 발생했습니다.");
        console.log(result);
      }
    });
  },
  data() {
    return {
      tab: "mails",
      splitterModel: 20,
      meetinglogs: [],
      currentLog: null,
      refresh: 1
    };
  },
  methods: {
    deleteLog(log) {
      console.log("this log >> ", log);
      console.log("param's workspaceId >> ", this.workspaceId);
      let result = confirm("이 회의록을 삭제하시겠습니까?(삭제 후엔 돌이킬 수 없습니다)");
      if(result) {
        this.$store.dispatch(T.DELETE_MEETINGLOG, {
          workspaceId: this.workspaceId,
          token: localStorage.getItem("token"),
          logId: log.id,
          cb: result => {
            let index = this.meetinglogs.findIndex(el => el.id == log.id);
            this.meetinglogs.splice(index, 1);
            this.currentLog = null;
            alert("회의록이 삭제되었습니다.");            
          },
          cErr: result => {
            alert("회의록을 삭제하던 중 오류가 발생했습니다.");
            console.log(result);
          }
        });
      }
    },
    editLog(log) {
      this.$router.push({
        name: "EditMeetingLog",
        params: { 
          title: log.title,
          content: log.content,
          id: log.id,
          editing: true
        }
      });
    },
    onclickLog(meetinglog) {
      this.currentLog = meetinglog;
      console.log("this log >> ", meetinglog);
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