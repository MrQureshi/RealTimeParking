import React, { Component, Fragment } from 'react';

import { Grid, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import firebase from 'firebase';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { ParkingLocationRef, } from '../firebase';

import { parkingLocation, bookingSlots } from '../actions';
import { connect } from 'react-redux';
import Slots from './Slots';

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
class ViewParking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingsList: []
        }
    }

    DeletedLocation(bookSlots) {
        // console.log("kk", key);
        firebase.database().ref(`ParkingLocation/${bookSlots.key}`).remove();
        // console.log("this.props.bookingSlots(bookSlots)", this.props.bookingSlots(bookSlots));
        // delete this.props.bookingSlots(bookSlots);
        // // console.log('chal rha hai')
        // // window.location.reload();
        // // this.state.slots= []
        // return this.props.bookingSlots

    }
    clickView(bookSlots) {
        this.props.bookingSlots(bookSlots);
        // console.log("clickView?????", this.props.bookingSlots(bookSlots));
        let bKey = bookSlots.key;
        let slotLocation = bookSlots.location;
        // console.log("slotLocation??????????", slotLocation)

        let Check = this.state.bookingsList;
        // console.log("Check", Check)
        Check.map((blist, index) => {
            // console.log("blist.location!!!!!!" ,blist.location)
            let endTime = []
            endTime.push(blist.endTime);
            let currentTime = new Date().getTime();

            if (slotLocation === blist.location && endTime < currentTime) {
                firebase.database().ref(`ParkingLocation/${bKey}/slots/${blist.slotNumber - 1}`).update({ booking: false });
            }

            // console.log("endTime", endTime, );
        })
    }

    componentDidMount() {
        firebase.database().ref('ParkingLocation').on('value', snap => {
            // console.log("hghhgv")
            let objParkLocation = snap.val();
            let p_Lists = [];

            for (let key in objParkLocation) {
                p_Lists.push({ ...objParkLocation[key], key });
            }
            this.props.parkingLocation(p_Lists);
        })

        firebase.database().ref('Booking').on('value', snap => {
            let objBookings = snap.val()
            // console.log("bookings componentDidMount", objBookings)

            let bookingList = [];
            for (let key in objBookings) {
                bookingList.push({ ...objBookings[key], key });
            }
            this.setState({ bookingsList: bookingList })
        })
    }
    render() {
        // console.log("hahaha, this.state.bookingsList ", this.state.bookingsList )
        return (
            <Grid container>
                <Grid item xs={3}>
                    <Paper style={styles.paper} >
                        <Typography variant="headline" gutterBottom align="center">
                            Parking Locations
                        </Typography>
                        <Divider />
                        <List component="ul"
                        // subheader={<ListSubheader component="div">View Parking Locations</ListSubheader>}
                        >{
                                this.props.p_Lists.map((pList, index) => {
                                    return (
                                        <Fragment key={index} >
                                            < ListItem button >
                                                <ListItemText primary={pList.location} secondary={"Slots " + pList.numbersSolts} />
                                                {/* <ListItemText primary={pList.numbersSolts} /> */}
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="View">
                                                        <ViewIcon onClick={() => this.clickView(pList)} />
                                                    </IconButton>
                                                    <IconButton aria-label="Delete"  >
                                                        <DeleteIcon onClick={() => this.DeletedLocation(pList)} />
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
                <Grid item xs={9}>
                    <Paper style={styles.paper} >
                        <Slots />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    const { p_Lists, } = state;
    // console.log("state in ViewParking.jsx", state)
    return {
        p_Lists
    }
}
export default connect(mapStateToProps, { parkingLocation, bookingSlots })(ViewParking);

