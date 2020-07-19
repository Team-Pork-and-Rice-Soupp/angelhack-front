<template>
  <div class="add-meeting-log">
    <div class="title-and-button">
      <q-input
        filled
        v-model="title"
        label="제목"
        :rules="[val => !!val || '회의록 제목을 입력해주세요.']"
        class="title"
      />
      <q-btn
        label="템플릿 변경"
        @click="templateChoice = true"
        flat
        color="negative"
        style="font-size: 20px; justify-content: flex-end;"
      />
    </div>

    <div id="summernote"></div>

    <div style="display: flex;">
      <q-btn label="저장" color="primary" flat @click="onclickSave" />
    </div>

    <!-- 템플릿 선택 dialog -->
    <q-dialog v-model="templateChoice">
      <q-card class="meeting-log__dialog" style="max-width: 100vw;">
        <q-card-section horizontal class="card-container">
          <q-card-section>
            <q-card class="card-container__card" @click="onclickTemplate(templates.template1)">
              <div v-html="templates.template1"></div>
            </q-card>
          </q-card-section>

          <q-card-section>
            <q-card class="card-container__card" @click="onclickTemplate(templates.template2)">
              <div v-html="templates.template2"></div>
            </q-card>
          </q-card-section>

          <q-card-section>
            <q-card class="card-container__card" @click="onclickTemplate(templates.template3)">
              <div v-html="templates.template3"></div>
            </q-card>
          </q-card-section>
        </q-card-section>

        <q-card-section class="card-container__foot">
          <span>회의록 템플릿을 선택하세요.</span>
          <q-btn label="템플릿 없이 시작하기" color="dark" flat @click="onclickTemplate(null)" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 진짜 템플릿 바꿀꺼야? 묻는 dialog -->
    <q-dialog v-model="templateChangeConfirm" persistent>
      <q-card>
        <q-card-section>
          <h4>템플릿 변경</h4>
        </q-card-section>

        <q-card-section class="row items-center">
          <span class="q-ml-sm">템플릿을 변경하면 이전에 작성중인 내용을 모두 잃게됩니다! 그래도 변경하시겠습니까?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="확인" color="negative" @click="selectTemplate" />
          <q-btn flat label="취소" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";

export default {
  name: "add-meeting-log",
  data() {
    return {
      title: "",
      editerExists: false,
      templateChoice: false,
      templateChangeConfirm: false,
      templates: {
        template1: `<p>회의록 제목:</p><p>날짜:</p><p>참여인원:</p>`,
        template2: `<p><b>템플릿2</b><br></p><p style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"><u>와 더멋지다!</u></p><ol><li style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;">우와</li></ol>`,
        template3: "<p>템플릿 3</p>"
      },
      selectedTemplate: "",
      data: ""
    };
  },
  computed: {
    ...mapGetters({
      workspaceId: "getWorkspaceId"
    })
  },
  mounted() {
    this.initSummernote();
    this.selectedTemplate = this.$route.params.template;
    this.selectTemplate();
  },
  methods: {
    onclickSave() {
      console.log(this.data);
      let vue = this;
      this.$store.dispatch(T.ADD_MEETINGLOG, {
        workspaceId: this.workspaceId,
        meeting: {
          title: this.title,
          content: this.data
        },
        token: localStorage.getItem("token"),
        cb: () =>{
          alert("회의록이 작성되었습니다.")
          vue.$router.push("/Dashboard?id=" + vue.workspaceId);
        }
      });
    },
    initSummernote() {
      let vue = this;
      $("#summernote").summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true, // set focus to editable area after initializing summernote
        callbacks: {
          onChange: (contents, $editable) => {
            vue.data = contents;
          }
        }
      });
      this.editerExists = true;
    },
    onclickTemplate(template) {
      this.selectedTemplate = template;
      this.templateChangeConfirm = true;
    },
    selectTemplate() {
      if (!this.editerExists) {
        this.initSummernote();
      }
      $("#summernote").summernote("code", this.selectedTemplate);
      this.templateChangeConfirm = false;
      this.templateChoice = false;
    }
  }
};
</script>



<style lang="scss" scoped>
.add-meeting-log {
  .title-and-button {
    display: flex;
    justify-content: space-between;
    .title {
      width: 500px;
    }
  }
}
</style>