<template>
  <div>
    <a-row>
      <a-col :span="24" style="margin: 20px">
        <img src="@/assets/img/Up2021-12-23.jpg" class="drawUp" />
      </a-col>
    </a-row>
    <a-row>
      <a-button type="primary" class="drawButton"> 开启卡包！ </a-button></a-row
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Draw extends Vue {
  public created() {
    document.title = "风铃-抽卡";
  }
}
</script>

<style>
.drawUp {
  width: 80%;
  height: 80%;
}
.drawButton {
  width: 500px;
  height: 120px;
  margin-bottom: 20px;
}
</style>
