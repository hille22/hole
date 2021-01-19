// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Dumprk4CEn-k9UFyH8pE9rKCidfHr3k",
  authDomain: "hole-d8f34.firebaseapp.com",
  databaseURL: "https://hole-d8f34-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hole-d8f34",
  storageBucket: "hole-d8f34.appspot.com",
  messagingSenderId: "362254441368",
  appId: "1:362254441368:web:9a15120cd885b2a68a69ed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NE PAS OUBLIER DE CONFIGURER FIREBASE AUTH TO ANONYMOUS !!!

// SIGN ANONYMOUS USER ----
firebase.auth().onAuthStateChanged((user) => {
  //console.log("onAuthStateChanged");
  if (user) {
    //console.log(user);
    // User is signed in.
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    // console.log(uid);
  } else {
    // No user is signed in.
  }
});

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    //console.log("anonymously auth error ----- " + errorCode);
    //console.log(errorCode);
  });

const DATABASE = firebase.database();


// DATABASE.ref("/").on("value", (snapshot) => {
//   let obj = snapshot.val()
//   console.log(obj)
// });

// SEND_MESSAGE('/player-1', {
//   chosen: true,
// 	level: 0,
// 	drawing: [],
// 	state: 'start'
// });

// SEND_MESSAGE('/player-2', {
//   chosen: true,
// 	action: null
// });


function SEND_MESSAGE(_type, _data) {
  // _data = {'data': _data, 't_created': Date.now()};
  DATABASE.ref(_type).set(_data);
}

