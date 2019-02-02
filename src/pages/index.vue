<template>
  <div class="applicaiton-wp" @click="closeAllBlogEvent">
    <!-- place Logo Whatever U like  -->
    <header>
      <div class="site-logo">
        <i class="iconfont icon-fire-fill"></i>
      </div>
    </header>
    <!-- navigation section  -->
    <nav>
      <index-menu ref="indexMenu"/>
    </nav>
    <!-- timeline section  -->
    <main>
      <!-- blog list -->
      <section class="index-timeline">
        <create-blog class="index-tl-create"></create-blog> 
        <!-- blog post -->
        <p v-if="emptyTimeline" class="empty-timeline">暂无文章</p>
        <template v-for="(bPiece) in bPieces">
          <blog-bubble
            :blog-info="bPiece"
            :key="bPiece.id"
          ></blog-bubble>
        </template>
      </section>
      <!-- load more content -->
      <tail-loading class = "tail-loading" @click="loadContnetEvent" :loading="isLoadingBlogs"></tail-loading>
    </main>
    <!-- blog post content section -->
    <section class="blog-post-wp">
      <router-view name="blogPost"/>
    </section>
    <section class="blog-editor-wp">
      <router-view name="blogEditor"/>
    </section>
    <section class="idx-user-profile">
      <user-profile></user-profile>
    </section>
  </div>
</template>

<script>
import createBlog from "../components/createBlog"
import indexMenu from "../components/indexMenu";
import blogBubble from "../components/blog-bubble";
import tailLoading from "../components/basicElement/tailLoading"
import userProfile from "../components/userProfile";
import util from "../util/util"
import bus from "../eventBus.js"
export default {
  components: {
    'create-blog': createBlog,
    "index-menu": indexMenu,
    "blog-bubble": blogBubble,
    "tail-loading":tailLoading,
    "user-profile":userProfile
  },
  data() {
    //test dummy data first
    return {
      activeIndex: -1,
      isLoadingBlogs:false,
      bPieces: [],
      currentPage:1,
      pageSize:5,
      emptyTimeline:true
    };
  },
  methods: {
    openPreview(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index;
    },
    loadContnetEvent(){
      this.isLoadingBlogs=true;
      let user = this.getUser();
      if(user!=null&&user.email!=null){
        let lastPageMark=this.bPieces[this.bPieces.length-1].createTime-1
        this.getBlogs(-1,lastPageMark)
        .then(()=>{
          this.isLoadingBlogs=false
        })
        .catch((res)=>{
          alert(res);
        });
      }else{
        alert("不登陆还想看？");
        this.isLoadingBlogs=false
      }

    },
    closeAllBlogEvent(e){
      //需要改进到背景部分全部生效
      if(e.target===this.$el){
        this.activeIndex=-1;
        this.$refs.indexMenu.closeMenuEvent();
      }
    },
    getBlogs(page,lastPageMark){
      let pageLimit = 2;
      return util.getBlog({
        orderBy:"\"createTime\"",
        limitToLast:page>0? this.pageSize*page:this.pageSize,
        endAt:lastPageMark||""
      })
      .then((res)=>{
        if(res.data){
          let ids = Object.keys(res.data);
          let data = [];
          ids.forEach((key)=>{
            let d = res.data[key];
            d.id=key;
            data.push(d);
          });
          data = _.orderBy(data,'createTime','desc');
          console.log(data);
          data.forEach((data)=>{
            this.bPieces.push({
              id:data.id,
              name:data.name,
              createTime:data.createTime
            });
          });
          this.emptyTimeline=false;
          page<0&&this.currentPage++;
          console.log("page:"+this.currentPage);
        }
      })
      .catch(err=>{
        if(err=="unAuthorized"){
          alert(`
          本网站需要登陆才可访问，如无账号可匿名登陆
          `);
        }else{
          alert(`
            请联系客服：
            index
          ${err}`);
        }
        this.isLoadingBlogs=false
      });
    },
    getUser(){
      return this.$firebase.auth().currentUser;
    }
  },
  updated(){
    console.log('updated');
  },
  mounted() {
    let self = this;
    bus.$on("reload",()=>{
      this.bPieces=[];
      this.getBlogs(this.currentPage)
    });
    //need a fetch blog data function
    window.checkUserUpdate = setInterval(function(){
      let user = self.$firebase.auth().currentUser; 
        
      if(user!=null){
      console.log('用户更新');

        self.getBlogs(-1)
        clearInterval(window.checkUserUpdate);
      }; 
    },1000) 
  },
  destroyed(){
    clearInterval(window.checkUserUpdate);
  }
};
</script>

<style lang="less">
#app{
  
  position:relative;
  header {
    padding-top: 20px;
    .site-logo {
      display: block;
      margin: auto;
      width: 72px;
      height: 72px;
      color: white;
      i {
        font-size: 72px;
      }
    }
  }
  /* userProfile */
  .idx-user-profile{
    position:absolute;
    top:50px;
    right:50px;
  }
  p.empty-timeline{
    text-align:center;
    color:white;
    margin:0 0 100px 0;
  }
  /* bubble */
  .index-timeline {
    margin: 200px 0 0 0;
    .index-tl-create{
      margin-bottom:100px;
    }
  }
  
  main .tail-loading{
      margin:20px auto;
  }
}
</style>
