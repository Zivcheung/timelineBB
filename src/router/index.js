import Vue from 'vue';
import Router from 'vue-router';
import Index from "@/pages/index";
import BlogPost from "@/pages/blogPost";
import BlogEditor from "@/pages/blogEditor";
import LoginPage from "@/pages/loginPage";
import SignupPage from "@/pages/signUpPage";
import LogoutPage from "@/pages/logoutPage"


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
        },
        
      ]
    },
    {
      path:'/login',
      name:'login',
      component:LoginPage
    },
    {
      path:'/signup',
      name:'signup',
      component:SignupPage
    },
    {
      path:'/logout',
      name:'logout',
      component:LogoutPage
    },
    {
      path: '/*',
      redirect: '/index'
    },
  ],
});
