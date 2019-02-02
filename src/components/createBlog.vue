<template>
<div class="create-btn-wp">

  <div class ="create-btn">
    <create-btn  size="medium" color="yellow" icon="icon-edit-square" @click="onClickCreateBlog"></create-btn>
    <h3 class="crt-btn-word">Create Blog</h3>
    <!-- create-menu -->
    <div class="create-menu" v-if="showMenu">
      <create-btn size="small" color="white" icon="icon-edit-square" @click="onClickArticle"></create-btn>
      <create-btn size="small" color="white" icon="icon-image" :disabled="true"></create-btn>
      <create-btn size="small" color="white" icon="icon-Youtube-fill" :disabled="true"></create-btn>
      <span class="c-menu-underline"></span>
    </div>
  </div>
</div>
</template>

<script>
import btn from "../components/basicElement/btn"
export default {
  components:{
    'create-btn' :btn
  },
  data(){
    return {
      showMenu:false,
    }
  },
  methods:{
    onClickCreateBlog(){
      this.showMenu = this.flipBool(this.showMenu);
    },
    onClickArticle(){
      let self = this;
      self.$router.push({name:"blogEditor"});
      this.showMenu = this.flipBool(this.showMenu);
    },
    flipBool(bool){
      return !bool;
    }
  }
}
</script>

<style lang="less">
.create-btn-wp{
  position:relative;

  .create-btn{
    display:flex;
    flex-flow:column;
    align-items: center;

    .crt-btn-word{
      padding-top:10px;
      color:white;
      font-size:12px;
      transition:0.1s;
    }
    .create-menu{
      display:flex;
      position:absolute;
      right:0;
      left:300px;
      top:10px;
      width:200px;
      margin:auto;
      justify-content: space-evenly;
      .c-menu-underline{
        position:absolute;
        top:50%;
        right:0;
        display:block;
        border:0.5px dashed rgba(255,255,255,0.8);
        width:200px;
        height:0;
      }
      .btn-wp{
        z-index:1;
      }
    }
  }
  
}

</style>
