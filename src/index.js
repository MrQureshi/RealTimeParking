import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, BrowserRouter} from 'react-router'
import { Router, Route } from 'react-router-dom'
import { firebaseApp } from './firebase'

import history from './history'

import App from './components/App'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { logUser } from './actions'


const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        // console.log("user has signed in or up", user);
        const { email } = user;
        store.dispatch(logUser(email));
        history.push('/');
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
            </div>
        </Router>
    </Provider>
    , document.getElementById('root')
)