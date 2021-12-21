<template>
  <div>
    gg
    <!-- <div v-for="good in goods" v-bind:key="good">
      <a-card :loading="loading" title="Card title"> whatever content </a-card>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue {
  public goods = [];
  public created() {
    this.goods = [];
  }
}
</script>

<style>
</style>