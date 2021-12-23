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
            <a-button type="danger" @click="starFishing">开始钓鱼</a-button>
          </div>
        </a-spin>
      </div>
      <div v-if="fishAns !== 0">
        <p>
          <a-col :span="24">
            <a-progress
              :percent="((nowFishTarget / max) * 100).toFixed(2)"
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
        _this.moveSpeed += 1600;
        if (_this.moveSpeed > 5000) _this.moveSpeed = 5000;
      }
    };
  }
  public goYourSilder() {
    if (this.nowFishTarget <= this.min) {
      this.fishing = false;
      this.fishAns = 3;
    }
    if (this.nowFishTarget >= this.max) {
      this.fishing = false;
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
    if (this.fishing)
      setTimeout(() => {
        if (this.moveSpeed > -5000) {
          this.moveSpeed -= 50;
        }
        if (this.start >= this.min) {
          this.start += this.moveSpeed * 0.01;
          this.goYourSilder();
        }
      }, 10);
  }
  public goOnce(active: any) {
    if (this.start <= this.min) {
      this.moveSpeed = this.moveSpeed < -1000 ? -1000 : this.moveSpeed;
      this.start = this.min;
    }
    if (this.start + this.length >= this.max) {
      this.moveSpeed = this.moveSpeed > 1000 ? 1000 : this.moveSpeed;
      this.start = this.max - this.length;
    }
    if (this.fishing)
      setTimeout(() => {
        this.goOnce(active);
        if (this.value < 5000) {
          this.value += 5;
        }
      }, 10);
  }
  public showModal() {
    this.visible = true;
    this.fishAns = 0;
    this.HookSuccess();
  }
  public handleOk() {
    this.confirmLoading = true;
    setTimeout(() => {
      this.visible = false;
      this.confirmLoading = false;
      this.fishing = false;
      this.initFish();
    }, 100);
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
    this.goYourSilder();
    this.goOnce(1);
  }
}
</script>

<style>
</style>
