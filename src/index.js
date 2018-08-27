import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, BrowserRouter} from 'react-router'
import { Router, Route } from 'react-router-dom'
import { firebaseApp } from './firebase'

import history from './history'

import App from './components/App'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import User from './components/Users'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { logUser } from './actions'
import firebase from 'firebase';

const store = createStore(reducer);

// firebaseApp.auth().onAuthStateChanged(user => {
//     if (user) {
//         // console.log("user has signed in or up", user);
//         const { email } = user;
//         store.dispatch(logUser(email));
//             if(email === "admin@gmail.com"){
//                 history.push('/')
//             }else{
//                 history.push('/user')
//             }
//     } else {
//         // console.log("user has signed out or still needs to sign in.")
//         history.push('/signin');
//     }
// })
firebaseApp.auth().onAuthStateChanged(() => {
    if (firebase.auth().currentUser) {
        var userRef = firebase.database().ref().child("users/" + firebase.auth().currentUser.uid);
        userRef.on('value', snap =>{
            // console.log("user has signed in or up", user);
           let key = firebase.auth().currentUser.uid
        
            let objCurrentuser = snap.val();
            const { email, userName, } = objCurrentuser;
            store.dispatch(logUser(email , userName, key ))
            // store.dispatch(logUser(email));
                if(email === "admin@gmail.com"){
                    history.push('/')
                }else{
                    history.push('/user')
                }
        })
        
    } else {
        // console.log("user has signed out or still needs to sign in.")
        history.push('/signin');
    }
})

ReactDOM.render(
    <Provider store={store} >
        <Router history={history} >
            <div>
                <Route exact={true} path="/" component={App} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/user" component={User} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root')
)