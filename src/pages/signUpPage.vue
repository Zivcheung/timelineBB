<template>
  <div class="login-wp">
    <template v-if="!loading">
        <h3 class="title">SIGN UP</h3>
        <div class="lg-acc lg-input-wp">
          <span class="lg-desc">Email :</span>
          <input type="text" autofocus v-model="account.value" name="account" @focus="focusEvent" @blur="blurEvent" @change="changeEvent">
          <template v-if="account.prompt!==''">
            <span class="prompt" :class="{'normal':account.validated,'warning':!account.validated}">{{account.prompt}}</span>
          </template>
        </div>
        <div class="lg-nickname lg-input-wp">
          <span class="lg-desc">Nick name:</span>
          <input type="text" autofocus v-model="nickname.value" name="nickname" @focus="focusEvent" @blur="blurEvent" @change="changeEvent">
          <template v-if="nickname.prompt!==''">
            <span class="prompt" :class="{'normal':nickname.validated,'warning':!nickname.validated}">{{nickname.prompt}}</span>
          </template>
        </div>
        <div class="lg-pwd lg-input-wp">
          <span class="lg-desc">Password:</span>
          <input type="text" autofocus v-model="password.value" name="password" @focus="focusEvent" @blur="blurEvent" @change="changeEvent">
          <template v-if="password.prompt!==''">
            <span class="prompt" :class="{'normal':password.validated,'warning':!password.validated}">{{password.prompt}}</span>
          </template>
        </div>
        <div class="lg-pwd lg-input-wp">
          <span class="lg-desc">Password (again):</span>
          <input type="text" autofocus v-model="pwdAgain.value" name="pwdAgain" @focus="focusEvent" @blur="blurEvent" @change="changeEvent">
          <template v-if="pwdAgain.prompt!==''">
            <span class="prompt" :class="{'normal':pwdAgain.validated,'warning':!pwdAgain.validated}">{{pwdAgain.prompt}}</span>
          </template>
        </div>
        
        <div class="control-panel">
            <btn type="rect" size="small" color="yellow" @click="confirmEvent" refs="confirmBtn">Confirm</btn>
            <btn type="rect" size="small" color="white" @click="cancelEvent">Cancel</btn>
        </div>
        <div class="other-methods-wp">
          <btn size='small' color='white' icon='icon-facebook1' :disabled="true"></btn>
          <btn size='small' color='white' icon='icon-google' :disabled="true"></btn>
        </div>
        <a  class="cp-signin-link" @click="loginEvent">Have one? <span>Login Here</span></a>
    </template>
    <template v-else>
      <loading class="signup-loading" :style-config="loadingStyle"></loading>
    </template>


      <!-- loading & alert -->
      <alert-dialog v-if="showAlert" :title="alert.title" :content="alert.content"  :loading="alert.loading"></alert-dialog>
  </div>
</template>

<script>
import btn from "@/components/basicElement/btn"
import alertDialog from "@/components/basicElement/alert"
import loading from "@/components/basicElement/loading"
import util from "../util/util.js"

let PROMPT_PHRASES=[
  "unvalidate format",
  "",
  "password don't match"
]
export default {
  components:{
    btn,
    'alert-dialog':alertDialog,
    loading
  },
  data(){
    return {
      account:{
        default:"Enter your email",
        empty:true,
        value:"Enter your email",
        validated:false,
        prompt:""
        },
      nickname:{
        default:"Enter your nickname",
        empty:true,
        value:"Enter your nickname",
        validated:false,
        prompt:""
        },
      password:{
        default:"Enter your password",
        empty:true,
        value:"Enter your password",
        validated:false,
        prompt:""
        },
      pwdAgain:{
        default:"Enter password again",
        empty:true,
        value:"Enter password again",
        validated:false,
        prompt:""
      },
      showAlert:false,
      alert:{
        style:{
          height:"",
          width:"200px",
        },
        title:"",
        content:"",
        loading:false
      },
      loadingStyle:{
        color:"rgb(255, 200, 0)",
        radius:"80px",
      },
      loading:false
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
            nickname:/^.{3,10}$/,
            password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,18}$/,     
          };
          
      if(inputData.empty){
        this.$set(inputData,'value',inputData.default);
        this.$set(inputData,'prompt','');
      }else{
        if(inputName==='pwdAgain'){
          if(this.pwdAgain.value!==this.password.value){
            this.$set(inputData,'prompt',PROMPT_PHRASES[2]);
            this.$set(inputData,'validated',false);
          }else{
            this.$set(inputData,'prompt',PROMPT_PHRASES[1]);
            this.$set(inputData,'validated',true);
          }
        }else if(validateRule[inputName].test(inputData.value)){
          this.$set(inputData,'prompt',PROMPT_PHRASES[1]);
          this.$set(inputData,'validated',true);
        }else{
          this.$set(inputData,'prompt',PROMPT_PHRASES[0]);
          this.$set(inputData,'validated',false);
        }
      }
    },
    loginEvent(){
      this.$router.push({name:'login'});
    },
    confirmEvent(){
      let self = this;
      let validate = this.account.validated&&this.password.validated&&this.pwdAgain.validated&&this.nickname.validated;
      if(validate){
        this.loading=true;
        this.$firebase.auth().createUserWithEmailAndPassword(this.account.value,this.password.value)
            .then((data)=>{
              return util.putNewUser({
                uid:data.user.uid,
                nickname:this.nickname.value,
                email:this.account.value
              })
            })
            .then(data=>{
              this.renderAlert({
                content:"账号已注册成功"
              },2000,()=>{
                this.loading=false;
                this.$router.push({name:'index'});
              });   
            })
            .catch(error=>{
              let errMsg=error.code;
              if(errMsg=="auth/email-already-in-use"){
                this.renderAlert({
                  content:"邮箱已被占用",
                },2000,()=>{
                  this.loading=false;
                });
              }else{
                this.renderAlert({
                  title:"小错误出没",
                  content:`
                    请联系管理员：
                    错误代码：${error.code}
                  `
                },2000,()=>{
                  this.loading=false;
                });
              }
            });
        
      }else{
        this.renderAlert({
          title:"",
          content:"Please check input validation",
        },2000);
      }
    },
    renderAlert(content,time,cb){
      this.showAlert=true;
      this.alert = {
        ...this.alert,
        ...content
      }
      setTimeout(()=>{
        this.showAlert= false;
        cb&&cb();
      },time);
    },
    cancelEvent(){
      this.$router.push({name:'index'});
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
      background-color:white;
      box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.4);
      text-align: center;
      .signup-loading{
        position:absolute;
        top:190px;
        left:150px;
      }
      .title{
        margin-bottom:20px;
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
            color:rgb(255, 30, 0);
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
