<template>
    <div class="pareto-chart">
        <div>
            <q-table title="Treats" :data="data" :columns="columns" row-key="name" class="table">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <!-- <q-th auto-width /> -->
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >{{ col.label }}</q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <!-- original row -->
                    <q-tr :props="props">
                        <!-- (td)버튼 외 나머지 실제 데이터 -->
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >{{ col.value }}</q-td>
                    </q-tr>

                    <!-- expanded row -->
                    <q-tr v-show="props.expand" :props="props">
                        <!-- (td)버튼 -->
                        <q-td auto-width>
                            <q-btn
                                size="sm"
                                color="accent"
                                round
                                dense
                                @click="props.expand = !props.expand"
                                :icon="props.expand ? 'remove' : 'add'"
                            />
                        </q-td>

                        <!-- (td)버튼 외 나머지 실제 데이터 -->
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >{{ col.value }}</q-td>
                    </q-tr>
                </template>
            </q-table>
            <q-input v-model="newData.product" label="제품" />
            <q-input v-model="newData.sale" label="판매수량" />
            <q-btn label="데이터 추가" @click="addNewRow" />
        </div>

        <pareto-chart :chartData="realtimeData" :options="options" class="small" :key="refreshChart" />
    </div>
</template>

<script>
import ParetoChart from "../components/BarChart";
export default {
    name: "pareto",
    components: {
        ParetoChart
    },
    data() {
        return {
            refreshChart: 1,
            newData: {
                name: "",
                product: "",
                sale: ""
            },
            columns: [
                {
                    name: "desc",
                    required: true,
                    label: "번호",
                    align: "center",
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: "product",
                    align: "center",
                    label: "제품",
                    field: "product",
                    sortable: true
                },
                {
                    name: "sale",
                    label: "판매수량",
                    field: "sale",
                    sortable: true,
                    style: "width: 10px"
                }
            ],
            data: [
                {
                    name: "1",
                    product: "A 제품",
                    sale: 6.0
                },
                {
                    name: "2",
                    product: "B 제품",
                    sale: 9.0
                },
                {
                    name: "3",
                    product: "C 제품",
                    sale: 16.0
                },
                {
                    name: "4",
                    product: "D 제품",
                    sale: 3
                },
                {
                    name: "5",
                    product: "E 제품",
                    sale: 16.0
                }
            ],
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
                        data: [],
                        yAxisID: "y-axis-2"
                    },
                    {
                        type: "bar",
                        label: "판매수량",
                        borderColor: "#56B513",
                        backgroundColor: "#56B513",
                        data: [],
                        yAxisID: "y-axis-1"
                    },
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
                                labelString: "Estaciones"
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
                                labelString: "Minutos"
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
    computed: {
        realtimeData() {
            this.data.forEach(datum => {
                this.datacollection.labels.push(datum.product);
                this.datacollection.datasets[1].data.push(datum.sale);
            });
            return this.datacollection;
            // this.datacollection.labels = this.data
        }
    },
    methods: {
        addNewRow() {
            this.newData.name = this.data.length + 1;
            this.data.push(this.newData);
            this.datacollection.labels.push(this.newData.product);
            this.datacollection.datasets[1].data.push(this.newData.sale);
            this.newData = {
                name: "",
                product: "",
                sale: ""
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
        width: 350px;
    }
    .small {
        width: 900px;
        height: 500px;
        max-height: 500px;
        max-width: 1500px;
    }
}
</style>