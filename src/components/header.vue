<template>
  <div>
    <a-menu v-model="current" mode="horizontal" id="header-center">
      <!-- <a-menu-item key="jiji" class="col-md-5"> asd</a-menu-item> -->
      <a-col :span="2"></a-col>

      <a-menu-item key="mail" @click="onMainClick">
        <a-icon type="crown" theme="twoTone" />主页
      </a-menu-item>
      <a-menu-item key="A" @click="onShopClick">
        <a-icon type="bank" />商店（未实现）
      </a-menu-item>
      <a-menu-item key="B" @click="onWorkClick">
        <a-icon type="tool" />工作
      </a-menu-item>
      <a-menu-item key="center" @click="onDrawClick">
        <a-icon type="star" theme="filled" />抽卡（未实现）
      </a-menu-item>
      <a-menu-item key="decorator" @click="onFishClick">
        <i
          data-v-29e8c3c6=""
          aria-label="icon: appstore"
          class="anticon anticon-appstore"
        >
          <svg
            viewBox="256 256 512 512"
            data-icon="appstore"
            width="1em"
            height="1em"
            fill="currentColor"
            class=""
          >
            <path
              d="M0.370151 0h1024v1024H0.370151z"
              fill="#FFFFFF"
              p-id="5139"
            ></path>
            <path
              d="M655.89802 346.011279c-0.839344-0.839344-0.839344-1.678689-1.678689-2.518033-2.518033-1.678689-4.196721 0.839344-5.87541 2.518033l-73.862295 73.862295c-1.678689 1.678689-5.036066 3.357377-2.518033 6.714754 2.518033 2.518033 4.196721-0.839344 5.87541-2.518033l73.862295-73.862295 4.196722-4.196721M460.330807 539.899803c0-0.839344-0.839344-1.678689-1.678689-1.678688-2.518033-0.839344-3.357377 0.839344-5.036066 2.518033l-75.540983 75.540983c-1.678689 1.678689-5.036066 3.357377-1.678689 6.714754 2.518033 1.678689 4.196721-0.839344 5.87541-2.518033l75.540984-75.540983c1.678689-1.678689 2.518033-2.518033 2.518033-5.036066m97.363934-95.685246c0-1.678689-0.839344-2.518033-1.678689-3.357377-2.518033-0.839344-4.196721 1.678689-5.875409 3.357377l-73.862295 73.862295c-1.678689 1.678689-5.036066 3.357377-2.518033 5.87541 3.357377 3.357377 5.036066-0.839344 6.714754-2.518032l73.862295-73.862296c1.678689-0.839344 2.518033-2.518033 3.357377-3.357377M754.101298 247.808c-0.839344-0.839344-0.839344-1.678689-1.678688-2.518033-2.518033-1.678689-4.196721 0.839344-5.87541 2.518033L671.845561 322.509639c-1.678689 1.678689-5.036066 3.357377-2.518033 6.714754 2.518033 2.518033 4.196721-0.839344 5.87541-2.518032l74.701639-74.70164c2.518033-1.678689 3.357377-3.357377 4.196721-4.196721M421.72097 698.535869c18.465574 0 34.413115-15.108197 35.25246-33.573771 0-18.465574-15.947541-35.252459-34.413115-35.252459-19.304918 0-33.57377 15.108197-34.413115 34.413115 0 19.304918 15.108197 34.413115 33.57377 34.413115m-54.557377-50.360656c0-8.393443-4.196721-12.590164-10.072131-15.108197-6.714754-3.357377-12.590164-0.839344-17.626229 4.196722-28.537705 29.377049-57.914754 57.914754-86.452459 86.452459-7.554098 7.554098-7.554098 15.947541-0.839344 22.662295 6.714754 6.714754 15.108197 6.714754 21.82295-0.839344 29.377049-28.537705 57.914754-57.914754 87.291804-87.291804 3.357377-2.518033 5.87541-5.87541 5.875409-10.072131M758.29802 274.667016l-335.737705 335.737705c2.518033 0.839344 6.714754 0.839344 10.072131 1.678689 25.180328 5.87541 43.645902 27.698361 43.645902 52.878688s-18.465574 47.842623-43.645902 53.718033c-24.340984 5.036066-49.521311-7.554098-60.432787-30.216393-4.196721-8.393443-4.196721-9.232787-10.911475-2.518033l-73.862295 73.862295C277.353757 769.880131 265.602938 774.076852 252.17343 769.040787c-14.268852-5.036066-22.662295-15.108197-25.180328-30.216394-1.678689-10.072131 2.518033-18.465574 9.232787-25.180327 30.216393-31.055738 61.272131-62.111475 92.327868-92.327869 5.036066-5.036066 10.911475-7.554098 17.62623-8.393443 7.554098 0 11.75082-4.196721 15.947541-8.393443L736.475069 230.18177c2.518033-2.518033 5.036066-5.036066 7.554098-6.714754 5.036066-4.196721 10.072131-4.196721 15.108197 0 5.87541 5.036066 10.911475 10.911475 16.786885 16.786886 3.357377 3.357377 4.196721 8.393443 4.196721 12.590164V635.585049c0 5.87541 1.678689 9.232787 5.87541 11.75082 15.947541 11.75082 15.108197 32.734426 0 44.485246-4.196721 3.357377-5.87541 5.87541-5.87541 11.750819 0 14.268852 0.839344 28.537705 0 43.645902-0.839344 22.662295-18.465574 41.127869-40.288524 43.645902-23.501639 2.518033-44.485246-11.75082-49.521312-34.413115-0.839344-4.196721-4.196721-9.232787 3.357377-11.75082 8.393443-2.518033 14.268852 0 15.947541 6.714754 5.036066 15.108197 15.947541 21.822951 30.216394 19.304918 11.75082-1.678689 20.144262-12.590164 20.144262-26.859016v-40.288525c0-5.87541-1.678689-8.393443-5.87541-11.750819-15.108197-10.911475-15.947541-32.734426 0-43.645902 5.036066-3.357377 6.714754-7.554098 6.714754-13.429508V381.263738 283.060459c-1.678689-3.357377-0.839344-6.714754-2.518032-8.393443"
              fill="#27292A"
              p-id="5140"
            ></path>
            <path
              d="M450.258675 664.760656c0 15.108197-11.75082 27.698361-26.859016 27.69836a28.537705 28.537705 0 0 1-28.537705-26.859016c0-15.108197 11.75082-27.698361 27.698361-28.537705 15.108197 0 26.859016 11.75082 27.69836 27.698361"
              fill="#DF9562"
              p-id="5141"
            ></path>
          </svg>
        </i>
        钓鱼（未实现）
      </a-menu-item>
      <a-menu-item key="export" @click="onJewelryClick">
        <a-icon type="sketch" />饰品（未实现）
      </a-menu-item>
      <!-- <a-menu-item key="f"> <a-icon type="appstore" />控制</a-menu-item> -->
      <a-avatar class="a-avatar BigMarginRight">
        <a-icon slot="icon" type="user" />
      </a-avatar>
      <a-badge style="float: right; margin-top: 17px"> {{ name }} </a-badge>
    </a-menu>
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-content justify="space-around" align="middle">
        <a-col :span="1"></a-col>
        <a-col :span="22" class="context">
          <template v-if="page === 'Main'"><Main></Main></template>
          <template v-if="page === 'Shop'"><Shop></Shop></template>
          <template v-if="page === 'Work'"><Work></Work></template>
          <template v-if="page === 'Draw'"><Draw></Draw></template>
          <template v-if="page === 'Fish'"><Fish></Fish></template>
          <template v-if="page === 'Jewelry'"><Jewelry></Jewelry></template>
        </a-col>
        <a-col :span="1"> </a-col>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Main from "@/components/Main.vue";
import Shop from "@/components/Shop.vue";
import Work from "@/components/Work.vue";
import Draw from "@/components/Draw.vue";
import Fish from "@/components/Fish.vue";
import Jewelry from "@/components/Jewelry.vue";
@Component({
  components: {
    Main,
    Shop,
    Work,
    Draw,
    Fish,
    Jewelry,
  },
})
export default class Header extends Vue {
  public name = "";
  public created() {
    this.name = localStorage.name ? "" : localStorage.name;
  }
  public current = [];
  public page = "Main";
  public onMainClick() {
    this.page = "Main";
  }
  public onShopClick() {
    this.page = "Shop";
  }
  public onWorkClick() {
    this.page = "Work";
  }
  public onDrawClick() {
    this.page = "Draw";
  }
  public onFishClick() {
    this.page = "Fish";
  }
  public onJewelryClick() {
    this.page = "Jewelry";
  }
}
</script>

<style scoped>
.a-avatar {
  margin-top: 8px;
  margin-left: 20px;
  margin-right: 50px;
  float: right;
}
.BigMarginLeft {
}
</style>