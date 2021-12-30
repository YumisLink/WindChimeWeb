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
      <p>
        您确认花费<span class="notice"
          >{{ prices }}<img src="@/assets/icon/Pebox.png" class="icon" /></span
        >来购买<span class="notice">{{ desc }}</span>
      </p>
    </a-modal>
    <div v-for="items in allGoods" v-bind:key="items.goodsId">
      <a-col :sm="6" :xs="24">
        <div class="goodCard">
          <div v-if="items.discount > 0">
            <a-col :span="18" class="Top"></a-col>
            <a-col :span="6" class="Top OnTop OnSale"
              ><b>-{{ items.discount }}%</b></a-col
            >
          </div>
          <a-card>
            <img
              :src="
                require('@/assets/cards/' +
                  it[items.goodsId].englishName +
                  '.jpg')
              "
              class=""
            />
            <template slot="actions" class="ant-card-actions">
              <span
                @click="
                  showModal(items.goodsId, items.description, items.price)
                "
              >
                <a-icon key="setting" type="copyright" />
                购买
              </span>
            </template>
            <a-card-meta
              :title="items.name"
              :description="
                items.price * (100 - items.discount) * 0.01 +
                'Pebox' +
                KeyValue[items.position]
              "
            >
            </a-card-meta>
            {{ items.description }}
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
import axios from "axios";
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
@Component({})
export default class ShopJewelry extends Vue {
  public allGoods = [{}];
  public it = require("@/assets/data/Items.json");
  buyId = 0;
  public KeyValue = {
    head: "头饰",
    earring: "耳环",
    necklace: "项链",
    bracelet: "手镯",
    ring: "戒指",
  };
  public created() {
    this.allGoods = [];
    var _this = this;
    axios({
      method: "post",
      url: `${Home.url}${Home.refreshShop}`,
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        token: localStorage.relation,
      }),
      timeout: 1000,
    })
      .then(function (response) {})
      .catch(function (err) {
        _this.error("网络错误");
      });

    axios({
      method: "post",
      url: `${Home.url}${Home.getRelics}`,
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        token: localStorage.relation,
        id: _this.buyId,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        _this.allGoods = response.data.data;
      })
      .catch(function (err) {
        _this.error("网络错误");
      });
  }
  Buy() {
    var _this = this;
    axios({
      method: "post",
      url: `${Home.url}${Home.buyRelics}`,
      data: JSON.stringify({
        token: localStorage.relation,
        id: _this.buyId,
      }),
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        if (a.success) {
          _this.success("购买成功！");
        } else {
          _this.error("Pebox不足");
        }
      })
      .catch(function (err) {
        _this.error(err);
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
  visible = false;
  desc = "";
  prices = 1;
  uri = "";
  showModal(id: any, desc: any, prices: any) {
    this.visible = true;
    this.buyId = id;
    this.desc = desc;
    this.prices = prices;
  }
  handleOk() {
    this.Buy();
    this.visible = false;
  }
  handleCancel() {
    this.visible = false;
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
  width: 80%;
  height: 150%;
}
</style>