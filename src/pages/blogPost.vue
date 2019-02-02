<template>
  <transition name="bp-animation">
    <div class="bp-wp" >
      <section class="bp-blg-wp" >
        <template v-if="loading">
          <h3 class="bp-blg-title">{{blogPreview.name}}</h3>
          <p class="bp-blg-details">{{blogPreview.createTime}}</p>
          <!-- <div class="bp-blg-tags">
            <tag v-for="(tag,i) in tags" :key="i">{{tag.name}}</tag>
          </div> -->
          <p class="bp-blg-content" v-html="blogPreview.contentHtml"></p>
          <div class="bp-ctrl">
            <btn
              class="retrun-btn"
              size="medium"
              icon="icon-fanhui"
              color="yellow"
              @click="backIndexPage"
            ></btn>
            <btn class="edit-btn" size="small" icon="icon-bianji" color="white" @click="openEditorEvent"></btn>
          </div>
        </template>
        <template v-else>
            <loading class="editor-loading" :style-config="loadingStyle"></loading>
        </template>
      </section>
      <div class="bp-backdrop" @click="backIndexPage"></div>
    </div>
  </transition>
</template>

<script>
import btn from "@/components/basicElement/btn";
import tag from "@/components/basicElement/tag";
import loading from "@/components/basicElement/loading"
import util from "../util/util.js";
import converter from"../mdConverter.js";
import {Base64} from "js-base64"
export default {
  props: {
    blogId: {
      type: String,
      default: ""
    }
  },
  components: {
    btn: btn,
    tag: tag,
    loading
  },
  data: () => ({
    loading:false,
    loadingStyle:{
      color:"rgb(255, 200, 0)",
      radius:"80px",
    },
    blogPreview:{}
  }),
  computed: {
  },
  methods: {
    backIndexPage() {
      this.$router.push({ name: "index" });
    },
    openEditorEvent(){
      console.log("editor");
      console.log(this.blogId);
      this.$router.push({name:"blogEditor",params:{blogData:Object.assign({},{id:this.blogId},this.blogPreview),editorType:"edit"}})
    }
  },
  mounted(){
    let user = this.$firebase.auth().currentUser;

    util.getBlog({},"/blogs/"+user.uid+"/"+this.blogId+".json")
    .then((res)=>{
      let data = res.data;
      let blogContent = Base64.decode(data.content.match(/base64,(.*)$/)[1]);
      let contentHtml = converter.makeHtml(blogContent);
      let date = new Date(data.createTime);
      this.blogPreview={
        name:data.name,
        createTime:date.toLocaleString(), // todo
        contentHtml:contentHtml,
        contentMd:blogContent
      }
      this.loading=true;
    })
    .catch((err)=>{
      alert(`
        请联系管理员：
        ${err}
      `);
    });
  }
};
</script>

<style lang="less" scoped>
.bp-blg-wp {
  position: fixed;
  top: 100px;
  left: 0px;
  right: 0px;
  z-index: 200 !important;
  height: 600px;
  width: 1078px;
  margin: auto;
  padding: 40px;
  border-radius: 50px;
  background-color: white;
  .bp-blg-title {
    font-size: 24px;
    font-weight: 900;
  }
  .bp-blg-details {
    margin-top: 10px;
  }
  .bp-blg-tags {
    display: flex;
    justify-content: center;
  }
  .editor-loading{
    position:absolute;    
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin:auto;
  }
  .bp-blg-content {
    overflow: auto;
    width: 90%;
    height: 340px;
    padding: 10px;
    border: 0.5px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 40px auto 0;
    overflow:auto;
  }

  .bp-ctrl {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    margin: 50px auto 0;
    .edit-btn {
      margin: 0 30px;
    }
  }
}
.bp-backdrop {
  position: fixed;
  z-index: 100 !important;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(49px);
  -webkit-backdrop-filter: blur(49px);
}
.bp-animation-enter,
.bp-animation-leave-to {
  opacity: 0;
}
.bp-animation-enter-active,
.bp-animation-leave-active {
  position: fixed;
  z-index: 200 !important;
  transition: .5s;
}
</style>
