<template>
  <a-col :span="12" style="margin: 10px">
    <a-card align="left">
      <h2 color="red">{{ name }}</h2>
      <p>Card content</p>
      <p>Card content</p>
      <a-button type="primary" @click="onClick"> Primary </a-button>
    </a-card>
  </a-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Home from "@/views/Home.vue";
@Component({
  components: {},
})
export default class name extends Vue {
  public name = "undefine";
  public onClick() {
    var _this = this;
    console.log(``);
    axios({
      method: "post",
      url: `${Home.url}/stu`,
      data: JSON.stringify({
        id: 1,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        _this.name = response.data.res.username;
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
</script>

<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(124, 124, 124, 0);
  margin: 16px 24px 16px 0;
  float: left;
}
.context {
  background: rgb(246, 255, 255);
}
.card {
  height: 500px;
}
</style>