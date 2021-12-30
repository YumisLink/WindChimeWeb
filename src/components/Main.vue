<template>
  <div>
    <a-col :span="24">
      <a-card align="left" style="margin: 20px">
        <h2 style="color: black">{{ myname }}</h2>
        <p>
          <a-row>
            <a-col :xs="24" :sm="12">
              <img class="icon" src="@/assets/icon/Coin.png" />：{{
                jsonData.Money
              }}
            </a-col>
            <a-col :sm="12" :xs="24">
              <img class="icon" src="@/assets/icon/Pebox.png" />：{{
                jsonData.SavePebox
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          <a-row>
            <a-col :sm="12" :xs="24">
              <img class="icon" src="@/assets/icon/本能.png" />：{{
                jsonData.Courage
              }}
            </a-col>
            <a-col :sm="12" :xs="24">
              <img class="icon" src="@/assets/icon/洞察.png" />：{{
                jsonData.Cautious
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          <a-row>
            <a-col :sm="12" :xs="24">
              <img class="icon" src="@/assets/icon/沟通.png" />：{{
                jsonData.Discipline
              }}
            </a-col>
            <a-col :sm="12" :xs="24">
              <img class="icon" src="@/assets/icon/压迫.png" />：{{
                jsonData.Justice
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          剩余工作/抚摸次数：<span v-if="jsonData.WorkCount > 0">
            <span v-for="n in jsonData.WorkCount" v-bind:key="n">
              <img src="@/assets/icon/Work.png" class="icon" /> </span
          ></span>
          <span v-if="jsonData.HeartCount > 0">
            <span v-for="n in jsonData.HeartCount" v-bind:key="n.this">
              <img src="@/assets/icon/Love.png" class="icon" /> </span
          ></span>
        </p>
      </a-card>
    </a-col>
    <a-col :span="6" style="margin: 10px"
      ><a-card align="left"></a-card>
    </a-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Home from "@/views/Home.vue";
@Component({
  components: {},
})
export default class Main extends Vue {
  myname = "wochao";
  public jsonData = {
    name: "a",
    QQ: 0,
    WorkCount: 0,
    HeartCount: 0,
    Heart: 0,
    Courage: 0,
    Cautious: 0,
    Discipline: 0,
    Justice: 0,
    MoonCard: 0,
    Money: 0,
    SavePebox: 0,
    IsTake: 0,
    Conversation: "",
    CardUse: [0, 0, 0, 0, 0],
    UseEGOCard: 0,
    AllCard: [],
    Inhibition: [],
    Account: null,
    Password: null,
  };
  public HeadUrl = "";
  public created() {
    document.title = "风铃-主页";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    var _this = this;
    axios({
      method: "post",
      url: `${Home.url}${Home.getUserMessage}`,
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        token: localStorage.relation,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        if (!response.data.success) return;
        var a = response.data;
        _this.jsonData = a.data;
        _this.myname = _this.jsonData.name;
        localStorage.Money = _this.jsonData.Money;
        localStorage.Pebox = _this.jsonData.SavePebox;
        localStorage.Courage = _this.jsonData.Courage;
        localStorage.Cautious = _this.jsonData.Cautious;
        localStorage.Discipline = _this.jsonData.Discipline;
        localStorage.Justice = _this.jsonData.Justice;
      })
      .catch(function (err) {
        console.log("?");
        window.location.href = "/#/login";
      });
    _this.myname = _this.jsonData.name;
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
.icon {
  width: 25px;
  height: 25px;
}
p {
  font-size: 120%;
}
h2 {
  font-size: 200%;
}
h3 {
  font-size: 130%;
  font: bold;
}
h1 {
  font-size: 250%;
}
</style>