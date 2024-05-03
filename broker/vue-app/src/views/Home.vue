<template>
  <div class="block5">
    <div class="card" style="margin: 1em">
      <div class="card-header">
        <h1>Информация о брокере</h1>
      </div>
      <div class="card-body">
        <div class="block6">
          <div class="avatar">
            <img src="../assets/img/5.jpg" style="width: 150px;" class="avatar-img" />
          </div>
          <div class="block4">
            <h5 class="textt">{{User.state.nameU}}</h5>
            <p class="texttt" id="cashId">Баланс: {{User.state.money}}</p>
          </div>
        </div>
        
      </div>
    </div>
    <div v-if="stocksS.getters.get_update.length === 0">
      <h1 style="color: red">Биржа закрыта</h1>
    </div>
    <div v-else>
      <h1>Торги акциями</h1>
      <h2>Дата: {{stocksS.getters.getLastDate}}</h2>
      <div v-for="stock in stocksS.getters.get_update" v-bind:key="stock.stock">
        <Component :stock="stock"/>
      </div>
    </div>
  </div>
</template>
<script>
import User from "../Store/store.js";
import Component from './Component'
import stocksS from "../Store/storestocks.js";

export default {
  name: 'TradeComponent',
  components: {Component},
  data() {
    return {
      User: User,
      stocksS: stocksS,
    }
  },
  created: function (){
    User.commit('set_user');
  },
}
</script>
<style>

.block5 {
  margin: 1em;
}

.block6{
  display: flex;
  margin-right: 3%;
}

.block4{
  margin-left: 2%;
}

.textt{
  font-size: 35px;
}

</style>