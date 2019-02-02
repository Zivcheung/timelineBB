import axios from "axios"
let dbHttp=  axios.create({
  baseURL:"https://timeline-48d95.firebaseio.com/",
  timeout:10000,
});
export default dbHttp;