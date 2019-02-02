<template>
  <div id="app" ref="app">
    <router-view/>
    <section >
      <player v-if="playerOpen"></player>
    </section>   
  </div>
</template>

<script>
import MusicPlayer from "@/components/music.vue"
import bus from "./eventBus.js"

export default {
  name: 'App',
  components:{
    player:MusicPlayer
  },
  data(){
    return{
      playerOpen:false
    }
  },
  mounted(){
    bus.$on("playerOpen",()=>{
      this.playerOpen=!this.playerOpen;
    });
  }
};
</script>

<style lang="less">
@import url("style/reset.less");
html{
  height:100%;
  background-color:rgba(248, 248, 248, 0.712);
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  height:100%;
}
#app {
  box-sizing: border-box;
  width:1180px;
  padding-bottom:340px;
  min-height: 100%;
  margin:auto;
  // box-shadow: 0px 2px 30px  rgba(0,0,0,0.5);
  background:linear-gradient(180deg, rgb(18, 99, 221) -7.88%, rgb(62, 186, 207) 118.12%);
}
</style>
