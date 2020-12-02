<template>
  <div>
    <CardStatus />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Area Chart </v-card-title>
          <v-card-text>
            <div id="chart">
              <apexchart
                type="area"
                height="270"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <DevicePieChart />
      <v-col sm="6" md="8" lg="8" cols="12">
        <v-card>
          <v-card-title> Logs Chart </v-card-title>
          <v-card-text>
            <line-chart :data="chartData" :download="true"></line-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12">
        <v-card class="overflow-hidden">
          <Map />
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
// import Test from "@/components/dashboard/GChart.vue";
import DevicePieChart from "@/components/dashboard/DevicePieChart.vue";
// import Map from "@/components/shared/Map.vue";
import CardStatus from "@/components/dashboard/CardStatus";

export default {
  name: "Home",
  components: {
    CardStatus,
    DevicePieChart,
    // Map,
  },
  data() {
    return {
      chartData: [
        {
          name: "Devices",
          data: {
            "2017-01-01": 3,
            "2017-01-02": 4,
            "2017-01-03": 4,
          },
        },
        {
          name: "Devices",
          data: {
            "2017-01-01": 5,
            "2017-01-02": 3,
            "2017-01-03": 8,
          },
        },
      ],

      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          // text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  },
};
</script>

<style lang="scss">
.apexcharts-toolbar {
  z-index: 2 !important;
}
</style>