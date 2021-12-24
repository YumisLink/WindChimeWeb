<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  public page = "Login";
  public mounted() {
    this.$emit("page", this);
  }
}
</script>
