<template>
  <div id="app">
    <Header />
    <div id="body">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~@/layout/Header'
import Footer from '~@/layout/Footer'

export default {
  name: 'APP',
  data(){
    return {
      
    }
  },
  components : {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
body {
  margin:0;
  padding:0;
  * {
    margin:0;
    padding:0;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#body {
  padding:2%;
  h2 {
    text-align:center;
    font-weight:700;
  }
}
</style>
