import firebase from '../firebase.js';
import dbHttp from '../dbhttp.js'


let util = {
  putNewUser(userInfo){
    return dbHttp({
      method:"patch",
      url:"/users.json",
      data:{
        [userInfo.uid]:{
          email:userInfo.email,
          nickname:userInfo.nickname,
          createTime:Date.now()
        }
      },
    })
  },
  postNewBlog(uid,blogInfo,blogFile){
    let user = firebase.auth().currentUser;
    let fbFolder = firebase.storage().ref().child('blogs/'+uid);
    if(!user){
      return Promise.reject("failed/unauthorized");
    }else{
      return user.getIdToken(true)
        .then((idToken)=>{
          return dbHttp({
            method:"post",
            url:"/blogs/"+uid+".json",
            data:blogInfo,
            params:{
              auth:idToken
            }
          })
          .then((res)=>{
            if(res.status ==200){
              let blogId = res.data.name
              return fbFolder.child(blogId+".txt").put(blogFile);
            }
            return Promise.reject({message:"statusCode:"+res.status});
          })
        })
      }
  },
  getUserProfile(user){
    return user.getIdToken(true)
    .then((idToken)=>{
      return dbHttp({
        methods:"get",
        url:"/users/"+user.uid+".json",
        params:{
          auth:idToken,
        }
      })
    })
  },
  getBlog(query,url){
    let user = firebase.auth().currentUser;
    if(!user){
      //empty blog
      return Promise.reject("unAuthorized");
    }else{
      return user.getIdToken(true)
      .then((idToken)=>{
        return dbHttp({
          methods:"get",
          url:url||"/blogs/"+user.uid+".json",
          params:{
            auth:idToken,
            ...query
          }
        })
      })
    }
  },
  editBlog(dest,blogInfo,blogFile){
    let user = firebase.auth().currentUser;
    let fbFolder = firebase.storage().ref().child('blogs/'+dest.uid);
    if(!user){
      return Promise.reject("failed/unauthorized");
    }
    else{
      return user.getIdToken(true)
        .then((idToken)=>{
          return dbHttp({
            method:"patch",
            url:"/blogs/"+dest.uid+"/"+dest.blogId+".json",
            data:blogInfo,
            params:{
              auth:idToken
            }
          })
          .then((res)=>{
            if(res.status ==200){ 
              return fbFolder.child(dest.blogId+".txt").put(blogFile);
            }
            return Promise.reject({message:"statusCode:"+res.status});
          })
        })
      }
  },
  deleteBlog(){

  },
}

export default util;