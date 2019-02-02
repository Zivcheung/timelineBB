<template>
  <div class="login-wp">
    <template v-if="!loading">
        <h3 class="title">LOGIN</h3>
        <div class="lg-acc lg-input-wp">
          <span class="lg-desc">Email :</span>
          <input type="text" autofocus v-model="account.value" name="account" @focus="focusEvent" @blur="blurEvent" @change="changeEvent">
          <template v-if="account.prompt!==''">
            <span class="prompt" :class="{'normal':account.validated,'warning':!account.validated}">{{account.prompt}}</span>
          </template>
        </div>
        <div class="lg-pwd lg-input-wp">
          <span class="lg-desc">Password :</span>
          <input type="text" autofocus v-model="password.value" name="password" @focus="focusEvent" @blur="blurEvent" @change="changeEvent">
          <template v-if="password.prompt!==''">
            <span class="prompt" :class="{'normal':password.validated,'warning':!password.validated}">{{password.prompt}}</span>
          </template>
        </div>
        <div class="control-panel">
            <btn type="rect" size="small" color="yellow" @click="confirmEvent">Confirm</btn>
            <btn type="rect" size="small" color="white" @click="cancelEvent">Cancel</btn>
        </div>
        <div class="other-methods-wp">
          <btn size='small' color='white' icon='icon-facebook1' :disabled="true"></btn>
          <btn size='small' color='white' icon='icon-google' :disabled="true"></btn>
          <btn size='small' color='white' icon='icon-user' @click="anonymousLogin"></btn>
        </div>
        <a  class="cp-signin-link" @click="signUpEvent">Don't have? <span>Sign up Here</span></a>
    </template>
      <template v-else>
        <loading class="login-loading" :style-config="loadingStyle"></loading>
      </template>


      <!-- loading & alert -->
      <alert-dialog v-if="showAlert" :content="alertStyle.content" :title="alertStyle.title"></alert-dialog>
  </div>
</template>

<script>
import btn from "@/components/basicElement/btn";
import alertDialog from "@/components/basicElement/alert.vue";
import loading from "@/components/basicElement/loading"

let PROMPT_PHRASES=[
  "unvalidate format",
  ""
]
export default {
  components:{
    btn,
    "alert-dialog":alertDialog,
    loading,
  },
  data(){
    return {
      loading:false,
      loadingStyle:{
        color:"rgb(255, 200, 0)",
        radius:"80px",
      },
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
      account:{
        default:"Enter your account",
        empty:true,
        value:"Enter your account",
        validated:false,
        prompt:""
        },
      password:{
        default:"Enter your password",
        empty:true,
        value:"Enter your password",
        validated:false,
        prompt:""
      }
    }
  },
  methods:{
    changeEvent(e){
      let input = this[e.target.name]
      if(input.value!=''&&input.value!=input.default){
        this.$set(this[e.target.name],'empty',false);
      }else{
        this.$set(this[e.target.name],'empty',true);        
      }
    },
    focusEvent(e){
      let inputName = e.target.name,
          inputData = this[inputName];
      if(inputData.empty){
        this.$set(inputData,'value',""); 
      }
    },
    blurEvent(e){
      let inputName = e.target.name,
          inputData = this[inputName];
      let validateRule = {
            account:/^.{6,}$/,
            password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,18}$/,
          };
          
      if(inputData.empty){
        this.$set(inputData,'value',inputData.default);
        this.$set(inputData,'prompt','');
      }else{
        if(validateRule[inputName].test(inputData.value)){
          this.$set(inputData,'prompt',PROMPT_PHRASES[1]);
          this.$set(inputData,'validated',true);
        }else{
          this.$set(inputData,'prompt',PROMPT_PHRASES[0]);
          this.$set(inputData,'validated',false);
        }
      }
    },
    signUpEvent(){
      this.$router.push({name:'signup'});
    },
    confirmEvent(){
      let validation = this.account.validated&&this.password.validated;
      if(validation){
        this.loading=true;
        this.$firebase.auth().signInWithEmailAndPassword(this.account.value,this.password.value).then(()=>{
              this.renderAlert({
                title:"提示:",
                content:"登陆成功",
              },3000,()=>{
                this.$router.push({name:'index'});
                this.loading=false;
              });
            })
            .catch((error)=>{
              let errMsg=error.code;
              let alertDisplay={}
              if(errMsg=="auth/wrong-password"){
                alertDisplay={
                  title:"提示:",
                  content:"密码错误，请重新输入"
                }
              }else if(errMsg=="auth/user-not-found"){
                alertDisplay={
                  title:"提示:",
                  content:"用户名不存在"
                }
              }else{
                alertDisplay={
                  title:"小错误出没:",
                  content:`
                    请联系管理员：
                    错误代码：${error.code}
                  `
                }
              }
              this.renderAlert(alertDisplay,2000,()=>{
                  this.loading=false;
              });
            });
      }else{
        this.renderAlert({
          title:"",
          content:"Please check input validation",
        },2000);
      }

    },
    anonymousLogin(e){
      this.$firebase.auth().signInAnonymously()
      .then(()=>{
        this.renderAlert({
            content:"登陆成功(匿名)))",
          },3000,()=>{
            this.$router.push({name:'index'});
            this.loading=false;
        });
      })
      .catch((err)=>[
        this.renderAlert(
          {
            title:'错误',
            content:err.message
          },
          2000,
          ()=>{
            this.$router.push({name:"index"})
          }
        )
      ])
    },
    cancelEvent(){
      this.$router.push({name:'index'});
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
  mounted(){
  }
}
</script>

<style lang="less">
    .login-wp{
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      box-sizing:border-box;
      width:400px;
      height:500px;
      padding:30px 20px 40px 20px;
      margin:auto;
      border-radius: 20px;
      background-color:rgb(255, 255, 255);
      box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.4);
      text-align: center;
      .title{
        margin-bottom:20px;
      }
      .login-loading{
        position: absolute;
        top:200px;
        left:150px;
      }
      .lg-input-wp{
        position:relative;
        margin-bottom:10px;
        span{
          display:block;
          margin-bottom: 5px;
          font-size:12px;
          font-weight: 900;
          color:#555;
         &.prompt{
          position:absolute;
          right:100px;
          bottom:-10px;
          padding:0 10px;
          font-weight:400;
          background-color:white;
          &.warning{
            color:rgb(255, 153, 0);
          }
          &.normal{
            color:rgb(49, 49, 49);
          }
         } 
        }
        input{
          box-sizing: border-box;
          width:70%;
          height:30px;
          padding: 0 30px 0 10px;
          border-radius:15px;
          border:2px solid #ccc;
          outline: none;
          &:hover,&:focus{
            border-color:rgb(255, 208, 0);
          }
        }
      }
      .other-methods-wp{
        margin-top:20px;
        .btn-wp{
          margin:0 4px;
        }
      }
      .control-panel{
        margin-top:30px;
        .btn-wp{
          margin:0 10px;
        }
      }
      a.cp-signin-link{
        display:block;
        margin:10px 0 0 0;
        font-size:12px;
        cursor: pointer;
        span{
          color:dodgerblue;
        }
      }
    }
</style>
