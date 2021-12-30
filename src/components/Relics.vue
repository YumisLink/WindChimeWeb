<template>
  <div>
    <a-modal
      title="强化成功！"
      :visible="visible"
      @ok="handleOk"
      :closable="false"
      :cancelText="'cancelText'"
    >
      <h2>
        等级提升{{ jsonData[sval].level - 1 }}->{{ jsonData[sval].level }}
      </h2>
      <p>
        <span v-for="j in LevelUp.change" v-bind:key="j.this">
          <span v-if="jsonData[sval].primary.type === j.type">
            {{ typeList[j.type] }}：{{
              jsonData[sval].primary.value - j.value
            }}->{{ jsonData[sval].primary.value }}
          </span>
        </span>
      </p>
      <p v-for="i in jsonData[sval].minor" v-bind:key="i.this">
        <span v-for="j in LevelUp.change" v-bind:key="j.this">
          <span v-if="i.type === j.type">
            {{ typeList[i.type] }}：{{ i.value - j.value
            }}<span v-if="i.type > 4">%</span>->{{ i.value
            }}<span v-if="i.type > 4">%</span>
          </span>
        </span>
      </p>
    </a-modal>
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

          <a-menu style="width: 100%" mode="inline" @click="handleClick">
            <a-sub-menu key="sub1">
              <span slot="title" class="textCenter"><span>头饰</span></span>
              <a-menu-item-group
                v-for="group in AllCurrent"
                v-bind:key="'a' + group.this"
              >
                <template slot="title">
                  <span>{{ group }}</span>
                </template>
                <template
                  v-for="(items, index) in jsonData"
                  v-bind="'a' + index.this"
                >
                  <a-menu-item
                    v-if="
                      its[items.id].group === group &&
                      its[items.id].position === 'head'
                    "
                    :key="index"
                  >
                    +{{ items.level }}{{ its[items.id].name }}
                  </a-menu-item>
                </template>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><span>耳环</span></span
              ><a-menu-item-group
                v-for="group in AllCurrent"
                v-bind:key="'b' + group.this"
              >
                <template slot="title">
                  <span>{{ group }}</span>
                </template>
                <template
                  v-for="(items, index) in jsonData"
                  v-bind="'b' + index.this"
                >
                  <a-menu-item
                    v-if="
                      its[items.id].group === group &&
                      its[items.id].position === 'earring'
                    "
                    :key="index"
                  >
                    +{{ items.level }}{{ its[items.id].name }}
                  </a-menu-item>
                </template>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><span>项链</span></span
              ><a-menu-item-group
                v-for="group in AllCurrent"
                v-bind:key="'c' + group.this"
              >
                <template slot="title">
                  <span>{{ group }}</span>
                </template>
                <template
                  v-for="(items, index) in jsonData"
                  v-bind="'c' + index.this"
                >
                  <a-menu-item
                    v-if="
                      its[items.id].group === group &&
                      its[items.id].position === 'necklace'
                    "
                    :key="index"
                  >
                    +{{ items.level }}{{ its[items.id].name }}
                  </a-menu-item>
                </template>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title"><span>手镯</span></span
              ><a-menu-item-group
                v-for="group in AllCurrent"
                v-bind:key="'d' + group.this"
              >
                <template slot="title">
                  <span>{{ group }}</span>
                </template>
                <template
                  v-for="(items, index) in jsonData"
                  v-bind="'d' + index.this"
                >
                  <a-menu-item
                    v-if="
                      its[items.id].group === group &&
                      its[items.id].position === 'bracelet'
                    "
                    :key="index"
                  >
                    +{{ items.level }}{{ its[items.id].name }}
                  </a-menu-item>
                </template>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="sub5">
              <span slot="title"><span>戒指</span></span
              ><a-menu-item-group
                v-for="group in AllCurrent"
                v-bind:key="'e' + group.this"
              >
                <template slot="title">
                  <span>{{ group }}</span>
                </template>
                <template
                  v-for="(items, index) in jsonData"
                  v-bind="'e' + index.this"
                >
                  <a-menu-item
                    v-if="
                      its[items.id].group === group &&
                      its[items.id].position === 'ring'
                    "
                    :key="index"
                  >
                    +{{ items.level }}{{ its[items.id].name }}
                  </a-menu-item>
                </template>
              </a-menu-item-group>
            </a-sub-menu>
          </a-menu>
        </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="19" v-if="init">
          <a-col :span="20">
            <h1>+{{ Target.level }} {{ its[Target.id].name }}</h1>
            <h2>
              {{ typeList[Target.primary.type] }}：{{ Target.primary.value
              }}<span v-if="Target.primary.type > 4">%</span>
            </h2>
            <p v-for="k in Target.minor" v-bind:key="k.this">
              {{ typeList[k.type] }}：{{ k.value }}
              <span v-if="k.type > 4">%</span>
            </p>
            <a-button type="primary" @click="up"> 强化1级 </a-button>
            <p></p>
            <!-- <a-button type="primary"> 出售 </a-button>
            <span
              >预计可卖出{{ 0 }}<img src="@/assets/icon/Coin.png" class="icon"
            /></span> -->
          </a-col>
          <a-col :span="4">
            <img
              :src="
                require('@/assets/cards/' + its[Target.id].englishName + '.jpg')
              "
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
import Home from "@/views/Home.vue";
import axios from "axios";
@Component({})
export default class Jewelry extends Vue {
  public current = ["mail"];
  public init = false;
  public openKeys = ["sub1"];
  public AllCurrent = ["Malkuth", "Yesod"];
  public jsonData = [
    {
      id: 0,
      level: 4,
      uriName: "SlientHead",
      name: "乐团礼帽",
      group: "Malkuth",
      primary: {
        type: 2,
        value: 7,
      },
      minor: [],
    },
  ];
  public LevelUp = {
    change: [{ type: 1, value: 2 }],
    relics: {
      id: 0,
      level: 4,
      uriName: "SlientHead",
      name: "乐团礼帽",
      group: "Malkuth",
      primary: {
        type: 1,
        value: 7,
      },
      minor: [],
    },
  };
  public its = require("@/assets/data/Items.json");
  public typeList = [
    "",
    "生命值",
    "攻击力",
    "速度",
    "防御力",
    "伤害",
    "暴击率",
    "暴击伤害",
    "生命值",
    "攻击力",
    "速度",
    "防御力",
    "物理伤害",
    "精神伤害",
    "腐蚀伤害",
    "灵魂伤害",
    "物理抗性",
    "精神抗性",
    "腐蚀抗性",
    "灵魂抗性",
  ];
  public success = false;
  public created() {
    document.title = "风铃-强化";
    var _this = this;
    console.log(this.jsonData);
    axios
      .post(`${Home.url}${Home.getUserRelics}`, {
        token: localStorage.relation,
      })
      .then(function (response) {
        console.log("response");
        console.log(response);
        if (_this.jsonData == null) return;
        _this.jsonData = response.data.data;
        _this.jsonData.forEach((element) => {
          if (!_this.AllCurrent.includes(_this.its[element.id].group)) {
            _this.AllCurrent.push(_this.its[element.id].group);
          }
        });
        _this.init = true;
        _this.Target = _this.jsonData[0];
      });
  }
  public sval = 0;

  public Target = this.jsonData[0];
  @Watch("openKeys")
  handleClick(val: any) {
    console.log(val);
    this.sval = val.key;
    this.Target = this.jsonData[val.key];
  }
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  collapsed = false;
  visible = false;

  showModal() {
    this.visible = true;
  }
  handleOk() {
    this.visible = false;
  }
  up() {
    var _this = this;
    this.showModal();
    axios({
      method: "post",
      url: `${Home.url}${Home.StrongRelics}`,
      data: JSON.stringify({
        token: localStorage.relation,
        id: _this.sval,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        if (!response.data.success) return;
        console.log(a.data);
        _this.LevelUp = a.data;
        _this.jsonData[_this.sval] = a.data.relics;
        _this.Target = _this.jsonData[_this.sval];
      })
      .catch(function (err) {
        Home._this.error("jb");
        // window.location.href = "/login";
      });
  }
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
