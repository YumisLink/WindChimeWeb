<template>
  <div>
    <a-modal
      title="抽卡内容"
      :visible="modal1Visible"
      @ok="() => setModal1Visible(false)"
      @cancel="() => setModal1Visible(false)"
      :width="1200"
    >
      <a-row>
        <a-col :span="4.5">
          <a-card style="width: 100%"
            ><a-card-grid
              style="width: 20%; text-align: center"
              v-for="card in resultCard"
              v-bind:key="card.this"
              hoverable
              @click="
                () => {
                  card.click = 1;
                }
              "
            >
              <div v-if="card.click === 1">
                <img
                  :src="require('@/assets/cards/' + card.name + '.jpg')"
                  style="width: 100%"
                />
                {{ cardsIndex[card.name] }}
                {{ card.name }}
              </div>
              <img
                v-else
                src="@/assets/cards/cardBack.jpg"
                style="width: 100%"
              />
            </a-card-grid>
          </a-card>
        </a-col>
      </a-row>
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
  resultCard = [{}];
  cardsIndex = require("@/assets/data/CardIndexName.json")[0];
  cards = require("@/assets/data/CardName.json");
  public created() {
    document.title = "风铃-抽卡";
    console.log(this.cardsIndex);
  }
  onClickCard() {
    this.setModal1Visible(true);
    this.resultCard = [];
    for (let i = 0; i < 5; i++) {
      var it = Math.floor(Math.random() * this.cards.length);
      this.resultCard.push({
        name: this.cards[it],
        click: 0,
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
</style>
