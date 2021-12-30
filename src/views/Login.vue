<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Home from "@/views/Home.vue";

@Component({
  components: { Home },
})
export default class Login extends Vue {
  public page = "Login";
  public mounted() {
    this.$emit("page", this);
  }
  jsonData = { data: {} };
  public created() {
    document.title = "wsnb";
    // Home.Anx(
    //   `${Home.url}${Home.login}`,
    //   JSON.stringify({ UserName: "Yumis", Password: "xuanr,2001" }),
    //   this
    // ).then(() => {
    //   localStorage.relation = this.jsonData;
    //   console.log(this.jsonData);
    // });
    axios({
      method: "post",
      url: `${Home.url}/user/login`,
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        // account: "Yumis",
        // password: "xuanr,2001",
        account: "KSGFK",
        password: "114514",
      }),
      timeout: 1000,
    })
      .then(function (response) {
        localStorage.relation = response.data.data;
        window.location.href = "/";
      })
      .catch(function (err) {
        window.alert("gg");
        //window.location.href = "http://www.yumiswindchime.cn:8085/Login.html";
      });
  }
}
</script>
