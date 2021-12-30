<template>
  <div>
    <a-modal
      title="抽卡内容"
      :visible="modal1Visible"
      @ok="() => setModal1Visible(false)"
      @cancel="() => setModal1Visible(false)"
      :width="1200"
    >
      <a-card style="width: 100%" v-if="modal1Visible === true"
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
          <h3 v-if="card.click > 0">{{ card.name }}</h3>
          <span v-if="card.click > 0 && card.star > 0">
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
        开启卡包！你现在拥有的相遇之缘{{ jsonData }}!!!
      </a-button></a-row
    >
  </div>
</template>

<script lang="ts">
import Home from "@/views/Home.vue";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Draw extends Vue {
  IndexColor = ["zero", "one", "two", "three", "four", "five"];
  resultCard = [{ click: 0, star: 0 }];
  jsonData = 0;
  cards = require("@/assets/data/CardData.json");
  public created() {
    var _this = this;
    document.title = "风铃-祈愿";
    document.onkeydown = function (event) {
      if (event.code == "Space") {
        _this.onClickSpace();
      }
    };
    Home.Anx(
      `${Home.url}${Home.getFate}`,
      JSON.stringify({
        token: localStorage.relation,
      }),
      _this
    );
  }
  now = new Date();
  public onClickSpace() {
    var t2 = new Date();
    if (t2 > this.now)
      if (this.modal1Visible) {
        var ck = 0;
        for (var i = 0; i < this.resultCard.length; i++) {
          if (this.resultCard[i].click == 0) {
            this.resultCard[i].click = 1;
            var time = 0.1;
            if (this.resultCard[i].star == 4) time = 0.7;
            if (this.resultCard[i].star == 5) time = 2;

            this.now.setTime(t2.getTime() + time * 1000);
            break;
          }
          ck += 1;
          if (ck >= 5) {
            this.setModal1Visible(false);
          }
        }
      } else {
        this.onClickCard();
      }
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
        }
      });
    }
  }
  setModal1Visible(visible: any) {
    this.modal1Visible = visible;
    if (this.modal1Visible == true) this.jsonData -= 1;
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
