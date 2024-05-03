<template>
  <h3> {{stock.stock}} </h3>
  <p> Количество: {{stock.count}} </p>
  <p :style="{color: this.setDif(this.stock.stock, this.stock.count, this.stock.bought) > 0 ? 'green' : 'red'}">
    {{this.setDif(this.stock.stock, this.stock.count, this.stock.bought)}} </p>
</template>

<script>
import stocksS from "../Store/storestocks.js";

export default {
  name: "SBlock",
  props: {
    stock: {}
  },
  data() {
    return {
      activeS: stocksS,
      diff: 0
    }
  },
  methods: {
    setDif(name, count, cost) {
      const curStockCost = this.activeS.getters.getStockCost(name);
      if (!curStockCost)
        return 'Не участвует в торгах';
      const dif = (count * curStockCost).toFixed(2) - cost;
      return (dif >= 0 ? 'Прибыль: ' + dif : 'Убыток: ' + dif) + '$';
    }
  },

}
</script>

<style scoped>

</style>