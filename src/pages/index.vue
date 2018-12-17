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
      <create-blog></create-blog>
      <!-- blog list -->
      <section class="index-timeline">
        <template v-for="(bPiece,index) in bPieces">
          <blog-bubble
            :blog-id="bPiece.id"
            :key="bPiece.id"
            @click="openPreview(index)"
            :show-preview="index===activeIndex"
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
  </div>
</template>

<script>
import indexMenu from "../components/indexMenu";
import blogBubble from "../components/blog-bubble";
import tailLoading from "../components/basicElement/tailLoading"
export default {
  components: {
    "index-menu": indexMenu,
    "blog-bubble": blogBubble,
    "tail-loading":tailLoading
  },
  data() {
    //test dummy data first
    return {
      activeIndex: -1,
      isLoadingBlogs:false,
      bPieces: [
        {
          id: "019230",
          blogType: "article",
          title: "Best of the Best"
        },
        {
          id: "0192230",
          blogType: "article",
          title: "Best of the Best"
        },
        {
          id: "019243s0",
          blogType: "article",
          title: "Best of the Best"
        },
        {
          id: "0193230",
          blogType: "article",
          title: "Best of the Best"
        },
        {
          id: "0192223s0",
          blogType: "article",
          title: "Best of the Best"
        }
      ]
    };
  },
  methods: {
    openPreview(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index;
    },
    loadContnetEvent(){
      this.isLoadingBlogs=!this.isLoadingBlogs;
    },
    closeAllBlogEvent(e){
      //需要改进到背景部分全部生效
      if(e.target===this.$el){
        this.activeIndex=-1;
        this.$refs.indexMenu.closeMenuEvent();
      }
    }
  },
  created() {
    //need a fetch blog data function
  }
};
</script>

<style lang="less">
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

/* bubble */
.index-timeline {
  margin: 200px 0 0 0;
}

main .tail-loading{
    margin:20px auto;
  }
</style>
