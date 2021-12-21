<template>
  <div class="home">
    <Head></Head>
    <div v-if="page === 'Main'"><Main></Main></div>
    <div v-if="page === 'Shop'"><Shop></Shop></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Head from "@/components/header.vue";
import Main from "@/components/Main.vue";
import Shop from "@/components/Shop.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

@Component({
  components: {
    Head,
    Shop,
    Main,
  },
})
export default class Home extends Vue {
  public page = "Main";
  public mounted() {
    this.$emit("page", this);
  }
}
</script>
