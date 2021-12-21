<template>
  <div>
    <a-col :span="24">
      <a-card align="left" style="margin: 20px">
        <h2 style="color: black">{{ 1 }}</h2>
      </a-card>
    </a-col>
    <a-col :span="8" align="left" class="Top"></a-col>
    <a-col :span="12" align="left" style="margin-top: 50px">
      <a-timeline>
        <a-timeline-item
          v-for="a in jsonData.Infoes"
          v-bind:key="a.this"
          :color="a.Pebox ? 'green' : 'red'"
        >
          <span v-if="a.UnderAttack > 0" :class="colors[a.DamageType]">
            受到了{{ a.UnderAttack.toFixed(2) }}点{{ Type[a.DamageType] }}伤害
            <p class="tips">gg</p></span
          ><span v-else>&nbsp;</span>
        </a-timeline-item>
      </a-timeline>
    </a-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Work extends Vue {
  public colors = ["red", "white", "black", "blue"];
  public Type = ["物理", "精神", "腐蚀", "灵魂"];
  public jsonData = {
    game: {
      id: "cn.yumiswindchime.WindChime-Work",
      version: 0.01,
      type: 1,
      target: 635691684,
    },
    Infoes: [
      {
        Pebox: false,
        UnderAttack: 1.0725269,
        DamageType: 1,
        Tips: [],
      },
      {
        Pebox: false,
        UnderAttack: 1.8271807,
        DamageType: 1,
        Tips: [],
      },
      {
        Pebox: false,
        UnderAttack: 1.5496254,
        DamageType: 1,
        Tips: [],
      },
      {
        Pebox: true,
        UnderAttack: 0,
        DamageType: 0,
        Tips: ["受到了额外1点物理伤害"],
      },
      {
        Pebox: true,
        UnderAttack: 0,
        DamageType: 0,
        Tips: ["受到了额外2点物理伤害"],
      },
      {
        Pebox: false,
        UnderAttack: 1.427789,
        DamageType: 1,
        Tips: [],
      },
      {
        Pebox: true,
        UnderAttack: 0,
        DamageType: 0,
        Tips: ["受到了额外1点物理伤害"],
      },
      {
        Pebox: false,
        UnderAttack: 1.3816144,
        DamageType: 1,
        Tips: [],
      },
      {
        Pebox: false,
        UnderAttack: 1.8376572,
        DamageType: 1,
        Tips: [],
      },
      {
        Pebox: false,
        UnderAttack: 1.8668188,
        DamageType: 1,
        Tips: [],
      },
    ],
    User: 635691684,
    MaxHp: 186,
    MaxSp: 71.1,
    WorkObjectId: 0,
  };
}
</script>

<style>
.tips {
  color: rgb(140, 140, 140);
  font-size: 80%;
}
.red {
  color: red;
}
.white {
  color: rgb(240, 195, 81);
}
.black {
  color: blueviolet;
}
.blue {
  color: aquamarine;
}
</style>
