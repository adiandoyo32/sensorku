<template>
  <div id="chart">
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: "donut",
          width: "100%",
          height: "100%"
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
            size: '85%'
          },
        },
        responsive: [
          {
            breakpoint: 1264,
            options: {
              chart: {
                width: 600,
                height: 600,
              },
              legend: {
                position: "right",
              },
            },
          },
          {
            breakpoint: 960,
            options: {
              chart: {
                width: 500,
                height: 500,
              },
              legend: {
                position: "right",
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
                height: 400,
              },
              legend: {
                position: "right",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>