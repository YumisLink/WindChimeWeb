<template>
  <div>
    <a-modal
      title="无法工作"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
    <a-card align="left" style="margin: 20px">
      <a-row>
        <a-col :span="18">
          <h2 style="color: black">{{ nowObj.Name }}</h2>
          <p>
            危险等级：<span :style="'color:' + warColors[nowObj.Level]">{{
              nowObj.Level
            }}</span>
          </p>
          <p>
            伤害：<span :class="damColors[nowObj.Damage.Type]"
              >[{{ damType[nowObj.Damage.Type] }}]{{ nowObj.Damage.Min }}~{{
                nowObj.Damage.Max
              }}</span
            >
          </p>
          <p>
            Pebox：<span
              >{{ nowObj.PeBox }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a-icon
                type="frown"
                color="red"
                theme="twoTone"
                two-tone-color="#f5222d"
                style="font-size: 120%"
              />&nbsp;
              <span v-if="nowObj.Normal > 0">0-{{ nowObj.Normal - 1 }}</span>
              <span v-else>-</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a-icon
                type="meh"
                color="red"
                theme="twoTone"
                two-tone-color="#faad14"
                style="font-size: 120%"
              />&nbsp;<span>
                {{ nowObj.Normal }}-{{
                  nowObj.PeBox >= nowObj.Good - 1
                    ? nowObj.Good - 1
                    : nowObj.PeBox
                }}</span
              >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a-icon
                type="smile"
                color="red"
                theme="twoTone"
                two-tone-color="#52c41a"
                style="font-size: 120%"
              />&nbsp;<span v-if="nowObj.Good <= nowObj.PeBox">
                {{ nowObj.Good }}-{{ nowObj.PeBox }}</span
              ><span v-else> -</span>
            </span>
          </p>

          <p>Tips:</p>
          <p
            v-for="tips in nowObj.Tips"
            v-bind:key="tips.this"
            style="font-size: 100%"
          >
            {{ tips }}
          </p>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="4">
          <img
            :src="
              require('@/assets/workObject/' + this.nowObj.EnglishName + '.png')
            "
            style="width: 100%"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="3">
          <a-button
            type="danger"
            id="backRed"
            :loading="loading"
            @click="onClickRed"
          >
            本能({{
              GetPro(
                nowObj.Instinct[GetLevel(fourElement[0])] +
                  fourElement[2] * 0.01
              )
            }})
          </a-button></a-col
        ><a-col :span="3">
          <a-button
            type="danger"
            id="backWhite"
            :loading="loading"
            @click="onClickWhite"
          >
            洞察 ({{
              GetPro(
                nowObj.Insight[GetLevel(fourElement[1])] + fourElement[2] * 0.01
              )
            }})
          </a-button></a-col
        ><a-col :span="3">
          <a-button
            type="danger"
            id="backBlack"
            :loading="loading"
            @click="onClickBlack"
          >
            沟通({{
              GetPro(
                nowObj.Attachment[GetLevel(fourElement[2])] +
                  fourElement[2] * 0.01
              )
            }})
          </a-button></a-col
        ><a-col :span="3">
          <a-button
            type="danger"
            id="backBlue"
            :loading="loading"
            @click="onClickPale"
          >
            压迫({{
              GetPro(
                nowObj.Repression[GetLevel(fourElement[3])] +
                  fourElement[2] * 0.01
              )
            }})</a-button
          ></a-col
        >
      </a-row>
    </a-card>

    <h1>工作结果：</h1>
    <a-col :span="11" align="left" class="Top"></a-col>

    <a-col :span="12" align="left" style="margin-top: 50px">
      <a-timeline>
        <a-timeline-item
          v-for="(a, index) in jsonData2.Infoes"
          v-bind:key="index"
          :color="a.Pebox ? 'green' : 'red'"
        >
          <span v-if="a.UnderAttack > 0" :class="colors[a.DamageType]">
            {{ index + 1 }}：受到了{{ a.UnderAttack.toFixed(2) }}点{{
              Type[a.DamageType]
            }}伤害 </span
          ><span v-else>{{ index + 1 }}：&nbsp;</span>
          <p v-for="tp in a.Tips" v-bind:key="tp.this" class="tips">
            {{ tp }}1
          </p>
        </a-timeline-item>
      </a-timeline>
    </a-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Home from "@/views/Home.vue";
@Component({})
export default class Work extends Vue {
  public visible = false;
  public confirmLoading = false;
  public ModalText = "今日的工作次数已经用完";
  public WorkCount = 0;
  public loading = false;
  public fourElement = [
    localStorage.Courage,
    localStorage.Cautious,
    localStorage.Discipline,
    localStorage.Justice,
  ];
  public Objs = require("@/assets/data/WorkObject.json");
  public warColors = {
    ZAYIN: "green",
    TETH: "blue",
    HE: "yellow",
    WAW: "purple",
    ALEPH: "red",
  };
  public damColors = {
    RED: "red",
    WHITE: "white",
    BLACK: "black",
    PALE: "blue",
  };
  public damType = {
    RED: "物理",
    WHITE: "精神",
    BLACK: "腐蚀",
    PALE: "灵魂",
  };
  public colors = ["red", "white", "black", "blue"];
  public Type = ["物理", "精神", "腐蚀", "灵魂"];
  public nowObj = 0;
  public jsonData2 = {
    Infoes: [],
    User: 0,
    MaxHp: 0,
    MaxSp: 0,
    WorkObjectId: 0,
  };
  public created() {
    document.title = "风铃-收容所";
    //this.nowObj = this.Objs[this.jsonData.WorkObjectId];
    var _this = this;
    if (localStorage.WorkObject == null || localStorage.WorkObject == undefined)
      axios({
        method: "post",
        url: `${Home.url}/user/getWorkObject`,
        data: JSON.stringify({
          relation: localStorage.relation,
        }),
        timeout: 2000,
      })
        .then(function (response) {
          localStorage.WorkObject = response.data.data;
          console.log(response.data);
          _this.nowObj = _this.Objs[response.data.data];
        })
        .catch(function (err) {
          console.log(err);
          console.log("gg");
        });
    else {
      this.nowObj = _this.Objs[localStorage.WorkObject];
    }
  }
  public GetPro(param: any) {
    if (param > 80) return "极高";
    else if (param > 60) return "高";
    else if (param > 40) return "中";
    else if (param > 20) return "低";
    else return "极低";
  }
  public GetLevel(param: any) {
    return (param / 40).toFixed(0);
  }
  public onClickRed() {
    this.sendWork(0);
  }
  public onClickWhite() {
    this.sendWork(1);
  }
  public onClickBlack() {
    this.sendWork(2);
  }
  public onClickPale() {
    this.sendWork(3);
  }
  public sendWork(param: any) {
    var _this = this;
    axios({
      method: "post",
      url: `${Home.url}/user/startWork`,
      data: JSON.stringify({
        relation: localStorage.relation,
        workObject: parseInt(localStorage.WorkObject),
        workType: param,
      }),
      timeout: 2000,
    })
      .then(function (response) {
        var a = response.data;
        if (a.success) {
          _this.loading = true;
          _this.jsonData2 = JSON.parse(a.data);
          console.log(_this.jsonData2);
          localStorage.removeItem("WorkObject");
          _this.WorkCount = 0;
        } else {
          _this.showModal();
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log("gg");
      });
  }
  public showModal() {
    this.visible = true;
  }
  public handleOk() {
    this.confirmLoading = true;
    setTimeout(() => {
      this.visible = false;
      this.confirmLoading = false;
    }, 500);
  }
  public handleCancel() {
    this.visible = false;
  }
}
</script>

<style>
.tips {
  color: rgb(140, 140, 140);
  font-size: 80%;
}
.red {
  color: rgb(255, 62, 62);
}
.white {
  color: rgb(219, 181, 84);
}
.black {
  color: blueviolet;
}
.blue {
  color: dodgerblue;
}
#backRed {
  background-color: rgb(255, 62, 62);
  border: rgb(255, 62, 62);
}
#backWhite {
  background-color: rgb(255, 209, 94);
  border: rgb(255, 209, 94);
  color: black;
}
#backBlack {
  background-color: blueviolet;
  border: blueviolet;
}
#backBlue {
  background-color: dodgerblue;
  border: dodgerblue;
}
</style>
