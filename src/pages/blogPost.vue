<template>
  <transition name="bp-animation">
    <div class="bp-wp">
      <section class="bp-blg-wp">
        <h3 class="bp-blg-title">{{blogInfo.title}}</h3>
        <p class="bp-blg-details">{{blogInfo.details}}</p>
        <div class="bp-blg-tags">
          <tag v-for="(tag,i) in tags" :key="i">{{tag.name}}</tag>
        </div>
        <p class="bp-blg-content">{{blogInfo.article}}</p>
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
      </section>
      <div class="bp-backdrop" @click="backIndexPage"></div>
    </div>
  </transition>
</template>

<script>
import btn from "@/components/basicElement/btn";
import tag from "@/components/basicElement/tag";
export default {
  props: {
    blogId: {
      type: String,
      default: ""
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
      console.log("pass: " + this.$props.blogId);
      let blog = this.blogs.filter(value => {
        return value.id === this.$props.blogId;
      })[0];
      return blog || {};
    }
  },
  methods: {
    backIndexPage() {
      this.$router.push({ name: "index" });
    },
    openEditorEvent(){
      console.log("editor");
      console.log(this.blogId);

      this.$router.push({name:"blogEditor",params:{blogId:this.blogId,editorType:"edit"}})
    }
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
  .bp-blg-content {
    overflow: auto;
    width: 60%;
    height: 340px;
    padding: 10px;
    border: 0.5px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 40px auto 0;
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
