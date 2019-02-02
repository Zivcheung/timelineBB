<template>
  <transition name="music-player">
    <div class="music-wp" >
      <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1H4LbvY4OJi"  ref="musicFrame" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>  
      <loading class="music-loading" :style-config="loadingStyle" v-if="open"></loading>
    </div>
  </transition>
</template>

<script>
import loading from "./basicElement/loading"
export default {
  components:{
    loading:loading
  },
  data(){
    return{
      open:true,
      loadingStyle:{
      color:"rgb(255, 200, 0)",
      radius:"80px",
    },
    }
  },
  methods:{
    musicFrame(){

    }
  },
  mounted(){
    let self = this;
    this.$refs.musicFrame.onload=function(){
      self.open=false;
    }
  }
}
</script>

<style lang="less">
  .music-wp{
    position:fixed;
    bottom:0;
    left:0;
    right:800px;
    margin:auto;
    box-sizing: border-box;
    width:300px;
    height:380px;
    overflow: hidden;
    opacity:1;
    border:3px solid white;
    background-color:white;
    border-radius: 20px;
    iframe{
      border:none;
      padding:0;
      margin:0;
    }
    .music-loading{
      position:absolute;    
      top:0;
      bottom:0;
      right:0;
      left:0;
      margin:auto;
    }
  }
  .music-player-enter,
  .music-player-leave-to {
    bottom:-380px;
  }
  .music-player-enter-active,
  .music-player-leave-active {
    transition: 0.5s;
  }
</style>
