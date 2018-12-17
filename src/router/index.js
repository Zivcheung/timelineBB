import Vue from 'vue';
import Router from 'vue-router';
import Index from "@/pages/index";
import BlogPost from "@/pages/blogPost";
import BlogEditor from "@/pages/blogEditor";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'blog-post',
          name: 'blogPost',
          components: {
            'blogPost': BlogPost
          },
          props: { blogPost: true }
        },
        {
          path:'blog-editor',
          name:'blogEditor',
          components:{
            'blogEditor':BlogEditor
          },
          props:{blogEditor:true}
        }
      ]
    },
  ],
});
