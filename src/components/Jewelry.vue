<template>
  <div>
    <a-card align="left" style="margin: 20px">
      <a-row>
        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-bottom: 16px"
            @click="toggleCollapsed"
            :inline-collapsed="collapsed"
            class="textCenter"
          >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
          <a-menu
            style="width: 100%"
            :default-selected-keys="['1']"
            mode="inline"
            @click="handleClick"
          >
            <a-sub-menu key="sub1">
              <span slot="title" class="textCenter"><span>头饰</span></span>
              <a-sub-menu key="g1">
                <template slot="title">
                  <span>沉默乐团</span>
                </template>
                <a-menu-item key="1"> +4 乐团礼帽 </a-menu-item>
                <a-menu-item key="2"> +12 乐团礼帽 </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="g2">
                <template slot="title">
                  <span>一无所有</span>
                </template>
                <a-menu-item key="3"> +0 拟态 </a-menu-item>
                <a-menu-item key="4"> +7 拟态 </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><span>耳环</span></span>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><span>项链</span></span>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title"><span>手镯</span></span>
            </a-sub-menu>
            <a-sub-menu key="sub5">
              <span slot="title"><span>戒指</span></span>
            </a-sub-menu>
          </a-menu>
        </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="19">
          <a-col :span="20">
            <h1>+{{ Target.strong }} {{ Target.name }}</h1>
            <h2>
              {{ typeList[Target.primary.type] }}：{{ Target.primary.value }}
            </h2>
            <p v-for="k in Target.minor" v-bind:key="k">
              {{ typeList[k.type] }}：{{ k.value }}
            </p>
            <a-button type="primary"> 强化 </a-button>
          </a-col>
          <a-col :span="4">
            <img
              :src="require('@/assets/SP/' + Target.uriName + '.png')"
              alt=""
              style="float: right"
              width="100%"
            />
          </a-col>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Jewelry extends Vue {
  public current = ["mail"];
  public openKeys = ["sub1"];
  public typeList = {
    attack: "攻击力",
    defense: "防御力",
    speed: "速度",
  };
  public created() {
    document.title = "风铃-强化";
  }
  public jsonData = [
    {
      itemId: 0,
      strong: 4,
      uriName: "SlientHead",
      name: "乐团礼帽",
      primary: {
        type: "attack",
        value: "45.4",
      },
      minor: [
        {
          type: "defense",
          value: "10.5%",
        },
        {
          type: "speed",
          value: "72",
        },
        {
          type: "speed",
          value: "8.5%",
        },
        {
          type: "attack",
          value: "2.4%",
        },
      ],
    },
    {
      itemId: 0,
      strong: 16,
      uriName: "SlientHead",
      name: "乐团礼帽",
      primary: {
        type: "attack",
        value: "165.8",
      },
      minor: [
        {
          type: "defense",
          value: "10.5%",
        },
        {
          type: "speed",
          value: "114514",
        },
      ],
    },
    {
      itemId: 0,
      strong: 0,
      uriName: "nothingHead",
      name: "拟态",
      primary: {
        type: "attack",
        value: "45.4",
      },
      minor: [
        {
          type: "defense",
          value: "10.5%",
        },
        {
          type: "speed",
          value: "72",
        },
        {
          type: "speed",
          value: "8.5%",
        },
        {
          type: "attack",
          value: "2.4%",
        },
      ],
    },
    {
      itemId: 0,
      strong: 7,
      uriName: "nothingHead",
      name: "拟态",
      primary: {
        type: "attack",
        value: "45.4",
      },
      minor: [
        {
          type: "defense",
          value: "10.5%",
        },
        {
          type: "speed",
          value: "72",
        },
        {
          type: "speed",
          value: "8.5%",
        },
        {
          type: "attack",
          value: "2.4%",
        },
      ],
    },
  ];
  public Target = this.jsonData[0];
  @Watch("openKeys")
  handleClick(val: any) {
    console.log(val);
    this.Target = this.jsonData[val.key - 1];
  }
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  collapsed = false;
}
</script>

<style>
.a-sub-menu {
  padding: 5px;
}
.textCenter {
  text-align: center;
}
</style>
