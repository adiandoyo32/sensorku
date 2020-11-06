<template>
  <v-layout>
    <v-row>
      <v-col cols="12" lg="12" md="8" sm="6">
        <v-card>
          <v-card-title>Charts</v-card-title>
          <v-card-text>
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "Home",
  components: {
    GChart,
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
    };
  },
};
</script>
