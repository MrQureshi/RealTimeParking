import React, { Component, Fragment } from 'react';
import firebase from 'firebase';

import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { UsersLists } from '../actions'
import { connect } from 'react-redux';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    tabPaper: {
        marginTop: 10,
        fontSize: 200
    },
    paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        marginRight: 6,
        height: 570,
        overflowY: 'auto'
    },
};
class viewUsers extends Component {
    constructor() {
        super()

    }
    deleteUser(key) {
        console.log(key)
        var ref = firebase.database().ref("Booking");
        ref.orderByChild("userKey").equalTo(key).once("value", function(snap){
            const obj = snap.val();
            for(let key in obj){
                ref.child(key).remove()
            }
        })

        var refuserFeedback = firebase.database().ref(`userFeedback`).child(key);
        refuserFeedback.once("value", function (snap) {
            let obj = snap.val();
            console.log("obj", obj)
            for (let key in obj) {
                refuserFeedback.child(key).remove()
            }
        })

        firebase.database().ref(`users/${key}`).remove();

    }
    componentDidMount() {
        firebase.database().ref('users').on('value', snap => {
            let objUsers = snap.val()
            // console.log("users ComponentDidMount", objUsers);
            let usersList = [];
            for (let key in objUsers) {
                usersList.push({ ...objUsers[key], key });
            }
            this.props.UsersLists(usersList)
        })
    }
    render() {
        console.log("ViewUser Render", this.props.usersList)
        return (
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper style={styles.paper} >
                        <Typography variant="headline" gutterBottom align="center">
                            All Users
                        </Typography>
                        <Divider />
                        <List component="ul"
                        // subheader={<ListSubheader component="div">View Parking Locations</ListSubheader>}
                        >
                            {
                                !this.props.usersList.length ?
                                    <Fragment>
                                        < ListItem>
                                            <ListItemText align="center" primary="No List Found" />
                                        </ListItem>
                                    </Fragment>
                                    :
                                    this.props.usersList.map((uList, index) => {
                                        if (uList.email === "admin@gmail.com") {
                                            return
                                            // email: "ras@g.com", 
                                            // password: "123456", 
                                            // userName: "rasheed", 
                                            // key: "9R7qXInTrjf4YThnQLLQbc164Jv1"
                                        }
                                        else {
                                            return (
                                                <Fragment key={index} >
                                                    <ListItem button >
                                                        <ListItemText primary={uList.userName} secondary={uList.email} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton aria-label="Delete" onClick={() => this.deleteUser(uList.key)}  >
                                                                <DeleteIcon
                                                                />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    <Divider />
                                                </Fragment>
                                            )
                                        }
                                    })
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    const { usersList } = state
    // console.log("mapStateToProps ViewUsers.js", usersList)
    return {
        usersList
    }
}

export default connect(mapStateToProps, { UsersLists })(viewUsers);