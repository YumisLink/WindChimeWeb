<template>
  <div>
    <a-row>
      <a-col :span="12"> col-12 </a-col>
      <a-col :span="12"> col-12 </a-col>
    </a-row>
    <a-row>
      <a-col :span="8"> col-8 </a-col>
      <a-col :span="8"> col-8 </a-col>
      <a-col :span="8"> col-8 </a-col>
    </a-row>
    <a-row>
      <a-col :span="6"> col-6 </a-col>
      <a-col :span="6"> col-6 </a-col>
      <a-col :span="6"> col-6 </a-col>
      <a-col :span="6"> col-6 </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Main extends Vue {
  public static Place = "Main";
  public created() {
    document.title = "风铃-商店";
  }
}
</script>

<style >
</style>