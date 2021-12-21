<template>
  <a-col>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)">
      <img class="icon" src="@/assets/Icon/Coin.png" />金币：{{ Money }}
      <img class="icon" src="@/assets/Icon/Pebox.png" />Pebox：{{ Pebox }}
    </a-page-header>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail" @click="onCardClick">
        <a-icon type="book" />卡牌包
      </a-menu-item>
      <a-menu-item key="app" @click="onJewelryClick">
        <a-icon type="sketch" />饰品商店
      </a-menu-item>
    </a-menu>
    <div>
      <template v-if="Shop === 'Card'"><ShopCard></ShopCard></template>
      <template v-if="Shop === 'Jewelry'"><ShopJewelry></ShopJewelry></template>
    </div>
  </a-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ShopCard from "@/components/shop-card.vue";
import ShopJewelry from "@/components/shop-Jewelry.vue";
@Component({
  components: {
    ShopCard,
    ShopJewelry,
  },
})
export default class Main extends Vue {
  public Shop = "Card";
  public current = ["mail"];
  Money = 0;
  Pebox = 0;
  public static Place = "Main";
  public created() {
    document.title = "风铃-商店";
    this.Money = localStorage.Money ? 0 : localStorage.Money;
    this.Pebox = localStorage.Pebox ? 0 : localStorage.Pebox;
  }
  public onCardClick() {
    this.Shop = "Card";
    console.log(this.Shop);
  }
  public onJewelryClick() {
    this.Shop = "Jewelry";
    console.log(this.Shop);
  }
}
</script>

<style >
.out {
  font-size: 120%;
}
.icon {
  width: 25px;
  height: 25px;
}
</style>