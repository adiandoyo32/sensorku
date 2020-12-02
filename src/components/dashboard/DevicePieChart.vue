<template>
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
</template>

<script>
export default {
  data() {
    return {
      pieData: [
        ["LDR", 7],
        ["Suhu", 10],
        ["Turbidity", 5],
        ["Flow", 5],
        ["Unknown", 5],
      ],
    };
  },
};
</script>

<style>
</style>