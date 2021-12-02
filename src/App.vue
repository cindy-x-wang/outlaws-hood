<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" @click.native="goHome">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/quiz">Take the Quiz</router-link> |
      <router-link to="/references">References</router-link>
      <!-- <router-link to="/debug">Debug</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import { eventBus } from './main';

export default {
  name: 'App',
  components: { },
  data() {
    return {
      
    }
  }, 
  mounted() {
    
  }, 
  methods: {
    goHome: function () {
      console.log('home')
      eventBus.$emit('reset')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 100px;
  padding-right: 100px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #32a1ce;
}
</style>
