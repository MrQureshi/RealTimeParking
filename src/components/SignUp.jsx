
import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { firebaseApp } from '../firebase'

import { Link } from 'react-router-dom';



const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        padding: 20,
        paddingTop: 30,
        marginLeft: '50%',
        marginTop: 60,
        marginBottom: 10,
        // height: 350,
        // overflowY: 'auto',
    },

};
const Signup = ({ history }) =>
    <Fragment>
        <AppBar position="static">
            <Toolbar>
                <Typography align="center" variant="display2" color="inherit" style={styles.flex}  >
                    Sign Up
            </Typography>
            </Toolbar>
        </AppBar>
        <Grid container>
            <Grid style={styles.flex} item xs={8}>
                <Paper style={styles.paper} >
                    <Form />
                </Paper>
            </Grid>
        </Grid>
    </Fragment>



class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }
    signUp() {
        console.log('this.state', this.state)
        const { userName, email, password } = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            // .then(authUser => {
            //     database.cre
            // })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        return (
            <form >
                <FormControl fullWidth >
                    <TextField
                        label="User Name"
                        margin="normal"
                        onChange={event => this.setState({ userName: event.target.value })}
                    /><br />
                    <TextField
                        label="Email"
                        margin="normal"
                        onChange={event => this.setState({ email: event.target.value })}
                    /><br />

                    <TextField
                        label="Password"
                        margin="normal"
                        onChange={event => this.setState({ password: event.target.value })}
                        type="password"
                    /><br />
                    <Button
                        // type="submit"
                        color="primary"
                        variant="raised"
                        onClick={() => this.signUp()} >Sign Up</Button>
                    <br />
                </FormControl>
                {<p>{this.state.error.message}</p>}
                <div>Already a user?<Link to={'/signin'} > Sign In </Link> </div>
            </form>
        )
    }
}

export default Signup;

