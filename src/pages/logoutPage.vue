<template>
  <div class="logout-wp">
    <template v-if="!loading">
        <h3 class="title">LOGOUT</h3>
        <p>today is the best day</p>
        <div class="control-panel">
            <btn type="rect" size="small" color="yellow" @click="confirmEvent1">Confirm</btn>
            <btn type="rect" size="small" color="white" @click="cancelEvent">Cancel</btn>
        </div>
    </template>
      <template v-else>
        <loading class="logout-loading" :style-config="loadingStyle"></loading>
      </template>


      <!-- loading & alert -->
      <alert-dialog v-if="showAlert" :content="alertStyle.content" :password="alertStyle.password"></alert-dialog>
  </div>
</template>

<script>
import btn from "@/components/basicElement/btn";
import alertDialog from "@/components/basicElement/alert.vue";
import loading from "@/components/basicElement/loading"

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
          width:"200px",
        },
        title:"",
        content:"",
        loading:false
      },
    }
  },
  methods:{
    confirmEvent1(){
      this.loading=true;
      this.$firebase.auth().signOut().then(()=>{
          this.renderAlert({
            title:"提示:",
            content:"退出登录成功",
          },3000,()=>{
            this.loading=false;
            this.$router.push({name:'index'});
          });
        })
        .catch((error)=>{
          let errMsg=error.code;
          let alertDisplay={}
          alertDisplay={
            title:"小错误出没",
            content:`s
              请联系管理员：
              错误代码：${error.code}
            `
          }
          this.renderAlert(alertDisplay,2000,()=>{
              this.loading=false;
          });
        });
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
    .logout-wp{
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      box-sizing:border-box;
      width:400px;
      height:200px;
      padding:30px 20px 40px 20px;
      margin:auto;
      border-radius: 20px;
      background-color:rgb(255, 255, 255);
      box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.4);
      text-align: center;
      .title{
        margin-bottom:20px;
      }
      .logout-loading{
        position: absolute;
        top:50px;
        left:150px;
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
    }
</style>
