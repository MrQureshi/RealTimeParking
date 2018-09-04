import React, { Component, Fragment } from 'react';
import firebase from 'firebase';

import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { bookingsLists } from '../actions'
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
class viewParking extends Component {
    constructor() {
        super()
    }
    DeletedBookings(key){
        console.log(key)
        firebase.database().ref(`Booking/${key}`).remove();
    }
    componentDidMount() {
        firebase.database().ref('Booking').on('value', snap => {
            let objBookings = snap.val()
            // console.log("bookings componentDidMount", objBookings)

            let bookingList = [];
            for (let key in objBookings) {
                bookingList.push({ ...objBookings[key], key });
            }
            this.props.bookingsLists(bookingList);
        })
    }
    render() {
        // console.log("ViewBooking Render", this.props.bookingList)
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
                                !this.props.bookingList.length ?
                                <Fragment>
                                    < ListItem>
                                        <ListItemText align="center" primary="No List Found" />
                                    </ListItem>
                                </Fragment>
                                :
                                this.props.bookingList.map((bList, index) => {
                                    let cDate = new Date(bList.endTime);
                                    // console.log("cDate", cDate)
                                    let endTime = cDate.getHours() + ":" + cDate.getMinutes() ;
                                    // console.log("endTime", endTime)
                                    
                                    //
                                    // bookingHours:1
                                    // date:"2018-08-07"
                                    // email:"a@g.com"
                                    // endTime:1533660000000
                                    // key:-LJK1_wm_lRMxwxXJ5bM"
                                    // location:"Kurangi"
                                    // slotNumber:1
                                    // startTime:1533656400000
                                    // time: "20:40"
                                    //
                                    return (
                                        <Fragment key={index} >
                                            <ListItem button >
                                                {/* <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " /> */}
                                                <ListItemText
                                                    primary={bList.location + " | " + bList.date} 
                                                    secondary={" Slot : #"+ bList.slotNumber +" | "+ "Start Time : "+ bList.time +" | "+"End Time : " + endTime }/>
                                                <ListItemSecondaryAction>

                                                    <IconButton aria-label="Delete"  >
                                                        <DeleteIcon 
                                                        onClick={() => this.DeletedBookings(bList.key)} 
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
    const { bookingList } = state
    // console.log("mapStateToProps ViewBooking.js", bookingList)
    return {
        bookingList
    }
}

export default connect(mapStateToProps, { bookingsLists })(viewParking);