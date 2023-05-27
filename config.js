import * as firebase from 'firebase';

require("@firebase/firestore")

  var firebaseConfig = {
    apiKey: "AIzaSyBeVwYXiYp64yNYSx9dOvx05-iR1dQRgtw",
    authDomain: "share-ideas-social-work-7daf4.firebaseapp.com",
    projectId: "share-ideas-social-work-7daf4",
    storageBucket: "share-ideas-social-work-7daf4.appspot.com",
    messagingSenderId: "527856770089",
    appId: "1:527856770089:web:9c2b36d1a02756c68e1038"
  };

  firebase.initializeApp(firebaseConfig);


export default firebase.firestore()