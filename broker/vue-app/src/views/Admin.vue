<template>
  <div class="adminContent">
    <h1>Все пользователи: </h1>
    <div v-for="broker in brokers" v-bind:key="broker.name + '_key'">
      <Block :broker-data="broker"/>
    </div>
  </div>
</template>
<script>
import Block from './Block.vue';
import {socket} from "@/socket";

export default {
  name: 'AdminComponent',
  components: {Block},
  data() {
    return {
      brokers: []
    }
  },
  methods: {
    getBrokers() {
      fetch('http://localhost:4000/brokers')
          .then(res => res.json())
          .then(data => {
            this.brokers = data;
          });
    }
  },
  created: function(){
    this.getBrokers();
    socket.on('newBroker',() => this.getBrokers());
  }
}
</script>

<style>
.adminContent {
  margin: 1em;
}

</style>