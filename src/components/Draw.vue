<template>
  <div>
    <a-modal
      title="抽卡内容"
      :visible="modal1Visible"
      @ok="() => setModal1Visible(false)"
      @cancel="() => setModal1Visible(false)"
      :width="1200"
    >
      <a-card style="width: 100%"
        ><a-card-grid
          style="width: 20%; text-align: center"
          v-for="card in resultCard"
          v-bind:key="card.this"
          hoverable
          :class="!card.click ? '' : IndexColor[card.star]"
          @click="
            () => {
              card.click = 1;
            }
          "
        >
          <div v-if="card.click === 1">
            <img
              :src="require('@/assets/cards/' + card.uri + '.jpg')"
              style="width: 100%"
            />
          </div>
          <img v-else src="@/assets/cards/cardBack.jpg" style="width: 100%" />
        </a-card-grid>
      </a-card>
      <a-card style="width: 100%"
        ><a-card-grid
          style="width: 20%; text-align: center"
          v-for="card in resultCard"
          v-bind:key="card.this"
          hoverable
        >
          <h3 v-if="card.click === 1">{{ card.name }}</h3>
          <span v-if="card.click === 1 && card.star > 0">
            <span v-for="i in card.star" v-bind:key="i"
              ><a-icon type="star" theme="filled" style="color: #ffda2c"
            /></span>
          </span>
        </a-card-grid>
      </a-card>
    </a-modal>
    <a-row>
      <a-col :span="24" style="margin: 20px">
        <img src="@/assets/img/Up2021-12-23.jpg" class="drawUp" />
      </a-col>
    </a-row>
    <a-row>
      <a-button type="primary" class="drawButton" @click="onClickCard">
        开启卡包！
      </a-button></a-row
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Draw extends Vue {
  IndexColor = ["zero", "one", "two", "three", "four", "five"];
  resultCard = [{}];
  cards = require("@/assets/data/CardData.json");
  public created() {
    document.title = "风铃-抽卡";
  }
  onClickCard() {
    this.setModal1Visible(true);
    this.resultCard = [];
    for (let i = 0; i < 5; i++) {
      var it = Math.floor(Math.random() * this.cards.length);
      this.cards.forEach((element: any) => {
        if (element.id == it) {
          var ps = {
            click: 0,
            name: element.name,
            uri: element.uri,
            star: parseInt(element.star),
          };
          this.resultCard.push(ps);
          console.log(ps);
        }
      });
    }
  }
  setModal1Visible(visible: any) {
    this.modal1Visible = visible;
  }
  modal1Visible = false;
}
</script>

<style>
.drawUp {
  width: 80%;
  height: 80%;
}
.drawButton {
  width: 500px;
  height: 120px;
  margin-bottom: 20px;
}
.three {
  background: rgb(129, 129, 129);
}
.four {
  background: rgb(108, 123, 255);
}
.five {
  background: rgb(255, 215, 82);
}
</style>
