<template>
  <v-layout>
    <v-row>
      <v-col cols="12">
        <SenderTable />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import SenderTable from "@/components/Sender/SenderTable";

export default {
  name: "Senders",
  components: {
    SenderTable,
  }
};
</script>

<style>
</style>