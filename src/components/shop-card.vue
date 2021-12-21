<template>
  <div>
    <div v-for="items in allGoods" v-bind:key="items.this">
      <a-col :span="8">
        <div class="goodCard">
          <div v-if="items.onSale < 100">
            <a-col :span="18" class="Top"></a-col>
            <a-col :span="6" class="Top OnTop OnSale"
              ><b>-{{ items.onSale }}%</b></a-col
            >
          </div>
          <a-card>
            <img slot="cover" alt="example" :src="items.uri" />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="setting" type="copyright" />
              <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta
              :title="items.itemName"
              :description="items.prices + '金币'"
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
export default class ShopCard extends Vue {
  public allGoods!: any;
  public created() {
    this.allGoods = [
      {
        uri: "/img/Work.ce9567d5.png",
        prices: 666,
        onSale: 30,
        itemName: "名字",
      },
      {
        uri: "/img/Work.ce9567d5.png",
        prices: 666,
        onSale: 100,
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
</style>