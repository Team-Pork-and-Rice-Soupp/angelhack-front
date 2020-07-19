
<template>
  <div class="step-intro">
    <q-card dark bordered class="bg-grey-4 my-card">
      <q-card-section>
        <div class="step-title">{{title}}</div>
        <div class="step-description">{{description}}</div>
      </q-card-section>
    </q-card>

    <q-card dark bordered class="bg-grey-4 my-card" v-for="(item, index) in contents" :key="index">
      <q-card-section>
        <div class="step-title">{{item.name}}</div>
        <div class="step-description">{{item.description}}</div>
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
              description:
                "SWOT는 강점(Strength), 약점(Weakness), 기회(Opportunity), 위협(Threat)의 머리글자를 모아 만든 단어로 경영 전략을 수립하기 위한 분석 도구입니다. 보통 X,Y축으로 2차원의 사분면을 그리고 각각 하나의 사분면에 하나씩 배치하여 연관된 사항들을 우선 순위로 지배합니다.\r\n 이러한 분석을 통해 경영자는 시장 상황에 대한 인식을 할 수 있으며 앞으로의 전략을 수립하기 위한 중요한 자료로 삼을 수 있습니다.",
              query: "1-1"
            },
            {
              name: "PEST 분석",
              description:
                "거시환경분석(PEST) (Political, Economic, Social and Technological analysis)은 전략관리 구성 요소 중 환경 파악에 사용되는 거시적 환경 요소를 묘사합니다. 일부 학자들은 이 내용에 법적(Legal) 특성을 추가하여 SLEPT로 부르기도 하며 환경(Environmental) 분야를 추가하여 PESTEL 혹은 PESTLE로 칭하는데 영국에서 통용됩니다. \r\nPEST 분석을 통해 외부요인을 분석해봅시다!",
              query: "1-3"
            }
          ];
          break;
        case "1":
          this.title = "문제 정의";
          this.description = "";
          this.contents = [
            {
              name: "5whys",
              description:
                "5 가지 이유 (또는 5 가지 이유 )는 특정 문제의 근본 원인과 결과 관계 를 탐색하는 데 사용되는 반복적 인 질문 기술 입니다. 이 기술의 주요 목표는 '왜?' 라는 질문을 반복하여 결함 이나 문제 의 근본 원인 을 파악하는 것 입니다. 각 답변은 다음 질문의 기초를 형성합니다. 이름의 '5'는 문제를 해결하는 데 필요한 반복 횟수에 대한 일화적인 관찰에서 비롯됩니다. \r\n5whys를 통해 문제에 대해 끊임없이 질문하여 진짜 원인을 찾아봅시다!",
              query: "2-1"
            },
            {
              name: "파레토 차트",
              description:
                "이탈리아 경제학자 파레토는 경제적 부의 대부분이 전 인구 중 일부에 의해 취해진다는 파레토 법칙을 발견하였습니다. 파레토도는 공정에서 불량의 주된 원인을 찾는 중요한 도구로 많이 사용되고 있습니다. 파레토 차트를 이용하면 어떤 결과에 대해 가장 큰 비중을 차지하는 요인을 점검할 수 있습니다. \r\n정의한 문제들을 파레토 차트를 이용하여 중요도 또는 해결비용 등을 산정해 봅시다!",
              query: "2-3"
            }
          ];
          break;
        case "2":
          this.title = "문제 정검";
          this.description = "";
          this.contents = [
            {
              name: "Logic Tree",
              description:
                "로직트리(Logic Tree)는 맥킨지 컨설팅 회사에서 문제해결 및 컨설팅에 사용하는 주요 사고기법으로 이슈를 'MECE'의 사고방식에 기초하여 트리의 형태로 상위의 개념을 하위의 개념으로 논리적으로 분해하는 분석기법입니다. 우리가 비지니스 상황에서 접하게 되는 대부분의 문제들은 다양한 개별적 과제들이 서로 뒤엉켜 있는 경우가 많습니다. 이러한 문제들을 해결하기 위해 가장 먼저 해야할 일은 가능한한 작은 단위의 과제로 분류하고 쪼개 놓는 것입니다.  \r\n로직트리를 각각의 개념들을 명료하게 분리해보는건 어떨까요?.",
              query: "3-1"
            },
            {
              name: "육하원칙(5W3H)",
              description:
                "육하원칙은 문자 그대로 6가지의 원칙으로, 원래는 기사문에 반드시 들어가야 할 여섯 가지 요소를 의믜하며 순서는 아래와 같습니다. \r\n누가(who, 何人), 언제(when, 何時), 어디서(where, 何處), 무엇을(what/which, 何事), 어떻게(how, 如何), 왜(why, 何故) \r\n간단해 보이는 육하원칙을 사용하여 내용 및 의도를 효과적으로 전달해봅시다!",
              query: "3-2"
            }
          ];
          break;
        case "3":
          this.title = "아이디어 도출";
          this.description = "";
          this.contents = [];
          break;
        case "4":
          this.title = "해결 정리";
          this.description = "";
          this.contents = [
            {
              name: "ASIS-TOBE",
              description:
                "AS-IS 란, 지금 현재 '있는 그대로'를 의미합니다. 즉, AS-IS 분석이란 현재의 업무 프로세스에 대한 분석을 뜻합니다. TO-BE란, '미래의' 라는 의미를 가지고 있습니다. 즉, 미래에 개선될 업무 프로세스에 대한 분석을 뜻합니다. AS-IS 분석을 잘 해 놓으면 나중에 구현하고자 하는 시스템에 대해 큰 어려움 없이 TO-BE 분석할 수 있습니다. \r\n아이디어를 통해 바뀌게 된 결과를 AS IS / TO BE 분석을 통해 정리해봅시다.",
              query: "5-1"
            },
            {
              name: "TimeLine",
              description:
                "타임라인이란 발생한 사건, 이벤트를 발생 순서대로 나열한 것으로, 보통 하나의 직선에 시간, 발생 이벤트나 행위 등의 정보가 담겨있습니다. 타임라인을 이루는 주요 요소는 아래와 같습니다. \r\n성취되어야 할 업무, 과제(task), 업무, 과제의 날짜 (dates), 업무, 과제의 지속 기간 (duration), 업무, 과제간의 의존성 (dependencies) \r\n타임라인을 작성하여 프로젝트를 위해 수립한 계획을 체계적으로 정리해봅시다.",
              query: "5-2"
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
    .step-title {
      font-size: 30px;
      font-weight: lighter;
      margin-bottom: 10px;
    }
    .step-description {
      margin-bottom: 10px;
    }
  }
}
</style>