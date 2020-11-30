<template>
  <div>
    <v-row>
      <v-col lg="3" md="4" sm="12" cols="12">
        <v-card>
          <v-card-text class="m-0">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="title font-weight-black"> 10 </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class=""> Active Devices </span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar size="56">
                <v-icon size="56" color="teal lighten-2">
                  mdi-access-point
                </v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3" md="4" sm="12" cols="12">
        <v-card>
          <v-card-text class="m-0">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="title font-weight-black"> 100 </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class=""> Inactive Devices </span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar size="56">
                <v-icon size="56" color="red lighten-2">
                  mdi-access-point
                </v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3" md="4" sm="12" cols="12">
        <v-card>
          <v-card-text class="m-0">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="title font-weight-black"> 100 </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span> Users </span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar size="56">
                <v-icon size="56" color="blue-grey lighten-2">
                  mdi-account-supervisor
                </v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3" md="4" sm="12" cols="12">
        <v-card>
          <v-card-text class="m-0">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="title font-weight-black"> 1000 </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class=""> Device Logs </span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar size="56">
                <v-icon size="56" color="blue lighten-2">
                  mdi-android-messages
                </v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      <v-col sm="6" md="4" lg="4" cols="12">
        <v-card>
          <v-card-title> Devices Chart </v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <pie-chart :data="pieData"></pie-chart>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
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
// import PieChart from "@/components/dashboard/PieChart.vue";
// import Map from "@/components/shared/Map.vue";

export default {
  name: "Home",
  components: {
    // Map,
    // PieChart,
  },
  data() {
    return {
      pieData: [
        ["LDR", 7],
        ["Suhu", 10],
        ["Turbidity", 5],
        ["Flow", 5],
      ],
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