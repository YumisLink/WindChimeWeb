<template>
  <div>
    <a-modal
      title="请理智消费"
      :visible="visible"
      okText="确认购买"
      cancelText="没钱算了，回家了。"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <!-- <h1>请理智消费!</h1> -->
      <p v-if="uri !== null">
        <img :src="require('@/assets' + uri)" alt="" style="width: 100%" />
      </p>
      <p>
        您确认花费<span class="notice"
          >{{ prices }}<img src="@/assets/icon/Coin.png" class="icon" /></span
        >来购买<span class="notice">{{ desc }}</span>
      </p>
    </a-modal>
    <div v-for="items in allGoods" v-bind:key="items.this">
      <a-col :sm="6" :xs="24">
        <div class="goodCard">
          <div v-if="items.onSale > 0">
            <a-col :span="18" class="Top"></a-col>
            <a-col :span="6" class="Top OnTop OnSale"
              ><b>-{{ items.onSale }}%</b></a-col
            >
          </div>
          <div v-if="items.Desc !== null">
            <a-col :span="12" class="Top"></a-col>
            <a-col :span="12" class="Top OnTop Desc">
              <b>{{ items.Desc }}</b>
            </a-col>
          </div>
          <a-card>
            <img
              alt="example"
              :src="require('@/assets' + items.uri)"
              class="shopItemImg"
            />
            <template slot="actions" class="ant-card-actions">
              <a-icon
                key="account-book"
                type="account-book"
                @click="
                  showModal(items.id, items.itemName, items.prices, items.uri)
                "
              />
              <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta
              :title="items.itemName"
              :description="items.prices * (100 - items.onSale) * 0.01 + '金币'"
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
import { Modal } from "ant-design-vue";
import Home from "@/views/Home.vue";
import axios, { Axios } from "axios";
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
@Component({})
export default class ShopCard extends Vue {
  public allGoods!: any;
  public created() {
    this.allGoods = [
      {
        id: 1,
        uri: "/img/Fate1.png",
        prices: 6,
        onSale: 0,
        itemName: "一些相遇之缘（6个）",
        Desc: null,
      },
      {
        id: 2,
        uri: "/img/Fate2.png",
        prices: 30,
        onSale: 0,
        itemName: "一组相遇之缘（30个）",
        Desc: "额外获得3个",
      },
      {
        id: 3,
        uri: "/img/Fate3.png",
        prices: 98,
        onSale: 0,
        itemName: "一袋相遇之缘（98个）",
        Desc: "额外获得10个",
      },
      {
        id: 4,
        uri: "/img/Fate4.png",
        prices: 198,
        onSale: 0,
        itemName: "一盒相遇之缘（198个）",
        Desc: "额外获得25个",
      },
      {
        id: 5,
        uri: "/img/Fate5.png",
        prices: 328,
        onSale: 0,
        itemName: "一箱相遇之缘（328个）",
        Desc: "额外获得60个",
      },
      {
        id: 6,
        uri: "/img/Fate6.png",
        prices: 648,
        onSale: 0,
        itemName: "一集装箱相遇之缘（648个）",
        Desc: "额外获得138个",
      },
    ];
  }
  showModal(id: any, desc: any, prices: any, uri: any) {
    this.visible = true;
    this.buyId = id;
    this.desc = desc;
    this.prices = prices;
    this.uri = uri;
  }
  handleOk() {
    this.Buy();
    this.visible = false; 
  }
  handleCancel() {
    this.visible = false;
  }
  buyId = 0;
  visible = false;
  prices = "";
  desc = "";
  uri = null;
  Buy() {
    var _this = this;
    axios({
      method: "post",
      url: `${Home.url}${Home.buyFate}`,
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        token: localStorage.relation,
        id: _this.buyId,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        _this.success("购买成功");
      })
      .catch(function (err) {
        _this.error("网络错误");
      });
  }
  public success(content: any) {
    this.$success({
      title: "购买成功！",
      content: content,
    });
  }
  public error(content: any) {
    this.$error({
      title: "错误！",
      content: content,
    });
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
.Desc {
  background: rgb(255, 200, 49);
  font-size: 120%;
  font: bolder;
}

.shopItemImg {
  width: 50%;
}
.notice {
  color: rgb(255, 65, 65);
  font-size: 120%;
}
</style>