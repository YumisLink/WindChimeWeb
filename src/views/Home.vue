<template>
  <div class="home">
    <Head></Head>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Head from "@/components/header.vue";
var Event = new Vue();
@Component({
  components: {
    Head,
  },
})
export default class Home extends Vue {
  public static url = "//center.yumiswindchime.cn:1919";
  public page = "Main";
}
</script>
