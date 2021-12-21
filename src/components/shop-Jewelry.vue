<template>
  <div>
    <div v-for="items in allGoods" v-bind:key="items.this">
      <a-col :span="6">
        <div class="goodCard">
          <div v-if="items.onSale > 0">
            <a-col :span="18" class="Top"></a-col>
            <a-col :span="6" class="Top OnTop OnSale"
              ><b>-{{ items.onSale }}%</b></a-col
            >
          </div>
          <a-card>
            <img alt="example" :src="items.uri" class="shopItemImg" />
            <template slot="actions" class="ant-card-actions">
              <span>
                <a-icon key="setting" type="copyright" />
                购买
              </span>
              <span>
                <a-icon key="setting" type="copyright" />
                购买
              </span>
            </template>
            <a-card-meta
              :title="items.itemName"
              :description="
                items.prices * (100 - items.onSale) * 0.01 +
                '金币  ' +
                KeyValue[items.position]
              "
            >
            </a-card-meta>
          </a-card>
        </div>
      </a-col>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ShopJewelry extends Vue {
  public allGoods!: any;
  public KeyValue = {
    head: "头部",
    chest: "项链",
  };
  public created() {
    this.allGoods = [
      {
        uri: "/img/Work.ce9567d5.png",
        prices: 666,
        onSale: 30,
        position: "head",
        itemName: "名字",
      },
      {
        uri: "/img/Work.ce9567d5.png",
        prices: 666,
        onSale: 85,
        position: "chest",
        itemName: 114514,
      },
    ];
  }
}
</script>

<style>
.goodCard {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.Top {
  z-index: 99;
}
.OnTop {
  margin-top: 10px;
}
.OnSale {
  background: green;
  font-size: 120%;
  font: bolder;
}
.shopItemImg {
  width: 50%;
}
</style>