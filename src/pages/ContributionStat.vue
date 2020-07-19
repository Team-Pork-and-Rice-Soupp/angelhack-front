<template>
  <div class="assesment-page">
    <q-card v-for="(data, index) in datacollection" :key="index" v-if="loading">
      <chart :chartData="data" :options="options" class="small" />
    </q-card>
  </div>
</template>

<script>
import { T } from "../store/module/types.js";
import { mapGetters } from "vuex";

import Chart from "../components/BarChart.vue";
export default {
  name: "contribution-stat",
  components: {
    Chart
  },
  computed: {
    ...mapGetters({
      members: "getMembers",
      workspaceId: "getWorkspaceId"
    })
  },
  data() {
    return {
      datacollection: [
        {
          labels: [],
          datasets: [
            {
              label: "문제 인식 단계",
              backgroundColor: "#f87979",
              data: []
            }
          ]
        },
        {
          labels: [],
          datasets: [
            {
              label: "문제 정의 단게",
              backgroundColor: "#e470ff",
              data: []
            }
          ]
        },
        {
          labels: [],
          datasets: [
            {
              label: "문제 정검 단계",
              backgroundColor: "#f2c037",
              data: []
            }
          ]
        },
        {
          labels: [],
          datasets: [
            {
              label: "아이디어 도출 단계",
              backgroundColor: "#60dec8",
              data: []
            }
          ]
        },
        {
          labels: [],
          datasets: [
            {
              label: "해결 정리 단계",
              backgroundColor: "#56acf7",
              data: []
            }
          ]
        }
      ],
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 0.5
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 10
              }
            }
          ]
        }
      },
      loading: false
    };
  },
  mounted() {
    this.setMembers();
    this.getData();
  },
  methods: {
    setMembers() {
      let names = [];
      this.members.forEach(el => {
        names.push(el.name);
      });

      this.datacollection.forEach(data => {
        let score = [];
        data.labels = names;
      });
    },
    getData() {
      console.log(this.members);
      let vue = this;
      this.$store.dispatch(T.GET_ASSESSMENT, {
        workspaceId: this.workspaceId,
        token: localStorage.getItem("token"),
        cb: res => {
          res.forEach(el => {
            let name = vue.members.find(m => m.email == el.email).name;
            let point = 0;
            el.scores.forEach((p, index) => {
              if ((index + 1) % (res.length - 1) == 0) {
                point += p;
                vue.setPoint(name, point, (index + 1) / (res.length - 1));
                point = 0;
              } else {
                point += p;
              }
            });
          });

          console.log(vue.members);
          vue.loading = true;
        }
      });
    },
    setPoint(name, point, step) {
      console.log(this.datacollection[step - 1].datasets[0].label, name);
      this.datacollection[step - 1].datasets[0].data[
        this.datacollection[step - 1].labels.findIndex(el => el == name)
      ] = point;
    }
  }
};
</script>

<style scoped>
</style>

<style lang="scss" scoped>
.assesment-page {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .q-card {
    padding: 10px;
    width: 32%;
    margin-bottom: 20px;
  }

  .small {
    width: 100%;
  }
}
</style>