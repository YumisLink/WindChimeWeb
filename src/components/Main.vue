<template>
  <div>
    <a-col :span="24">
      <a-card align="left" style="margin: 20px">
        <h2 style="color: black">{{ jsonData.name }}</h2>
        <p>
          <a-row>
            <a-col :span="12">
              <img class="icon" src="@/assets/Icon/Coin.png" />：{{
                jsonData.Money
              }}
            </a-col>
            <a-col :span="12">
              <img class="icon" src="@/assets/Icon/Pebox.png" />：{{
                jsonData.SavePebox
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          <a-row>
            <a-col :span="12">
              <img class="icon" src="@/assets/Icon/本能.png" />：{{
                jsonData.Courage
              }}
            </a-col>
            <a-col :span="12">
              <img class="icon" src="@/assets/Icon/洞察.png" />：{{
                jsonData.Cautious
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          <a-row>
            <a-col :span="12">
              <img class="icon" src="@/assets/Icon/沟通.png" />：{{
                jsonData.Discipline
              }}
            </a-col>
            <a-col :span="12">
              <img class="icon" src="@/assets/Icon/压迫.png" />：{{
                jsonData.Justice
              }}
            </a-col>
          </a-row>
        </p>
        <p>
          剩余工作/抚摸次数：<span
            v-for="n in jsonData.WorkCount"
            v-bind:key="n"
            ><img src="@/assets/Icon/Work.png" class="icon" />
          </span>
          <span v-for="n in jsonData.HeartCount" v-bind:key="n.this"
            ><img src="@/assets/Icon/Love.png" class="icon" />
          </span>
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
      url: `${Home.url}/test`,
      data: JSON.stringify({}),
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        _this.jsonData = a.data;
        localStorage.Money = _this.jsonData.Money;
        localStorage.Pebox = _this.jsonData.SavePebox;
        console.log(_this.jsonData);
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
</style>