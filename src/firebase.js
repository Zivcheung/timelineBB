import firebase from 'firebase';

let fConfig = {
  apiKey:"AIzaSyAI3D7SQ94iyZ4eX1ieK-z8MbGmX6QB7jo",
  authDomain: "timeline-48d95.firebaseapp.com",
  databaseURL: "https://timeline-48d95.firebaseio.com/",
  projectId: "timeline-48d95",
  storageBucket: "timeline-48d95.appspot.com",
  // messagingSenderId: "<SENDER_ID>",
}
firebase.initializeApp(fConfig);

export default firebase;