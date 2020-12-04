<template>
  <v-card>
    <v-card-title> Daily Log </v-card-title>
    <v-card-text>
      <!-- <apexchart
        height="350"
        ref="realtimeChart"
        :options="chartOptions"
        :series="series"
      ></apexchart> -->
      <apexcharts height="350" type="bar" :options="chartOptions" :series="series"></apexcharts>
      <div id="chart" ref="lineChart">

      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import ApexCharts from "vue-apexcharts";

export default {
    components: {
    apexcharts: ApexCharts,
  },
  props: ["deviceId"],
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },

  computed: {
    dataSet() {
      return this.$store.getters["device/DEVICE_LOG_DATASET"];
    },
  },

  mounted() {
    // this.$store.dispatch("device/FETCH_DEVICE_LOGS", this.deviceId);
    // this.updateChart();
    // const chart = ApexCharts(this.$refs.linechart, {
    //   chart: {
    //     type: 'bar',
    //     height: 400
    //   },
    //   series: [{
    //     name: 'sales',
    //     data: [30,40,45,50,49,60,70,91,125]
    //   }],
    //   xaxis: {
    //     categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    //   }
    // })

    // chart.render();
  },

  methods: {
    updateChart() {
      this.$refs.realtimeChart.updateSeries([{
        data: this.dataSet
      }])
    }
  },
};
</script>

<style>
</style>