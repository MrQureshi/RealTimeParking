import React, { Component, Fragment } from 'react';

import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from 'firebase';

import { connect } from 'react-redux'


const styles = {
    dialogWidth: {
        width: 400
    }
}

class Slots extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            index: 0,
            slot: 1,
            Time: null,
            controlledDate: null,
            error: null,
            value: 0,
            time: 1,
            hours: 1,
            hoursValue: 1,
            slots: [],
            validDate: null,
            validTime: null,
            bool: false,
            bookingsList: []

        };
    }

    componentDidMount() {
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
    componentWillReceiveProps(props) {
        if (props.bookSlots.hasOwnProperty('slots')) {
            // console.log(props.bookSlots.slots)
            this.setState({ slots: props.bookSlots.slots, bool: true });
        }
    }

    handelDate = (event) => {
        this.setState({ controlledDate: event.target.value })
        // console.log("Done");
    }

    handelTimePicker = (event) => {

        // console.log("getTimePicker");
        this.setState({ Time: event.target.value })


    }

    handleTime = (event) => {
        this.setState({ value: event.target.value });
    };

    handleHours = event => {
        this.setState({ hoursValue: event.target.value });
    };

    handletoggle = (slot) => {
        this.setState({
            open: !this.state.open,
            slot,
            error: null
        })
    }

    bookingSlot() {
        const { email } = this.props.user;
        const { location, key } = this.props.bookSlots;
        const { hoursValue, controlledDate, Time, } = this.state;

        this.state.bookingsList

        let validDate = null
        let validTime = null

        let splited = this.state.controlledDate.split("-");
        let timeSelected = this.state.Time.split(":");
        let selectedHour = timeSelected[0];
        let selectedMints = timeSelected[1]

        // console.log("array", splited)
        let selected = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, selectedMints);
        var getHoursfromSelected = selected.getHours();

        selected = selected.getTime()
        if (selected >= (new Date().getTime())) {
            // console.log("if controlledDate and Time", controlledDate, Time)

            validDate = controlledDate,
                validTime = Time
            this.setState({ error: " " })
        }
        else {
            this.setState({ error: "Select proper date and time" })
            // alert("Select proper date and time");
            return;
        }
        // console.log("validDate, validTime", validDate, validTime)
        //------
        selectedHour = Number(selectedHour) + Number(hoursValue);
        let endTime = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, Number(selectedMints), );
        endTime = endTime.getTime()

        // console.log("selected", selected);
        let startTime = selected
        // console.log("startTime", startTime);
        // console.log("endTime", endTime);
        let slotNumber = this.state.slot;
        /////validate to booking button
        // console.log("masmlk?>?>?>?>>?", this.state.bookingsList)
        ////last time
        let lastBookedListEndTime;
        if (this.state.bookingsList.length) {
            lastBookedListEndTime = this.state.bookingsList[this.state.bookingsList.length - 1].endTime;
        }

        let date = new Date(lastBookedListEndTime);
        let hh = date.getHours();
        let mm = date.getMinutes();
        var amPM = (hh > 11) ? "PM" : "AM";
        if (hh > 12) {
            hh -= 12;
        } else if (hh == 0) {
            hh = "12";
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        let lastTime = hh + ":" + mm + " " + amPM;

        // console.log("lastTime", lastTime)

        // console.log("lastBookedListEndTime", lastBookedListEndTime)

        let bool = false;
        // console.log("BookedEndTime out of map", BookedEndTime)
        this.state.bookingsList.map((bList, index) => {
            // let BookedEndTime = []
            let BookedEndTime = bList.endTime;
            let BookedStartTime = bList.startTime;

            console.log("BookedStartTime", BookedStartTime)

            // console.log("BookedEndTime", BookedEndTime)
            // console.log("location", location)
            // console.log("Bookedlocation", bList.location)
            // console.log("slotNumber", slotNumber)
            // console.log("BookedslotNumber", bList.slotNumber)

            let currentTime = new Date().getTime();
            // if (location === bList.location && slotNumber === bList.slotNumber && BookedEndTime > currentTime && BookedEndTime > startTime) {
            if (location === bList.location && slotNumber === bList.slotNumber && BookedEndTime > currentTime && endTime > BookedStartTime && BookedEndTime > startTime) {
                bool = true;
            }
        })
        if (bool) {
            // this.setState({ error: "this Slot is already reserved till " + lastTime });

            this.setState({ error: "this Slot is already reserved" });
        } else {
            // console.log("inserted")
            firebase.database().ref('Booking').push({
                email, location, key, slotNumber, date: validDate, time: validTime, bookingHours: hoursValue, startTime, endTime
            }).then(() => {
                firebase.database().ref(`ParkingLocation/${key}/slots/${this.state.slot - 1}`).update({ booking: true }).then(() => {
                    console.log("this.props.bookingSlot", this.props.bookSlots.slots)
                    this.state.slots[slotNumber - 1].booking = true;
                    this.setState(this.state);
                    this.handletoggle();
                })
            }).catch(error => {
                this.setState(error)
            });
        }
        //__________
        // }
    }
    // click = (index) => {
    //     console.log("click", this.state.controlledDate);

    //     console.log("1", index)
    //     console.log("2", this.props.bookSlots)
    //     this.props.bookSlots((key) => {
    // console.log("click", key)
    //     })
    // }
    render() {
        // console.log("Render___this.props.user.email", this.props.user )
        const { open, error } = this.state;
        // console.log("zxzxzx this.state.bookingsList", this.state.bookingsList)
        // console.log("render zxzxzx", this.props.bookSlots.location)
        return (
            <Fragment>
                <Typography variant="display2" gutterBottom align="center">
                    {
                        this.props.bookSlots.location
                    }
                </Typography>
                {
                    //console.log("Slots + bookSlots", this.props.bookSlots.slots)
                    this.state.bool ? this.state.slots.map((slt, index) => {

                        return <Button onClick={() => {
                            // this.handletoggle(index + 1);
                            this.setState({ index: index + 1 });
                            // this.click(index)
                        }} style={{ margin: 10 }} variant="contained" color={slt.booking ? 'secondary' : "primary"} key={index}>slot {index + 1}</Button>

                    }) : null
                }
                <Dialog
                    open={open}
                    onClose={this.handletoggle} >
                    <DialogTitle >
                        <Typography align="center"
                            variant="headline"
                            component="p"
                            color="primary">
                            Slot {this.state.index}
                        </Typography>
                    </DialogTitle>
                    <DialogContent style={styles.dialogWidth}>
                        <FormControl fullWidth >
                            <Typography>
                                Date
                            </Typography>
                            <TextField
                                type="date"
                                // defaultValue={this.state.controlledDate}
                                value={this.state.controlledDate}
                                onChange={this.handelDate}
                                fullWidth
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
                                fullWidth
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
                            <Typography align="center" variant="subheading" color="error">
                                {error}
                            </Typography>
                            <br />

                            <Button
                                variant="raised"
                                color="primary"
                                onClick={() => this.bookingSlot()}
                            >
                                BOOK
                            </Button>
                        </FormControl>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { bookSlots, user } = state;
    // console.log("mapStateToProps Slots.js ", bookSlots, user)
    return {
        bookSlots,
        user
    }
}

export default connect(mapStateToProps, null)(Slots); 