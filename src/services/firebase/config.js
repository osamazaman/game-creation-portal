import Firebase from 'firebase';

 // Your web app's Firebase configuration
//  var firebaseConfig = {
//     apiKey: "AIzaSyCtmdW5c8dcVvs3ZONKu9ldsMnSHDi27WE",
//     authDomain: "countriesanduniversitieslist.firebaseapp.com",
//     databaseURL: "https://countriesanduniversitieslist.firebaseio.com",
//     projectId: "countriesanduniversitieslist",
//     storageBucket: "countriesanduniversitieslist.appspot.com",
//     messagingSenderId: "617649884862",
//     appId: "1:617649884862:web:3e0737364c8a34da7098ef"
//   };

var firebaseConfig = {
  apiKey: "AIzaSyDq2NPslcH6pzKp8AvM67TDNhMI1kDe908",
  authDomain: "countriesanduniversities-56b43.firebaseapp.com",
  databaseURL: "https://countriesanduniversities-56b43.firebaseio.com",
  projectId: "countriesanduniversities-56b43",
  storageBucket: "countriesanduniversities-56b43.appspot.com",
  messagingSenderId: "365742572587",
  appId: "1:365742572587:web:7f666205ff65870160166e",
  measurementId: "G-CXZ6566NQR"
};

const app = Firebase.initializeApp(firebaseConfig);
var db = app.database();

export default db;