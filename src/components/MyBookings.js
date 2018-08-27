import React, { Component, Fragment } from 'react';
import firebase from 'firebase';

import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MyBookingsList } from '../actions'
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
class Mybooking extends Component {
    constructor() {
        super()
    }
    DeletedBookings(key){
        console.log(key)
        firebase.database().ref(`Booking/${key}`).remove();

    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("currentUser.uid", user.email)

            if (user) {
                firebase.database().ref('Booking').on('value', snap => {
                    if (snap.val()) {
                        // console.log("mybookings", snap)
                        console.log("snap.val", snap.val())
                        let Mybookings = []
                        Object.values(snap.val()).filter((book) => {
                            // console.log(book.email === user.email)
                            return book.email === user.email
                        }).map((book) => {
                            // console.log(book)
                            Mybookings.push(book)
                        })
                        console.log("Mybookings", Mybookings)

                        this.props.MyBookingsList(Mybookings);
                    }
                    // else {
                    //     console.log("List is empty")
                    // }
                })
            }
        })
    }
    render() {
        console.log("MyBooking Render", this.props.Mybookings)
        return (
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper style={styles.paper} >
                        <Typography variant="headline" gutterBottom align="center">
                            Bookings
                        </Typography>
                        <Divider />
                        <List component="ul"
                        // subheader={<ListSubheader component="div">View Parking Locations</ListSubheader>}
                        >
                            {
                                this.props.Mybookings.map((myList, index) => {
                                    let cDate = new Date(myList.endTime);
                                    // console.log("cDate", cDate)
                                    let endTime = cDate.getHours() + ":" + cDate.getMinutes();

                                    return (
                                        <Fragment >
                                            <ListItem button >
                                                {/* <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " /> */}
                                                <ListItemText
                                                    primary={myList.location + " | " + myList.date}
                                                    secondary={" Slot : #" + myList.slotNumber + " | " + "Start Time : " + myList.time + " | " + "End Time" + endTime} />
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="Delete"  >
                                                        <DeleteIcon
                                                            onClick={() => this.DeletedBookings()}
                                                        />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </Fragment>
                                    )
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
    const { Mybookings } = state
    // console.log("mapStateToProps ViewBooking.js", bookingList)
    return {
        Mybookings
    }
}
export default connect(mapStateToProps, { MyBookingsList })(Mybooking);