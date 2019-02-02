<template>
  <div class="user-profile-wp">
    <div class="placeholder" v-if="!user">
      未登录，请登陆 
      \n(๑╹◡╹)ﾉ"""
    </div>
    <ul class="user-profile" v-else>
      <li class="avatar">
        <i class="avatar-photo" :style="avatarStyle"></i>
      </li>
      <li class="name">{{user&&user.displayName}}</li>
      <li class="logout">
        <a @click="logoutEvent">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import util from "../util/util.js"
export default {
  data(){
    return {
      user:null,
      avatarStyle:{
        'background':"url("+require('../assets/default_avatar.png')+") no-repeat center/contain "
      }
    }
  },
  methods:{
    //todo:avatar change 和 customize name
    logoutEvent(){
      this.$router.push({name:'logout'});
    }
  },
  mounted(){
    let self = this;
    let prevUser = '';//debounce auth state change
    this.$firebase.auth().onAuthStateChanged(function(user){
      if(user&&user.uid!=prevUser){ 
        self.user = user
        prevUser= user.uid
        if(user.isAnonymous){
          self.user.displayName = "匿名用户"
        }else{
          util.getUserProfile(user)
          .then((res)=>{
            let username = res.data&&res.data.nickname
            self.user.displayName = username? username:self.user.email;
          })
        }
        if(user.photoUrl){
          self.avatarStyle.background.replace(/l\(\'.*\'\)/,user.photoUrl);
        }
      }
    });
  }

}
</script>

<style lang="less">
  .user-profile-wp{
    width:200px;
    padding:20px;
    background:rgba(255, 255, 255, 0.466); 
    text-align: center;
    border-radius: 20px;
    li{
      margin:10px 0;
    }
    .avatar-photo{
      display:inline-block;
      width:50px;
      height:50px;
      cursor: pointer;
    }
    .logout{
      text-decoration:underline;
      color:rgb(0, 0, 0);
      cursor: pointer;
    }
  }
</style>
