<template>
  <div>
    <a-col :span="24">
      <a-card align="left" style="margin: 20px">
        <h2 style="color: black">{{ jsonData.name }}</h2>
        <p>
          <a-row>
            <a-col :span="12">
              <img class="icon" src="@/assets/icon/Coin.png" />：{{
                jsonData.Money
              }}
            </a-col>
            <a-col :span="12">
              <img class="icon" src="@/assets/icon/Pebox.png" />：{{
                jsonData.SavePebox
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          <a-row>
            <a-col :span="12">
              <img class="icon" src="@/assets/icon/本能.png" />：{{
                jsonData.Courage
              }}
            </a-col>
            <a-col :span="12">
              <img class="icon" src="@/assets/icon/洞察.png" />：{{
                jsonData.Cautious
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          <a-row>
            <a-col :span="12">
              <img class="icon" src="@/assets/icon/沟通.png" />：{{
                jsonData.Discipline
              }}
            </a-col>
            <a-col :span="12">
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
  public jsonData = {
    name: "NUll",
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
    LatestLogin: "2021-12-17T23:45:57.37358+08:00",
    Account: null,
    Password: null,
  };
  public HeadUrl = "";
  public created() {
    document.title = "风铃-主页";
    var _this = this;
    axios({
      method: "post",
      url: `${Home.url}/user/getUserInfo`,
      data: JSON.stringify({
        relation: localStorage.relation,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        _this.jsonData = a.data;
        localStorage.Money = _this.jsonData.Money;
        localStorage.Pebox = _this.jsonData.SavePebox;
        localStorage.Courage = _this.jsonData.Courage;
        localStorage.Cautious = _this.jsonData.Cautious;
        localStorage.Discipline = _this.jsonData.Discipline;
        localStorage.Justice = _this.jsonData.Justice;
      })
      .catch(function (err) {
        //window.location.href = "http://www.yumiswindchime.cn:8085/Login.html";
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