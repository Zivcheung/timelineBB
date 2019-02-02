<template>
  <div class="timeline-wp">
    <btn class="tl-bubble" size="medium" color="white" icon="icon-wallet" @click="openPreview" :loading="loading" :disabled="loading"></btn>
    <h3 class="tl-title">{{blogInfo.name}}</h3>
    <transition name="tl-preview">
      <template class="tl-blg-wp" v-if="showPreview">
        <div class="tl-blg-preview" >
          <h3 class="tl-blg-title">{{blogPreview.name}}</h3>
          <!-- <p class="tl-blg-details">{{blogPreview.createTime}}</p> -->
          <p class="tl-blg-abstract" v-html="blogPreview.content"></p>
          <btn type="rect" color="yellow" size="small" @click="openBlogPost($event,blogInfo.id)"  >More</btn>
        </div>
      </template>
    </transition>
    <transition name="tl-dash-am">
      <template v-if="showPreview">
        <span class="tl-blg-dash"></span>
      </template>
    </transition>
  </div>
</template>

<script>
import btn from "./basicElement/btn";
import util from "../util/util.js"
import converter from '../mdConverter.js';
import bus from "../eventBus.js"
import {Base64} from "js-base64"

export default {
  components: {
    btn: btn
  },
  props: {
    blogInfo: {
      type: Object,
      default(){
        return {};
      }
    },

  },
  data: () => ({
    showPreview: false,
    blogPreview:null,
    loading:false,
  }),
  computed: {

  },
  watch: {
    showPreview() {}
  },
  methods: {
    openPreview(){
      if(!this.showPreview){
        if(this.blogPreview!=null){
          this.showPreview = true;
          bus.$emit("blogBubbleOpen",{by:this.blogInfo.id});
        }else{
          this.loading=true;
          let user=this.$firebase.auth().currentUser;
          user.getIdToken(true).then((token)=>{
            util.getBlog({},"/blogs/"+user.uid+"/"+this.blogInfo.id+".json")
            .then((res)=>{
              let data = res.data;
              let contentB64=data.content.match(/base64,(.*)$/)[1]
              let contentStr =  Base64.decode(contentB64);
              let content = converter.makeHtml(contentStr);
              this.blogPreview ={
                name:data.name,
                content:content
              } 
              this.showPreview = true;
              this.loading=false;
              bus.$emit("blogBubbleOpen",{by:this.blogInfo.id});
            });
          })
        }
      }else{
        this.showPreview = false;
      }  
    },
    openBlogPost(e,id) {
      console.log('pass: '+ id)
      this.$router.push({name:'blogPost',params:{blogId:id}});
    }
  },
  mounted(){
    bus.$on('blogBubbleOpen',(e)=>{
      if(e.by!=this.blogInfo.id){
        this.showPreview = false;
      }
    });
    bus.$on('refresh:'+this.blogInfo.id,()=>{
      this.blogPreview = null;
      this.showPreview = false;
    })
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
@import (less) "../style/mixin/colorPallet.less";
.timeline-wp {
  position: relative;
  display: flex;
  width: 40%;
  margin: 30px auto 0;
  flex-flow: column nowrap;
  align-items: center;
  .tl-title {
    margin: 10px 0 0 0;
    font-size: 12px;
    color: white;
    user-select: none;
  }

  .tl-bubble {
    position: relative;
    z-index: 10;
  }
  /* preview stylings */
  .tl-blg-preview {
    position: absolute;
    z-index: 20;
    box-sizing: border-box;
    top: -5px;
    left: 400px;
    width: 380px;
    height: 480px;
    padding: 20px;
    border-radius: 2px;
    background-color: white;
    &:before {
      position: absolute;
      left: -14px;
      top: 20px;
      z-index: 5;
      display: block;
      content: "";
      border-right: 14px solid white;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
    .tl-blg-title {
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 260px;
      margin: 10px 0 0px;
      white-space: nowrap;
    }
    .tl-blg-details {
      margin: 5px 0 20px;
    }
    .tl-blg-abstract {
      overflow: auto;
      height: 320px;
      padding:10px 0;
      margin-bottom: 6px;
      text-align: left;
      font-size: 12px;
    }
  }
  .tl-blg-dash {
    position: absolute;
    top: 24px;
    left: 260px;
    z-index: 1;
    display: block;
    width: 120px;
    border: rgba(255, 255, 255, 0.6) dashed 1px;
  }

  //* animation */
  .tl-preview-enter-active,
  .tl-preview-leave-active {
    transition: 0.2s;
  }
  .tl-preview-enter,
  .tl-preview-leave-to {
    transform-origin: -200px 15px;
    transform: scale(0);
    opacity: 0;
  }
  .tl-dash-am-enter-active,
  .tl-dash-am-leave-active {
    transition: 0.1s;
  }
  .tl-dash-am-enter,
  .tl-dash-am-leave-to {
    transform: scaleX(0);
    opacity: 0;
  }
}
</style>
