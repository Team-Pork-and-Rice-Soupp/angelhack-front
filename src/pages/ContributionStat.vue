<template>
  <div style="display: flex; flex-wrap: wrap;">
    <chart :chartData="datacollection" :options="options" class="small" />
    <chart :chartData="datacollection2" :options="options" class="small" />
    <chart :chartData="datacollection3" :options="options" class="small" />
    <chart :chartData="datacollection4" :options="options" class="small" />
  </div>
</template>

<script>
import Chart from "../components/BarChart.vue";
export default {
  name: "contribution-stat",
  components: {
    Chart
  },
  data() {
    return {
      datacollection: {
        labels: ["멤버1", "멤버2"],
        datasets: [
          {
            label: "적극성",
            backgroundColor: "#f87979",
            data: [8, 5]
          }
        ]
      },
      datacollection2: {
        labels: ["멤버1", "멤버2"],
        datasets: [
          {
            label: "성실도",
            backgroundColor: "#e470ff",
            data: [5, 6]
          }
        ]
      },
      datacollection3: {
        labels: ["멤버1", "멤버2"],
        datasets: [
          {
            label: "리더십",
            backgroundColor: "#f2c037",
            data: [9, 2]
          }
        ]
      },
      datacollection4: {
        labels: ["멤버1", "멤버2"],
        datasets: [
          {
            label: "창의력",
            backgroundColor: "#60dec8",
            data: [2, 6]
          }
        ]
      },
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
      }
    };
  }
};
</script>

<style scoped>
.small {
  width: 500px;
}
</style>