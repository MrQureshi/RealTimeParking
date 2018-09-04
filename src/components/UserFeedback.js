import React, { Component, Fragment } from 'react';
// import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from 'firebase'

import { connect } from 'react-redux'
const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        // padding: 5,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        // marginLeft: '50%',
        marginTop: 5,
        // marginBottom: 5,
    },
    typo: {
        paddingTop: 20,
    },
    bgcolor: {
        backgroundColor: '#e8f5e9',
    },
};

class feedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            myFeedback: '',
            error: {
                message: ''
            },
        }
    }

    deletedMyFeedback(selectedFeedback) {
        // console.log("Delete", selectedFeedback)
        firebase.database().ref(`userFeedback/${selectedFeedback.userKey}/${selectedFeedback.key}`).remove();

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("currentUser.uid", user.email)
            firebase.database().ref('userFeedback').on('value', snap => {
                let objFeedback = snap.val();
                console.log("componentDidMount", objFeedback)
                let myFeedbackList = [];
                for (let key in objFeedback) {
                    let parent = objFeedback[key];
                    for (let key in parent) {
                        if (parent[key].email === user.email) {

                            // console.log("iffff", parent[key])
                            myFeedbackList.push({ ...parent[key], key });
                        }
                    }
                }
                console.log("myFeedbackList", myFeedbackList)
                this.setState({
                    myFeedback: myFeedbackList
                })
            })
        })
    }
    submitFeedback() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let date = new Date();
        let month = monthNames[date.getMonth()]
        let dte = date.getDate();
        let year = date.getFullYear();

        let mdy = month + " " + dte + "," + year;
        // console.log("mdy" , mdy)

        const { email, userName, key } = this.props.user
        console.log(email);
        const { feedback } = this.state;
        // export const FeedBackRef = firebase.database().ref('userFeedback');
        firebase.database().ref('userFeedback/' + key).push({
            email: email,
            userName: userName,
            userKey: key,
            feedback: feedback,
            date: mdy

        }).then(
            this.setState({
                feedback: ''
            })
            ).catch(
            error => {
                this.setState({ error })
            }
            )
    }
    render() {
        const {
            feedback, myFeedback
        } = this.state;
        console.log("render myFeedback", myFeedback)

        const isInvalid =
            feedback === ''
        // console.log("render Addparking : ", this.props.user)
        return (
            <Grid container>
                <Grid style={styles.flex} item xs={1}></Grid>
                <Grid style={styles.flex} item xs={10}>
                    <Paper style={styles.paper} >
                        <Typography variant="headline" align="center">
                            Submit your Feedback
                        </Typography>
                        <Divider />
                        <form >
                            <FormControl fullWidth >
                                <TextField
                                    label="Feedback"
                                    multiline
                                    rows="2"
                                    margin="normal"
                                    onChange={event => this.setState({ feedback: event.target.value })}
                                    value={this.state.feedback}
                                />
                                {/* 
                                <TextField
                                    label="Number of Slots"
                                    margin="normal"
                                    onChange={event => this.setState({ numbersSolts: event.target.value })}
                                    type="number"
                                /><br /> */}
                                <Button
                                    disabled={isInvalid}
                                    color="primary"
                                    variant="raised"
                                    onClick={() => this.submitFeedback()}
                                >Submit</Button>
                                <br />
                            </FormControl>
                            {<p>{this.state.error.message}</p>}
                        </form>
                    </Paper>
                    {
                        
                        !this.state.myFeedback.length ?
                            <Typography style={styles.typo} align="center">
                                No Feedback Found
                            </Typography>
                            :
                            this.state.myFeedback.length && this.state.myFeedback.map((myFeeds, index) => {
                                return (
                                    <Grid container>
                                        <Grid style={styles.flex} item xs={12}>
                                            <Card style={styles.paper} key={index}>
                                                <CardHeader
                                                    title="Feedbacks"
                                                // subheader={myFeeds.date}
                                                >
                                                </CardHeader>
                                                <CardContent>
                                                    <Typography component="p">
                                                        {myFeeds.feedback}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions align="right" style={styles.bgcolor}  >
                                                    <Grid item xs={11}>
                                                        {
                                                            myFeeds.reply ?
                                                                <Fragment>
                                                                    <Divider />
                                                                    <CardActions align="right">
                                                                        <Fragment >
                                                                            <Typography align="center" variant="headline" component="p">
                                                                                {myFeeds.reply.userName} :
                                                                    </Typography>
                                                                            <Typography align="center" component="p">
                                                                                {myFeeds.reply.adminReply}
                                                                            </Typography>
                                                                        </Fragment>
                                                                    </CardActions>
                                                                </Fragment> :
                                                                null
                                                        }
                                                    </Grid>
                                                    <Grid style={styles.flex} item xs={1}>
                                                        <IconButton aria-label="Delete">
                                                            <DeleteIcon
                                                                onClick={() => this.deletedMyFeedback(myFeeds)}

                                                            />
                                                        </IconButton>
                                                    </Grid>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                </Grid>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    const { user, } = state;
    // console.log("state in Addparking.jsx", state)
    return {
        user,
    };
}

export default connect(mapStateToProps, null)(feedBack);

