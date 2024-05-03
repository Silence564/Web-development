<template>
  <div class="block1">
    <nav>
      <a class="logname" style="margin-left: 1em" href="/">Биржа</a>
      <div style="width: 100%" class="block2">
        <router-link to="/" class="linkn">Торги</router-link>
        <router-link to="/admin" class="linkn" v-if="User.state.admin">Управление</router-link>
      </div>
    </nav>
  </div>
  <router-view />
</template>

<script>
import User from "./Store/store.js";

export default {
  name: 'App',
  data() {
    return {
      User: User
    }
  },
};
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');
  
  #app{
    font-family: 'Pangolin', cursive;
  }
  .block1 {
    border-radius: 15px;
    background-color: #8B0000;
    margin: 10px;
  }

  nav{
    display: flex;
  }

  .logname {
    text-decoration: none;
    color: black;
    margin-right: 3%;
    font-size: 60px;
    font-weight: bold;
  }

  .linkn{
    font-size: 40px;
    text-decoration: none;
    color: black;
    margin-left: 3%;
  }

  .block2{
    margin-top: 19px;
  }
</style>