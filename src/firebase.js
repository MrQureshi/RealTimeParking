import * as firebase from 'firebase';

const config ={
        apiKey: "AIzaSyDzJ3L8kp21hliomk2U_TkJY9SBx-wkSU0",
        authDomain: "realtimeparking-01.firebaseapp.com",
        databaseURL: "https://realtimeparking-01.firebaseio.com",
        projectId: "realtimeparking-01",
        storageBucket: "realtimeparking-01.appspot.com",
        messagingSenderId: "533452070476"
}

export const firebaseApp = firebase.initializeApp(config);
export const ParkingLocationRef = firebase.database().ref('addParkingLocation');


