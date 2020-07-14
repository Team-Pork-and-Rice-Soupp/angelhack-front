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
export default {
  name: "meeting-log",
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.meetinglogs.push({
        title: `회의록 2020 10 ${i + 1}`,
        log: "오늘 우리는 즐거운 회의를 했다."
      });
    }
    this.meetinglogs.push({
      title: "회의록 2000 01 01",
      log: `
    <div class="terms-of-use">
        <div
            class="OutlineElement Ltr BCX0 SCXW187722135"
            style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr; color: rgb(0, 0, 0); font-family: &quot;맑은 고딕&quot;, &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px;"
        >
            <p
                class="Paragraph SCXW187722135 BCX0"
                paraid="1410754432"
                paraeid="{0d104f39-25f1-4312-98fc-afed0ec0aaf3}{245}"
                style="margin-bottom: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline; background-color: transparent; color: rgb(0, 0, 0); text-align: justify;"
            >
                <span
                    data-contrast="none"
                    class="TextRun SCXW187722135 BCX0"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-weight: bold; font-size: 18pt; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif; font-kerning: none; line-height: 46.4px; font-variant-ligatures: none !important;"
                >
                    <span
                        class="NormalTextRun SCXW187722135 BCX0"
                        data-ccp-parastyle="바탕글"
                        style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-color: inherit;"
                    >
                        맨즈바이
                        이용약관
                    </span>
                </span>
                <span
                    class="EOP SCXW187722135 BCX0"
                    data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:0,&quot;335559731&quot;:0,&quot;335559737&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:384}"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 18pt; line-height: 46.4px; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif;"
                >&nbsp;</span>
            </p>
        </div>
        <div
            class="OutlineElement Ltr BCX0 SCXW187722135"
            style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr; color: rgb(0, 0, 0); font-family: &quot;맑은 고딕&quot;, &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px;"
        >
            <p
                class="Paragraph SCXW187722135 BCX0"
                paraid="1730831961"
                paraeid="{0d104f39-25f1-4312-98fc-afed0ec0aaf3}{252}"
                style="margin-bottom: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline; background-color: transparent; color: rgb(0, 0, 0); text-align: justify;"
            >
                <span
                    data-contrast="none"
                    class="TextRun SCXW187722135 BCX0"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 10pt; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif; font-kerning: none; line-height: 25.6px; font-variant-ligatures: none !important;"
                >
                    <span
                        class="NormalTextRun SCXW187722135 BCX0"
                        data-ccp-parastyle="바탕글"
                        style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-color: inherit;"
                    ></span>
                </span>
                <span
                    class="EOP SCXW187722135 BCX0"
                    data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:0,&quot;335559731&quot;:0,&quot;335559737&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:384}"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 10pt; line-height: 25.6px; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif;"
                >&nbsp;</span>
            </p>
        </div>
        <div
            class="OutlineElement Ltr BCX0 SCXW187722135"
            style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr; color: rgb(0, 0, 0); font-family: &quot;맑은 고딕&quot;, &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px;"
        >
            <p
                class="Paragraph SCXW187722135 BCX0"
                paraid="828110538"
                paraeid="{963feaaf-c7bc-4dac-be76-6e52fc4544de}{1}"
                style="margin-bottom: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline; background-color: transparent; color: rgb(0, 0, 0); text-align: justify;"
            >
                <span
                    data-contrast="none"
                    class="TextRun SCXW187722135 BCX0"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 11pt; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif; font-kerning: none; line-height: 28.8px; font-variant-ligatures: none !important;"
                >
                    <span
                        class="NormalTextRun SCXW187722135 BCX0"
                        data-ccp-parastyle="바탕글"
                        style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-color: inherit;"
                    >
                        1)
                        판매자 이용약관
                    </span>
                </span>
                <span
                    class="EOP SCXW187722135 BCX0"
                    data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:0,&quot;335559731&quot;:0,&quot;335559737&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:384}"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 11pt; line-height: 28.8px; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif;"
                >&nbsp;</span>
            </p>
        </div>
        <div
            class="OutlineElement Ltr BCX0 SCXW187722135"
            style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr; color: rgb(0, 0, 0); font-family: &quot;맑은 고딕&quot;, &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px;"
        >
            <p
                class="Paragraph SCXW187722135 BCX0"
                paraid="290218766"
                paraeid="{963feaaf-c7bc-4dac-be76-6e52fc4544de}{5}"
                style="margin-bottom: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; vertical-align: baseline; background-color: transparent; color: rgb(0, 0, 0); text-align: justify;"
            >
                <span
                    data-contrast="none"
                    class="TextRun SCXW187722135 BCX0"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 10pt; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif; font-kerning: none; line-height: 25.6px; font-variant-ligatures: none !important;"
                >
                    <span
                        class="NormalTextRun SCXW187722135 BCX0"
                        data-ccp-parastyle="바탕글"
                        style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-color: inherit;"
                    >
                        본
                        판매자 이용약관(이하 “본 약관”)은 맨즈바이
                    </span>
                </span>
                <span
                    data-contrast="none"
                    class="TextRun SCXW187722135 BCX0"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 10pt; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif; font-kerning: none; line-height: 25.6px; font-variant-ligatures: none !important;"
                >
                    <span
                        class="NormalTextRun SCXW187722135 BCX0"
                        data-ccp-parastyle="바탕글"
                        style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-color: inherit;"
                    >㈜</span>
                </span>
                <span
                    data-contrast="none"
                    class="TextRun SCXW187722135 BCX0"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 10pt; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif; font-kerning: none; line-height: 25.6px; font-variant-ligatures: none !important;"
                >
                    <span
                        class="NormalTextRun SCXW187722135 BCX0"
                        data-ccp-parastyle="바탕글"
                        style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-color: inherit;"
                    >
                        (이하
                        “회사”)가 제공하는 통신판매중개 서비스 이용에 대한 조건을 정하고 있으며, 서비스 이용자와 회사 간의 계약을 구성합니다. 따라서, 서비스 이용자는 본 약관의 내용이 서비스 이용자와 회사
                        간의 계약의 내용으로서, 인장을 날인한 계약서와 동일한 효력이 있음을 명확히 확인하여야 합니다.
                    </span>
                </span>
                <span
                    class="EOP SCXW187722135 BCX0"
                    data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:0,&quot;335559731&quot;:0,&quot;335559737&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:384}"
                    style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 10pt; line-height: 25.6px; font-family: 함초롬바탕, 함초롬바탕_EmbeddedFont, 함초롬바탕_MSFontService, sans-serif;"
                >&nbsp;</span>
            </p>
        </div>

`
    });
  },
  data() {
    return {
      tab: "mails",
      splitterModel: 20,
      meetinglogs: [],
      currentLog: null
    };
  },
  methods: {
    onclickLog(meetinglog) {
        this.currentLog = meetinglog;
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