<template>
  <div>
    <a-modal
      title="钓鱼"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @ok="handleOk"
    >
      <div v-if="fishAns === 0">
        <a-spin :spinning="spinning">
          <div class="spin-content">
            <p>
              通过每次点击鼠标来按控制捕鱼条，让鱼保持在捕鱼条内，等到旁边的进度条满了之后就可以将鱼钓上岸。
              左边选择你的渔场，渔场越高级，鱼的活跃度越高。
            </p>
            <a-button type="danger" @click="starFishing">开始钓鱼</a-button>
          </div>
        </a-spin>
      </div>
      <div v-if="fishAns === 2">
        <a-result
          status="success"
          title="Successfully"
          :sub-title="'抓到了' + nowFishPlace + '号地区的鱼！'"
        >
          <template #extra>
            <a-button key="console" type="primary" @click="handleOk">
              Close
            </a-button>
          </template>
        </a-result>
      </div>
      <div v-if="fishAns === 3">
        <a-result status="error" title="Failed" :sub-title="'鱼跑了！！！'">
          <template #extra>
            <a-button key="console" type="primary" @click="handleOk">
              Close
            </a-button>
          </template>
        </a-result>
      </div>
      <div v-if="fishAns !== 0">
        <p>
          <a-col :span="24">
            <a-progress
              :percent="parseFloat(((nowFishTarget / max) * 100).toFixed(2))"
              status="active"
            />
          </a-col>
        </p>
        <p>
          <a-col :span="4"> 你：</a-col>
          <a-col :span="20">
            <a-slider
              range
              :value="[start, start + length]"
              :disabled="disabled"
              :min="min"
              :max="max"
            />
          </a-col>
        </p>
        <p>
          <a-col :span="4"> 鱼：</a-col>
          <a-col :span="20">
            <a-slider
              :value="value"
              disabled
              :included="false"
              :min="min"
              :max="max"
            />
          </a-col>
        </p>
      </div>
    </a-modal>
    <a-row>
      <a-col :span="4">
        <a-menu
          style="width: 100%"
          :default-selected-keys="['1']"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu key="sub1">
            <span slot="title" class="textCenter"><span>钓场</span></span>
            <a-menu-item key="1"> 0-5 家门口的鱼塘 </a-menu-item>
            <a-menu-item key="2"> 6-10 老家的小河 </a-menu-item>
            <a-menu-item key="3"> 11-15 老家的大湖 </a-menu-item>
            <a-menu-item key="4"> 16-20 城市里的黄埔江 </a-menu-item>
            <a-menu-item key="5"> 21-25 内海 </a-menu-item>
            <a-menu-item key="6"> 26-30 北海 </a-menu-item>
            <a-menu-item key="7"> 31-35 大西洋 </a-menu-item>
            <a-menu-item key="8"> 36-40 云海 </a-menu-item>
            <a-menu-item key="9"> 41-45 熔岩海 </a-menu-item>
            <a-menu-item key="10"> 46-50 星海 </a-menu-item>
            <a-menu-item key="11">
              <a-icon
                type="star"
                theme="twoTone"
                two-tone-color="#F7FA46"
              />下水沟
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <a-col :span="1"> </a-col>
      <a-col :span="19">
        <img
          :src="require('@/assets/FishPlace/' + nowFishPlace + '.jpeg')"
          style="width: 100%; height: 700px"
        />
        <a-button type="danger" @click="showModal">开始钓鱼</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Fish extends Vue {
  spinning = true;
  min = 0;
  max = 5000;
  disabled = true;
  start = 0;
  length = 1000;
  value = 2000;
  moveSpeed = -50;
  fishing = false;
  fishAns = 0;
  nowFishPlace = 1;
  nowFishTarget = 100;
  isHook = false;
  public created() {
    var _this = this;
    document.onmousedown = function (event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      e.preventDefault(); //阻止默认事件
      if (e.button === 0) {
        _this.moveSpeed += 2000;
        if (_this.moveSpeed > 5000) _this.moveSpeed = 5000;
      }
    };
  }
  public goYourSilder() {
    if (this.start <= this.min) {
      this.moveSpeed = this.moveSpeed < -1000 ? -1000 : this.moveSpeed;
      this.start = this.min;
    }
    if (this.start + this.length >= this.max) {
      this.moveSpeed = this.moveSpeed > 1000 ? 1000 : this.moveSpeed;
      this.start = this.max - this.length;
    }
    if (this.value < 0) {
      this.value = 0;
    }
    if (this.value > this.max) {
      this.value = this.max;
    }
    if (this.nowFishTarget <= this.min) {
      this.endFishing();
      this.fishAns = 3;
    }
    if (this.nowFishTarget >= this.max) {
      this.endFishing();
      this.fishAns = 2;
    }
    if (this.start <= this.value && this.value <= this.start + this.length) {
      this.disabled = false;
      this.nowFishTarget += 10;
      if (this.nowFishTarget > this.max) this.nowFishTarget = this.max;
    } else {
      this.disabled = true;
      this.nowFishTarget -= 10;
      if (this.nowFishTarget < this.min) this.nowFishTarget = this.min;
    }
    this.moveSpeed -= 7000 * this.deltaTime;
    if (this.start >= this.min) {
      this.start += this.moveSpeed * this.deltaTime;
      // this.goYourSilder();
    }
    if (this.moveSpeed < -5000) this.moveSpeed = -5000;
    // this.tc2 = setTimeout(() => {}, 20);
  }
  public goOnce() {
    // if (this.fishing) this.goOnce(active);
    this.value += this.nowSpeed * this.deltaTime;
    this.nowSpeed +=
      this.nowSpeed > 0
        ? -this.fishJson.fixSpeed * this.deltaTime
        : this.fishJson.fixSpeed * this.deltaTime;
    // this.tc2 = setTimeout(() => {}, 20);
    if (this.nextAction <= 0) {
      var act =
        this.fishJson.action[
          Math.floor(Math.random() * this.fishJson.actionCount)
        ];
      console.log("good");
      if (Math.round(Math.random()) == 0) this.FishSpeed(act.power);
      else this.FishSpeed(-act.power);
      this.nextAction = act.time;
    }
    this.nextAction -= this.deltaTime;
  }
  public showModal() {
    this.visible = true;
    this.fishAns = 0;
    this.HookSuccess();
  }
  public handleOk() {
    this.confirmLoading = true;
    this.visible = false;
    this.confirmLoading = false;
    this.endFishing();
    this.initFish();
  }
  public initFish() {
    this.start = 0;
    this.length = 1000;
    this.value = 0;
    this.moveSpeed = -50;
    this.nowFishTarget = 100;
  }
  visible = false;
  confirmLoading = false;
  public current = ["mail"];
  public openKeys = ["sub1"];
  alertMessage = "寄";

  @Watch("openKeys")
  handleClick(val: any) {
    console.log(val);
    this.nowFishPlace = val.key;
  }
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  collapsed = false;
  public HookSuccess() {
    setTimeout(() => {
      this.spinning = false;
    }, 1000);
  }
  starFishing() {
    this.fishAns = 1;
    this.fishing = true;
    this.initFish();
    cancelAnimationFrame(this.tc);
    var _this = this;
    this.deltaTime = 1;
    let T0 = new Date();
    this.tc = requestAnimationFrame(function fn() {
      let T1 = new Date();
      _this.deltaTime = T1.getTime() - T0.getTime();
      _this.deltaTime /= 1000;
      T0 = T1;
      if (_this.fishing) {
        _this.goYourSilder();
        _this.goOnce();
        _this.tc = requestAnimationFrame(fn);
      } else {
        cancelAnimationFrame(_this.tc);
      }
    });
  }
  lastest = 0;
  endFishing() {
    this.fishing = false;
  }
  FishSpeed(power: any) {
    power = this.nowFishPlace * 0.1 * power + 1 * power;
    this.nowSpeed = power;
    if (power > 0 && this.value + power * 0.5 > this.max)
      this.nowSpeed = -power;
    if (power < 0 && this.value + power * 0.5 < this.min)
      this.nowSpeed = -power;
  }
  fishJson = {
    fixSpeed: 1000,
    action: [
      { power: 1000, time: 1 },
      { power: 1000, time: 1 },
      { power: 1000, time: 1 },
      { power: 1000, time: 1 },
      { power: 1000, time: 1 },
      { power: 800, time: 1 },
      { power: 800, time: 1 },
      { power: 800, time: 1 },
      { power: 800, time: 1 },
      { power: 800, time: 1 },
      { power: 1500, time: 1 },
      { power: 1500, time: 1 },
      { power: 1500, time: 1 },
      { power: 1500, time: 1 },
      { power: 1500, time: 1 },
      { power: 2500, time: 1 },
    ],
    actionCount: 16,
  };
  nextAction = 0;
  nowSpeed = 0;
  tc!: any;
  deltaTime = 0;
  // t =
}
</script>

<style>
</style>
