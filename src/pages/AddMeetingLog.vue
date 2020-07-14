<template>
  <div class="meeting-log">
    <q-input v-model="title" label="제목" :rules="[val => !!val || '회의록 제목을 입력해주세요.']"/>
    <div id="summernote"></div>
    <q-btn label="템플릿 선택" @click="templateChoice = true" />

    <!-- 템플릿 선택 dialog -->
    <q-dialog v-model="templateChoice" persistent>
      <q-card class="meeting-log__dialog" style="max-width: 100vw;">
        <q-card-section horizontal class="card-container">
          <q-card-section>
            <q-card class="card-container__card" @click="selectTemplate(templates.template1)">
              <div v-html="templates.template1"></div>
            </q-card>
          </q-card-section>

          <q-card-section>
            <q-card class="card-container__card" @click="selectTemplate(templates.template2)">
              <div v-html="templates.template2"></div>
            </q-card>
          </q-card-section>

          <q-card-section>
            <q-card class="card-container__card" @click="selectTemplate(templates.template3)">
              <div v-html="templates.template3"></div>
            </q-card>
          </q-card-section>
        </q-card-section>

        <q-card-section class="card-container__foot">
          <span>회의록 템플릿을 선택하세요. (템플릿을 다시 설정하면 이전에 작성된 글은 저장되지 않고 지워집니다.)</span>
          <q-btn label="템플릿 없이 시작하기" color="dark" flat @click="closeDialog" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "add-meeting-log",
  data() {
    return {
      title: "",
      editerExists: false,
      templateChoice: true,
      templates: {
        template1: `<p>템플릿 1</p>
                    <p>입니다.</p>`,
        template2: `<p><b>템플릿2</b><br></p><p style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"><u>와 더멋지다!</u></p><ol><li style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;">우와</li></ol>`,
        template3: "<p>템플릿 3</p>"
      }
    };
  },
  methods: {
    initSummernote() {
      $("#summernote").summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
      });
      this.editerExists = true;
    },
    closeDialog() {
      if(!this.editerExists) {
        this.initSummernote();
      }
      this.templateChoice = false;
    },
    selectTemplate(template) {
      if(!this.editerExists) {
        this.initSummernote();
      }
      $("#summernote").summernote("code", template);
      this.templateChoice = false;
    }
  }
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
// .dialog-container {
//   width: 1000px;
// }
</style>

<style lang="scss" scoped>
</style>