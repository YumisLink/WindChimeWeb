<template>
  <div class="home">
    <Head></Head>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import axios from "axios";
import Head from "@/components/header.vue";
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
var Event = new Vue();
@Component({
  components: {
    Head,
  },
})
export default class Home extends Vue {
  public static _this: any;
  // public static url = "//center.yumiswindchime.cn:1919";
  public static url = "http://172.23.160.31:8080/windchime";
  public static login = "/user/login";
  public static getUserMessage = "/user/getUserInfo";
  public static getRelics = "/shop/getItem";
  public static buyRelics = "/shop/buyItem";
  public static buyFate = "/shop/buyFate";
  public static refreshShop = "/shop/refreshShop";
  public static getRefreshTime = "/shop/getRefreshTime";
  public static getUserRelics = "/user/bag/relics";
  public static getFate = "/user/getFate"; // delete
  public static StrongRelics = "/user/strongRelics";
  // public static getMyItem = "/user/getMyItem";

  public created() {
    Home.getUserRelics = "/user/getMyItem";
    Home._this = this;
  }
  public static async Anx(url: any, json: any, saver: any) {
    await axios({
      method: "post",
      url: url,
      headers: { "content-type": "application/json" },
      data: json,
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        if (!a.success) {
          saver.jsonData = null;
        } else {
          saver.jsonData = a.data;
        }
      })
      .catch(function (err) {
        Home._this.error("网络错误！");
      });
  }
  public static async AnxSucc(url: any, json: any, saver: any) {
    await axios({
      method: "post",
      url: url,
      headers: { "content-type": "application/json" },
      data: json,
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        if (!a.success) {
          saver.jsonData = null;
        } else {
          saver.jsonData = a.data;
        }
      })
      .catch(function (err) {
        Home._this.error("网络错误！");
      });
  }
  public static async AnxSaveAt(url: any, json: any, saver: any) {
    await axios({
      method: "post",
      url: url,
      headers: { "content-type": "application/json" },
      data: json,
      timeout: 1000,
    })
      .then(function (response) {
        var a = response.data;
        saver = a.data;
      })
      .catch(function (err) {
        Home._this.error("网络错误！");
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
