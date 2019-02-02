<template>
  <transition name="be-animation">
    <div class="be-wp">
      <section class="be-blg-wp">
        <template v-if="!loading">
          <h1 class="be-blg-desc">{{editorTypeWord}}</h1>
          <input type="text" class="be-blg-title-ip" :placeholder="editorTitleWord" v-model="blog.name"/>
          <!-- <div class="be-blg-tags">
            <tag v-for="(tag,i) in tags" :key="i">{{tag.name}}</tag>
          </div> -->
          <div class="be-blg-editor">
            <textarea name="content" ref="MDeditor" id="blog-editor-MD" cols="30" rows="10"></textarea>
            <!-- <mark-down></mark-down> -->
          </div>
          <div class="be-ctrl">
            <btn
              class="submit-btn"
              size="medium"
              icon="icon-duihao"
              color="yellow"
              @click="submitBlogEvent"
            ></btn>
            <btn class="cancel-btn" size="medium" icon="icon-guanbi" color="white" @click="backToLastPageEvent"></btn>
          </div>
        </template>
        <template v-else>
            <loading class="editor-loading" :style-config="loadingStyle"></loading>
        </template>
      </section>
        <div class="be-backdrop" @click="backToLastPageEvent"></div>
        <tb-dialog width="20%" title="提示" :content="cancelPromptWord" v-if="showDialog" @onRClick="onDialogRight" @onLClick="onDialogLeft"></tb-dialog>
        <alert-dialog v-if="showAlert" :content="alertStyle.content" :title="alertStyle.title"></alert-dialog>
    </div>
  </transition>
</template>

<script>
import btn from "@/components/basicElement/btn";
import tag from "@/components/basicElement/tag";
import dialog from "@/components/basicElement/dialog"
import util from "@/util/util";
import alertDialog from "@/components/basicElement/alert";
import loading from "@/components/basicElement/loading"
import bus from "../eventBus.js";
import {Base64} from "js-base64"

export default {
  props: {
    blogData: {
      type: Object,
      default:function(){
        return null;
      }
    },
    editorType:{
      type:String,
      default:"create"
    }
  },
  components: {
    btn,
    tag,
    loading,
    'tb-dialog':dialog,
    "alert-dialog":alertDialog
  },
  data: () => ({
    loading:false,
    loadingStyle:{
      color:"rgb(255, 200, 0)",
      radius:"80px",
    },
    editMode:false,
    blog:{
      name:"",
      createTime:"",
      modifiedTime:"",
    },
    showDialog:false,
    cancelPromptWord:"Do you really want to discard it?",
    showAlert:false,
    alertStyle:{
        style:{
          height:"",
          width:"200px",
        },
        title:"",
        content:"",
        loading:false
    },
    
  }),
  computed: {
    editorTypeWord(){
      return this.$props.editorType ==="edit"? "Edit Blog":"Create Blog";
    },
    editorTitleWord(){
      return this.$props.editorType ==="edit"? this.blogData.name:"Enter Title Here";
    }
  },
  methods: {
    backToLastPageEvent() {
      this.showDialog = true;
    },
    submitBlogEvent(){
      let _this= this;
      let fileReader = new FileReader();
      let createTime = new Date();
      let blogContent = this.simpleMde.value();
      let blogBlob = new Blob([blogContent],{type:'text/plain;charset=UTF-8'});
      let uid = this.$firebase.auth().currentUser.uid;
      this.loading=true;
      fileReader.addEventListener('loadend',()=>{
        if(!this.editMode){
          console.log("reload源头");
          util.postNewBlog(uid,{
            name:this.blog.name,
            createTime:Date.now(),
            modifiedTime:"",
            content:fileReader.result,
            uid:uid, 
          },blogBlob)
          .then(()=>{
            this.renderAlert({
              title:"提示",
              content:"发表成功 摸摸哒"
            },2000,()=>{
              console.log("reload源头2");
              bus.$emit("reload");
              this.loading=false;
              this.$router.push({name:"index"});
            })
          })
          .catch((res)=>{
            let error = res.response
            let errorMsg;
            switch(error.status){
              case 401:
                errorMsg = "动作未授权，请登陆";
                break;
              case 400:
                errorMsg = "bad request";
                break;

              default:
                errorMsg=error;
            }
             this.renderAlert({
              title:"提示",
              content:errorMsg
            },2000,()=>{
              this.loading=false;
              this.$router.push({name:"index"});
              bus.$emit("reload");              
            })
          });
        }else{
          util.editBlog(
            {
              blogId:this.blog.id,
              uid:uid
            },{
              name:this.blog.name,
              modifiedTime:Date.now(),
              content:fileReader.result 
            },blogBlob)
          .then((error)=>{
            this.renderAlert({
              title:"提示",
              content:"修改成功 哈哈"
            },2000,()=>{
              this.loading=false;
              bus.$emit(`refresh:${this.blog.id}`);
              this.$router.push({name:"index"});
              bus.$emit("reload");                            
            })
          })
          .catch((res)=>{
            let error = res.response
            let errorMsg;
            switch(error.status){
              case 401:
                errorMsg = "动作未授权，请登陆";
                break;
              case 400:
                errorMsg = "bad request";
                break;

              default:  
                errorMsg=error;
            }
            this.renderAlert({
              title:"出错了:",
              content:errorMsg
            },2000,()=>{
              this.loading=false;
            })
          });
        }
      });
      //执行
      fileReader.readAsDataURL(blogBlob);
    },
    onDialogLeft(e){
      this.$router.push({ name: "index" });
    },
    onDialogRight(e){
      this.showDialog=false;
    },
    renderAlert(content,time,cb){
      this.showAlert=true;
      this.alertStyle = {
        ...this.alertStyle,
        ...content
      }
      setTimeout(()=>{
        this.showAlert= false;
        cb&&cb();
      },time);
    },
  },
  watch:{
  },
  mounted() {
    this.simpleMde = new SimpleMDE({
          element: document.getElementById("blog-editor-MD"),
          placeholder:'Please type here to create a new blog  ヽ(￣▽￣)ﾉ',
          autosave: {
            enabled: true,
            uniqueId: this.blog.id,
            delay: 1000
          },
          status: ["autosave", "lines", "words"],
          spellChecker: false,
          promptURLs: true,
        });
       
    if(this.blogData!=null){
      this.editMode=true;
      this.blog={
        name:this.blogData.name,
        createTime:this.blogData.createTime,
        contentHtml:this.blogData.contentHtml,
        contentMd:this.blogData.contentMd,
        id:this.blogData.id
      };
      this.simpleMde.value(this.blog.contentMd)
    }
    
  },
  destroyed(){
    this.simpleMde=null;
  }
};
</script>

<style lang="less">
@import (less) "~style/mixin/colorPallet";

.be-blg-wp {
  position: fixed;
  top: 100px;
  left: 0px;
  right: 0px;
  z-index: 200 !important;
  box-sizing:border-box;
  height: 660px;
  width: 1078px;
  margin: auto;
  padding: 40px;
  border-radius: 50px;
  background-color: white;
  .be-blg-desc{
    color:@blue;
  }
  .be-blg-title-ip{
    display:block;
    box-sizing: border-box;
    line-height:24px;
    height:24px;
    width:300px;
    margin:20px 0;
    font-size:24px;
    border:none;
    &:focus{
      outline:none;
    }
  }
  .be-blg-tags {
    display: flex;
    justify-content: center;
    margin:20px 0;
  }
  #blog-editor-MD {
    overflow: auto;
    display: block;
    width: 90%;
    height: 340px;
    padding: 10px;
    margin: 40px auto 0;
    border: 0.5px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    resize: none;
  }
  .CodeMirror {
    height: 300px;
  }   
  .editor-loading{
    position:absolute;    
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin:auto;

  }
  .be-ctrl {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    margin: 0px auto 0;
    .cancel-btn {
      margin: 0 30px;
    }
  }
}
.be-backdrop {
  position: fixed;
  z-index: 100 !important;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.be-animation-enter,
.be-animation-leave-to {
  opacity: 0;
}
.be-animation-enter-active,
.be-animation-leave-active {
  position: fixed;
  z-index: 200 !important;
  transition: 0.5s;
}
</style>
