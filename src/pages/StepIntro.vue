
<template>
  <div class="step-intro">
    <q-card dark bordered class="bg-grey-4 my-card">
      <q-card-section>
        <div class="text-h3">{{title}}</div>
        <div class="text-subtitle1">{{description}}</div>
      </q-card-section>
    </q-card>

    <q-card dark bordered class="bg-grey-4 my-card" v-for="(item, index) in contents" :key="index">
      <q-card-section>
        <div class="text-h3">{{item.name}}</div>
        <div class="text-subtitle1">{{item.description}}</div>
        <q-btn label="Create" @click="onClick(item)" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";

export default {
  data() {
    return {
      title: "",
      description: "",
      contents: []
    };
  },
  mounted() {
    const type = this.$route.query.type;

    this.setPage(type);
  },
  methods: {
    movePage(pageName) {
      this.$router.push(`${pageName}`);
    },
    setPage(type) {
      switch (type) {
        case "0":
          this.title = "문제 인식 - 문제(problem)란?";
          this.description =
            "현재 상태와 목표 상태 간의 차이가 존재하는 것을 의마합니다. 세상에 없던 내용부터 현재 존재하는 것들을 좀더 쉽고 편하게 사용하길 원하는 것 모두 문제가 될 수 있습니다. 즉, 미처 인신하지 못했던 걷을 새롭게 인식하는 것을 의미하면 문제해결의 첫번째 단계 입니다.";
          this.contents = [
            {
              name: "SWOT",
              description: "도구 설명",
              query: "1-1"
            },
            {
              name: "브레인 스토밍",
              description: "도구 설명",
              query: "1-2"
            },
            {
              name: "PEST 분석",
              description: "도구 설명",
              query: "1-3"
            }
          ];
          break;
        case "1":
          this.title = "문제 정의";
          this.description = "작성중 입니다.";
          this.contents = [
            {
              name: "5whys",
              description: "도구 설명",
              query: "2-1"
            },
            {
              name: "원인 결과 도표",
              description: "도구 설명",
              query: "2-2"
            },
            {
              name: "파레토 차트",
              description: "도구 설명",
              query: "2-3"
            }
          ];
          break;
        case "2":
          this.title = "문제 정검";
          this.description = "작성중 입니다.";
          this.contents = [
            {
              name: "Logic Tree",
              description: "도구 설명",
              query: "3-1"
            },
            {
              name: "육하원칙(5W3H)",
              description: "도구 설명",
              query: "3-2"
            }
          ];
          break;
        case "3":
          this.title = "아이디어 도출";
          this.description = "작성중 입니다.";
          this.contents = [];
          break;
        case "4":
          this.title = "IF";
          this.description = "작성중 입니다.";
          this.contents = [
            {
              name: "ASIS-TOBE",
              description: "도구 설명",
              query: "5-1"
            },
            {
              name: "Time Line",
              description: "도구 설명",
              query: "5-2"
            },
            {
              name: "축약해서 설명하기",
              description: "도구 설명",
              query: "5-3"
            }
          ];
          break;
      }
      console.log(this.title, this.description);
    },
    onClick(step) {
      console.log(step);
      this.movePage("/CreateTools?type=" + step.query);
    }
  }
};
</script>

<style lang="scss" scoped>
.step-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  .my-card {
    padding: 50px 8px;
    margin-bottom: 20px;
    width: 80%;
    color: black;
    .text-h3 {
      font-size: 2.8rem;
      font-weight: lighter;
      margin-bottom: 10px;
    }
  }
}
</style>