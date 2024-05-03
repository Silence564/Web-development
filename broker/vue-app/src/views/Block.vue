<template>
    <div class="card">
      <div class="card-body">
        <div class="container">
          <h1 class="card-title">{{brokerData.name}}</h1>
          <h5 class="card-subtitle mb-2 text-muted">Счёт: {{brokerData.money}}$</h5>
          <div class="block7">
            <h2>Акции</h2>
            <div :id="brokerData.name">
              <div v-for="stock in brokerData.stocks" v-bind:key="stock + brokerData.name">
                <div class="card" v-if="stock.count > 0">
                  <div class="card-body">
                    <SBlock :stock="stock"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import stocksS from "../Store/storestocks.js";
import SBlock from "./SBlock.vue";

export default {
  name: "Block.vue",
  components: {SBlock},
  props: {
    brokerData: {},
  },
  data() {
    return {
      activeS: stocksS,
      curDif: 0
    }
  }
}
</script>

<style>
  .block7{
    margin-top: 2%;
  }
</style>