import firebase from 'firebase';

const db = firebase.initializeApp( {
        apiKey: "AIzaSyBFqIS7j01IUghNczE2qRnUglUKz4uIFI4",
        authDomain: "where2study-7c76d.firebaseapp.com",
        databaseURL: "https://where2study-7c76d.firebaseio.com",
        projectId: "where2study-7c76d",
        storageBucket: "where2study-7c76d.appspot.com",
        messagingSenderId: "571893161315",
        appId: "1:571893161315:web:ab9c1b55548d1752950756",
        measurementId: "G-4139S5LFL6"
});


// Had trouble with initializing DB more than once... here was that fix
export default !firebase.apps.length ? firebase.initializeApp(db) : firebase.app();