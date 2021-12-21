<template>
  <div>
    <a-menu v-model="current" mode="horizontal" id="header-center">
      <!-- <a-menu-item key="jiji" class="col-md-5"> asd</a-menu-item> -->
      <a-col :span="1"></a-col>

      <a-menu-item key="mail" class="BigMarginLeft" @click="onMainClick">
        <a-icon type="crown" theme="twoTone" />主页
      </a-menu-item>
      <a-menu-item key="A" @click="onShopClick">
        <a-icon type="appstore" />商店
      </a-menu-item>
      <a-menu-item key="B" @click="onWorkClick">
        <a-icon type="appstore" />工作
      </a-menu-item>
      <a-menu-item key="center"> <a-icon type="appstore" />抽卡 </a-menu-item>
      <a-menu-item key="decorator">
        <a-icon type="appstore" />钓鱼
      </a-menu-item>
      <a-menu-item key="export"> <a-icon type="appstore" />饰品 </a-menu-item>
      <!-- <a-menu-item key="f"> <a-icon type="appstore" />控制</a-menu-item> -->
      <a-avatar class="a-avatar BigMarginRight">
        <a-icon slot="icon" type="user" />
      </a-avatar>
      <a-badge style="float: right; margin-top: 17px"> {{ name }} </a-badge>
    </a-menu>
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-content justify="space-around" align="middle">
        <a-col :span="4"></a-col>
        <a-col :span="18" class="context">
          <template v-if="page === 'Main'"><Main></Main></template>
          <template v-if="page === 'Shop'"><Shop></Shop></template>
        </a-col>
        <a-col :span="4"> </a-col>
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
@Component({
  components: {
    Main,
    Shop,
  },
})
export default class Header extends Vue {
  public current = ["mail"];
  public name = "abcde";
  public page = "Main";
  public onMainClick() {
    this.page = "Main";
  }
  public onShopClick() {
    this.page = "Shop";
  }
  public onWorkClick() {
    console.log(this.page);
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