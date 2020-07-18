<!--
  서버로 보내고 받는 데이터:
  this.data ===
  {
    { number: 1, item: "전자레인지", quantity: 85 },
    { number: 2, item: "선풍기", quantity: 32 },
    { number: 3, item: "전등 스위치", quantity: 4 },
    ...    
  }

  이 컴포넌트(this)가 보내고 받을 데이터를 담고 있는 놈 : 
  data
  -> 나중에 dispatch(T.~, this.data) 이렇게 보내면 됨.
     받을 땐 
      this.data = 받은 데이터;
      this.generateParetoChart(this.data);
     하면 된다.

  표 그리는 방법:
  서버에서 받은 데이터를 this.data에 넣으면 됨.

  파레토차트 그리는 방법:
  this.generateParetoChart(서버에서 받은 데이터); 이렇게 하면 됨.
  this.data = 서버에서 받은 데이터; 를 했다면,
  위의 함수의 파라미터에 this.data 넣으면 됨.
-->

<template>
  <div class="pareto-chart">
    <div>
      <div v-if="!tableEnabled">
        <q-input filled label="비교 항목" v-model="scaleOption.xScaleLabel" />
        <q-input filled label="데이터 단위" v-model="scaleOption.yScaleLabel" />
        <q-btn label="표 생성" @click="enableTable" />
      </div>

      <div v-if="tableEnabled">
        <q-table
          title="데이터"
          :data="data"
          :columns="columns"
          row-key="number"
          selection="multiple"
          class="table"
        >
          <!--row-key="name-->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
              <!--column이기 때문에 name이 키가 맞음.-->
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="number" :props="props">{{ props.row.number }}</q-td>
              <q-td key="item" :props="props">{{ props.row.item }}</q-td>
              <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
              <q-td>
                <q-btn label="삭제" color="negative" @click="deleteRow(props.row)" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-input filled v-model="newData.item" :label="scaleOption.xScaleLabel" />
        <q-input filled v-model="newData.quantity" type="number" :label="scaleOption.yScaleLabel" />
        <q-btn label="데이터 추가" @click="addNewRow" />
      </div>
    </div>
    <pareto-chart :chartData="datacollection" :options="options" class="small" :key="refreshChart" />
  </div>
</template>

<script>
import ParetoChart from "../components/BarChart";
export default {
  name: "pareto",
  components: {
    ParetoChart
  },
  // mounted() {

  // }
  data() {
    return {
      vueName: "paretoChart",
      tableEnabled: false,
      scaleOption: {
        xScaleLabel: "",
        xScaleLabel: ""
      },

      refreshChart: 1,
      rawDataList: [],
      newData: {
        number: "",
        item: "",
        quantity: ""
      },
      columns: [
        {
          name: "number",
          required: true,
          label: "번호",
          align: "center"
        },
        {
          name: "item",
          align: "center",
          label: "항목",
          field: "item"
        },
        {
          name: "quantity",
          label: "수량",
          field: "quantity"
        },
        {
          name: "deleteButton",
          align: "center",
          label: "",
          field: "deleteButton"
        }
      ],
      data: [],
      datacollection: {
        labels: [],
        datasets: [
          {
            type: "line",
            label: "누적",
            borderColor: "#BA1E14",
            backgroundColor: "#BA1E14",
            pointBorderWidth: 5,
            fill: false,
            data: [], // 34.04, 57.45, 76.6, 89.36, 100.0 just in case you'd want to test line chart.
            yAxisID: "y-axis-2"
          },
          {
            type: "bar",
            label: "판매수량",
            borderColor: "#56B513",
            backgroundColor: "#56B513",
            data: [],
            yAxisID: "y-axis-1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "비교항목"
              },
              barPercentage: 0.5
            }
          ],

          yAxes: [
            {
              type: "linear",
              position: "left",
              id: "y-axis-1",
              stacked: true,
              ticks: {
                suggestedMin: 0
              },
              scaleLabel: {
                display: true,
                labelString: "데이터 단위"
              }
            },
            {
              type: "linear",
              position: "right",
              id: "y-axis-2",
              ticks: {
                suggestedMin: 0,
                callback: function(value) {
                  return value + "%";
                }
              },
              scaleLabel: {
                display: true,
                labelString: "%"
              }
            }
          ]
        }
      }
      // datacollection: {
      //     labels: ["8", "7", "9", "11", "10"],
      //     datasets: [
      //         {
      //             type: "line",
      //             label: "누적",
      //             borderColor: "#BA1E14",
      //             backgroundColor: "#BA1E14",
      //             pointBorderWidth: 5,
      //             fill: false,
      //             data: [34.04, 57.45, 76.6, 89.36, 100.0],
      //             yAxisID: "y-axis-2"
      //         },
      //         {
      //             type: "bar",
      //             label: "Asistencia",
      //             borderColor: "#56B513",
      //             backgroundColor: "#56B513",
      //             data: [16, 11, 9, 6, 5],
      //             yAxisID: "y-axis-1"
      //         },
      //         {
      //             type: "bar",
      //             label: "Solución",
      //             borderColor: "#000FAA",
      //             backgroundColor: "#000FAA",
      //             data: [16, 11, 9, 6, 5],
      //             yAxisID: "y-axis-1"
      //         }
      //     ]
      // },
    };
  },
  methods: {
    deleteRow(row) {
      let index = this.data.findIndex(datum => datum.number == row.number);
      let datum = this.data[index];

      let labelIndex = this.datacollection.labels.findIndex(
        label => label == datum.item
      );
      let dataIndex = this.datacollection.datasets[1].data.findIndex(
        datm => datm == datum.quantity
      );

      this.datacollection.labels.splice(labelIndex, 1);
      this.datacollection.datasets[1].data.splice(dataIndex, 1);

      this.datacollection.datasets[0].data = [];
      let sum = this.datacollection.datasets[1].data.reduce(
        (acc, cur) => parseInt(acc) + parseInt(cur)
      );
      console.log("sum >> ", sum);
      let accPercent = 0;
      this.datacollection.datasets[1].data.forEach(datum => {
        let percent = (datum / sum) * 100;
        accPercent += percent;
        console.log("percent >> ", percent);
        console.log("accPercent >> ", accPercent);
        this.datacollection.datasets[0].data.push(accPercent);
      });

      this.data.splice(index, 1);

      this.refreshChart *= -1;
    },
    enableTable() {
      this.options.scales.xAxes[0].scaleLabel.labelString = this.scaleOption.xScaleLabel;
      this.options.scales.yAxes[0].scaleLabel.labelString = this.scaleOption.yScaleLabel;
      this.columns[1].label = this.scaleOption.xScaleLabel;
      this.columns[2].label = this.scaleOption.yScaleLabel;
      this.refreshChart *= -1;
      this.tableEnabled = true;
    },
    addNewRow() {
      this.newData.number = this.data.length + 1;
      this.data.push(this.newData);
      this.generateParetoChart(this.data);
    },
    generateParetoChart(dataList) {
      // dataList consists of objects that has 1) number, 2) item, 3) quantity
      let tempList = [...dataList];
      tempList.sort((a, b) => {
        // desc sort
        if (parseInt(a.quantity) > parseInt(b.quantity)) return -1;
        else if (parseInt(a.quantity) == parseInt(b.quantity)) return 0;
        else if (parseInt(a.quantity) < parseInt(b.quantity)) return 1;
      });
      this.datacollection.labels = [];
      this.datacollection.datasets[0].data = [];
      this.datacollection.datasets[1].data = [];
      tempList.forEach(temp => {
        this.datacollection.labels.push(temp.item);
        this.datacollection.datasets[1].data.push(temp.quantity);
      });

      let sum = this.datacollection.datasets[1].data.reduce(
        (acc, cur) => parseInt(acc) + parseInt(cur)
      );
      console.log("sum >> ", sum);
      let accPercent = 0;
      this.datacollection.datasets[1].data.forEach(datum => {
        let percent = (datum / sum) * 100;
        accPercent += percent;
        console.log("percent >> ", percent);
        console.log("accPercent >> ", accPercent);
        this.datacollection.datasets[0].data.push(accPercent);
      });

      this.newData = {
        number: "",
        item: "",
        quantity: ""
      };
      this.refreshChart *= -1;
    },
    isLastRow(row) {
      if (row == this.data[this.data.length - 1]) {
        return true;
      }
      false;
    }
  }
};
</script>

<style lang="scss" scoped>
.pareto-chart {
  display: flex;
  justify-content: space-around;
  .table {
    width: 400px;
  }
  .small {
    width: 900px;
    height: 500px;
    max-height: 500px;
    max-width: 1500px;
  }
}
</style>