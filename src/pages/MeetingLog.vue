<template>
  <div>
    <div id="summernote">

    </div>
    <q-btn label="템플릿 선택" @click="alert = true" />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "meeting-log",
  data() {
    return {
      alert: false,
      templates: {
        template1: "<p>템플릿 1</p>",
        template2: `<p><b>템플릿2</b><br></p><p style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"><u>와 더멋지다!</u></p><ol><li style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin: 0px 0px 16px; color: rgb(51, 51, 51); font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;">우와</li></ol>`,
        template3: "<p>템플릿 3</p>"
      }
    }
  },
  mounted() {
    $("#summernote").summernote({
      height: 300, // set editor height
      minHeight: null, // set minimum height of editor
      maxHeight: null, // set maximum height of editor
      focus: true // set focus to editable area after initializing summernote
    });
  }
};
</script>

<style>
</style>