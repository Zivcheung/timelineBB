<template>
  <div>
    <!-- place Logo Whatever U like  -->
    <header>
      <div class="site-logo">
        <i class="iconfont icon-fire-fill"></i>
      </div>
    </header>
    <!-- navigation section  -->
    <nav>
      <index-menu/>
    </nav>
    <!-- timeline section  -->
    <main>
      <!-- <create-blog></create-blog> -->
      <section class="index-timeline">
        <template v-for="bPiece in bPieces">
          <blog-bubble :blog-info="bPiece" :key="bPiece.id"></blog-bubble>
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import indexMenu from "../components/indexMenu";
import blogBubble from "../components/blog-bubble";
export default {
  components: {
    "index-menu": indexMenu,
    "blog-bubble": blogBubble
  },
  data() {
    //test dummy data first
    return {
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
          id: "01922230",
          blogType: "article",
          title: "Best of the Best"
        }
      ]
    };
  },
  methods: {},
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
  margin: 160px 0 0 0;
}
</style>
