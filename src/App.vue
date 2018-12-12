<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
@import url("style/reset.less");
html{
  background-color:#F7F7F7;
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  width:1180px;
  height:2000px;
  margin:auto;
  box-shadow: 0px 2px 30px  rgba(0,0,0,0.5);
  background:linear-gradient(160.5deg, #FF0A71 -7.88%, rgba(255, 255, 255, 0) 118.12%), #A850FF;
  // background-color:#666;
}
</style>
