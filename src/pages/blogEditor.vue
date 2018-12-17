<template>
  <transition name="be-animation">
    <div class="be-wp">
      <section class="be-blg-wp">
        <h1 class="be-blg-desc">{{editorTypeWord}}</h1>
        <input type="text" class="be-blg-title-ip" :placeholder="editorTitleWord"/>
        <div class="be-blg-tags">
          <tag v-for="(tag,i) in tags" :key="i">{{tag.name}}</tag>
        </div>
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
      </section>
      <div class="be-backdrop" @click="backToLastPageEvent"></div>
    </div>
  </transition>
</template>

<script>
import btn from "@/components/basicElement/btn";
import tag from "@/components/basicElement/tag";
// import SimpleMDE from "simplemde";
// import markdowneditor from "vue-simplemde/src/markdown-editor";

export default {
  props: {
    blogId: {
      type: String,
      default: "emptyBlog"
    },
    editorType:{
      type:String,
      default:"create"
    }
  },
  components: {
    btn: btn,
    tag: tag
  },
  data: () => ({
    tags: [
      {
        name: "diary"
      },
      {
        name: "blog"
      },
      {
        name: "short"
      },
      {
        name: "love"
      }
    ],
    blogs: [
      {
        id: "019230",
        blogType: "article",
        title: "Best of the Best",
        details: "November 1, 2016",
        article: `
name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition. name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition.`
      },
      {
        id: "0192230",
        blogType: "article",
        title: "Best of the Best",
        details: "November 2, 2016",
        article: `
name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition. name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition.`
      },
      {
        id: "019243s0",
        blogType: "article",
        title: "Best of the Best",
        details: "November 3, 2016",
        article: `
name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition. name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition.`
      },
      {
        id: "0193230",
        blogType: "article",
        title: "Best of the Best",
        details: "November 4, 2016",
        article: `
name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition. name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition.`
      },
      {
        id: "0192223s0",
        blogType: "article",
        title: "Best of the Best",
        details: "November 5, 2016",
        article: `
name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition. name: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations to Cname: SVG images are scalable, which in an age of increasingly varied viewport sizes is a huge boon to development. With SVG we have one graphic to rule them all that scales to all devices, and therefore can save us from subsequent HTTP requests. Even the newer CSS properties such as srcset and picture require different Drasner, Sarah. SVG Animations: From Common UX Implementations toomplex Responsive Animation (p. 1). O'Reilly Media. Kindle Edition.`
      }
    ]
  }),
  computed: {
    blogInfo() {
      console.log("pass Editor: " + this.$props.blogId);
      let blog = this.blogs.filter(value => {
        return value.id === this.$props.blogId;
      })[0];
      return blog || {};
    },
    editorTypeWord(){
      return this.$props.editorType ==="edit"? "Edit Blog":"Create Blog";
    },
    editorTitleWord(){
      return this.$props.editorType ==="edit"? this.blogInfo.title:"Enter Title Here";
    }
  },
  methods: {
    backToLastPageEvent() {
      this.$router.push({ name: "index" });
    },
    submitBlogEvent(){
      let _this= this;
      // console.log(this.simpleMde.value());
      // console.log(this.simpleMde.markdown(this.simpleMde.value()));

    }
  },
  mounted() {
    this.simpleMde = new SimpleMDE({
      element: document.getElementById("blog-editor-MD"),
      placeholder:'Please type here to create a new blog  ヽ(￣▽￣)ﾉ',
      autosave: {
        enabled: true,
        uniqueId: this.blogId,
        delay: 1000
      },
      status: ["autosave", "lines", "words"],
      spellChecker: false,
      promptURLs: true,
    });
  },
  created(){
    console.log(this.$props.blogId);
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
  height: 600px;
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
      outline: none;
      border-bottom:2px dashed @magenta;
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
    width: 60%;
    height: 340px;
    padding: 10px;
    margin: 40px auto 0;
    border: 0.5px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    resize: none;
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
