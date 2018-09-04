import React, { Component, Fragment } from 'react';

import { Grid, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import firebase from 'firebase';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { ParkingLocationRef, } from '../firebase';

import { parkingLocation, bookingSlots } from '../actions';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
// import Slots from './Slots';
// import Time from './SelectTime';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

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
    snaperbg:{
        backgroundColor: green[900],
    }
};
class ViewParking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingsList: [],
            value: 0,
            hoursValue: 1,
            controlledDate: null,
            timeCom: false,
            btnCom: false,
            Slots: [],
            location: '',
            locationKey: '',
            endTime: "",
            startTime: "",
            error: '',
            message: '',
            open: false,
        }
    }

    componentWillMount() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let hh = today.getHours();
        let min = today.getMinutes();

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh
        }
        if (min < 10) {
            min = '0' + min
        }
        let current = yyyy + '-' + mm + '-' + dd;
        // console.log("mount", current);
        let currnetTime = hh + ':' + min;
        // console.log("currnetTime", currnetTime)
        this.setState({ controlledDate: current, Time: currnetTime })
    }
    handelDate = (event) => {
        this.setState({ controlledDate: event.target.value, btnCom: false })
        // console.log("Done");
    }
    handelTimePicker = (event) => {
        // console.log("getTimePicker");
        this.setState({ Time: event.target.value, btnCom: false })
    }
    handleHours = event => {
        this.setState({ hoursValue: event.target.value, btnCom: false });
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    clickView(bookSlots) {

        this.props.bookingSlots(bookSlots);
        // console.log("clickView?????", this.props.bookingSlots(bookSlots));
        // let bKey = bookSlots.key;
        // let slotLocation = bookSlots.location;
        // console.log("slotLocation??????????", slotLocation)

        // let Check = this.state.bookingsList;
        // // console.log("Check", Check)
        // Check.map((blist, index) => {
        //     // console.log("blist.location!!!!!!" ,blist.location)
        //     let endTime = []
        //     endTime.push(blist.endTime);
        //     let currentTime = new Date().getTime();

        //     if (slotLocation === blist.location && endTime < currentTime) {
        //         firebase.database().ref(`ParkingLocation/${bKey}/slots/${blist.slotNumber - 1}`).update({ booking: false });
        //     }
        //     // console.log("endTime", endTime, );
        // })


        this.setState({
            timeCom: true,
            btnCom: false
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
    bookSlots(selectedSlot, selectedIndex) {
        let slotNumber = selectedIndex + 1;
        console.log("selectedSlot", selectedSlot, slotNumber)
        const { location, locationKey, endTime, startTime, date, time } = this.state
        // console.log("222", location, locationKey, endTime, startTime)
        const { userName, email, key } = this.props.user
        let userKey = key
        // console.log("33333", userName, email)
        firebase.database().ref('Booking').push({
            slotNumber, location, locationKey, endTime, startTime, userName, email, userKey, date, time
        }).then(() => {
            let slots = this.state.Slots
            slots[selectedIndex].booking = true
            // console.log("then", slotNumber)
            this.setState({
                Slots: slots,
                message: "Slot " + JSON.stringify(slotNumber) + " Booked",
                btnCom: false,
                open: true,
                
            })
        })
            .catch(error => {
                this.setState(error)
            });
    }
    handelTime() {
        const { Time, hoursValue, controlledDate } = this.state;
        console.log("handelTime", hoursValue, controlledDate, Time)

        let splited = this.state.controlledDate.split("-");
        let timeSelected = this.state.Time.split(":");
        let selectedHour = timeSelected[0];
        let selectedMints = timeSelected[1]
        // console.log("array", splited)
        let selectedstartTime = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, selectedMints);
        var getHoursfromSelected = selectedstartTime.getHours();

        selectedstartTime = selectedstartTime.getTime()
        if (selectedstartTime >= (new Date().getTime())) {
            // console.log("if controlledDate and Time", controlledDate, Time)

            // console.log("selectedStartTime", selectedstartTime)

            selectedHour = Number(selectedHour) + Number(hoursValue);
            let selectedEndTime = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, Number(selectedMints), );
            selectedEndTime = selectedEndTime.getTime()
            // console.log("selected EndTime", selectedEndTime)

            let selectedLocation = this.props.bookSlots

            // console.log("selectedLocation", selectedLocation)
            let Check = this.state.bookingsList;
            console.log("check handelTime", Check);

            let slotKeys = selectedLocation.slots

            for (let key of Check) {

                let checkIn = key
                // console.log("checkIn.location", checkIn.location)
                // console.log("selectedLocation.location", selectedLocation.location)
                // console.log("checkInendtime", checkIn.endTime)

                if (selectedLocation.location === checkIn.location
                    && (
                        (
                            selectedstartTime > checkIn.startTime &&
                            selectedEndTime < checkIn.startTime
                        ) || (
                            selectedstartTime < checkIn.endTime &&
                            selectedEndTime > checkIn.endTime
                        ) || (
                            selectedstartTime >= checkIn.startTime &&
                            selectedstartTime < checkIn.endTime
                        ) || (
                            selectedEndTime > checkIn.startTime &&
                            selectedEndTime < checkIn.endTime
                        )
                        // ||
                        // (
                        //     selectedstartTime > checkIn.endTime
                        // )
                    ) && checkIn.slotNumber) {
                    // if (selectedEndTime > checkIn.startTime && checkIn.endTime > selectedEndTime && selectedLocation.location === checkIn.location ) {
                    // selectedLocation.slots.map((slot) => {
                    //     slotKeys.push(slot)
                    // })
                    selectedLocation.slots
                        .filter((slot, index) => {
                            return checkIn.slotNumber === (index + 1)
                        })
                        .map((slot, index) => {
                            slotKeys[checkIn.slotNumber - 1].booking = true
                        })
                }
                else {
                    selectedLocation.slots
                        .filter((slot, index) => {
                            return checkIn.slotNumber === (index + 1)
                        })
                        .map((slot, index) => {
                            slotKeys[checkIn.slotNumber - 1].booking = false
                        })
                    // unBook.push(checkIn.slotNumber);
                    // console.log("else",
                    //     checkIn.endTime
                    // )
                }
            }
            console.log(selectedLocation.slots)
            this.setState({
                Slots: slotKeys,
                location: selectedLocation.location,
                locationKey: selectedLocation.key,
                endTime: selectedEndTime,
                startTime: selectedstartTime,
                date: controlledDate,
                time: Time,
                error: "",
                btnCom: true,
                message: '',
                onen: false,
                vertical: 'bottom',
                  horizontal: 'right'
            })
        }
        else {
            this.setState({ error: "Select proper date and time" })
            // alert("Select proper date and time");
            return;
        }
    }
    render() {
        // console.log("hahaha, this.state.bookingsList ", this.state.bookingsList )
        const {open, vertical, horizontal,  error, Slots } = this.state;

        console.log("render error", error)
        let selectLocation = this.props.bookSlots

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
                        >
                            {
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
                <Grid item xs={3}>
                    <Paper style={styles.paper} >
                        {/* <Slots /> */}
                        {this.state.timeCom
                            ?
                            <Fragment>
                                <Typography variant="headline" gutterBottom align="center">
                                    {selectLocation.location}
                                </Typography>
                                <Divider />

                                <FormControl fullWidth >
                                    <Typography>
                                        Date
                                            </Typography>
                                    <TextField
                                        type="date"
                                        // defaultValue={this.state.controlledDate}
                                        value={this.state.controlledDate}
                                        onChange={this.handelDate}
                                    />
                                    <br />
                                    <Typography>
                                        Time
                                            </Typography>
                                    <TextField
                                        type="time"
                                        // defaultValue="07:02"
                                        value={this.state.Time}
                                        onChange={this.handelTimePicker}
                                    />
                                    <br />
                                    <Typography>
                                        Hours
                                </Typography>
                                    <Select
                                        value={this.state.hoursValue} onChange={this.handleHours}
                                    >
                                        {/* <MenuItem value={0} >Select</MenuItem> */}
                                        <MenuItem value={1}>1 hours</MenuItem>
                                        <MenuItem value={2}>2 hours</MenuItem>
                                        <MenuItem value={3}>3 hours</MenuItem>
                                    </Select>
                                    <br />
                                    <Typography align="center" component="p" variant="subheading" color="error">
                                        {error}
                                    </Typography>
                                    <br />
                                    {/* <Book /> */}
                                    <Button
                                        variant="raised"
                                        color="primary"
                                        onClick={() => this.handelTime()}
                                    >
                                        BOOK
                                </Button>
                                </FormControl>
                            </Fragment>
                            :
                            null
                        }
                    </Paper>
                </Grid>
                <Grid style={styles.flex} item xs={7}>
                    <Paper style={styles.paper}>
                        {/* <Typography align="center" component="p" variant="subheading" color="error">
                            {this.state.message}
                        </Typography> */}
                        {this.state.btnCom ?
                            this.state.Slots.map((slt, index) => {
                                return <Button
                                    onClick={() => this.bookSlots(slt, index,)} disabled={slt.booking}
                                    style={{ margin: 10 }} variant="raised" color="primary" key={index}>
                                    Slot {index + 1}
                                </Button>
                            })
                            :
                            null
                        }
                    </Paper>
                </Grid>
                <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.handleClose}
                autoHideDuration={2000}
                >
                
                <SnackbarContent
                style={styles.snaperbg}
                message={<span>{this.state.message}</span>}
                />
                </Snackbar>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    const { p_Lists, bookSlots, user } = state;
    // console.log("state in ViewParking.jsx", state)
    return {
        p_Lists,
        bookSlots,
        user
    }
}
export default connect(mapStateToProps, { parkingLocation, bookingSlots })(ViewParking);

