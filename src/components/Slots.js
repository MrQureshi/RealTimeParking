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

// import { parkingLocation } from '../actions';

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

            value: 0,
            time: 1,
            hours: 1,
            hoursValue: 1,
        };
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
        console.log("currnetTime", currnetTime)

        this.setState({ controlledDate: current, Time: currnetTime })
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

    hoursHours = event => {
        this.setState({ hoursValue: event.target.value });
    };

    handletoggle = (slot) => {
        this.setState({
            open: !this.state.open,
            slot
        })
    }

    bookingSlot() {
        let validDate = null
        let validTime = null

        console.log("validDate, validTime", validDate, validTime)

        const { email, location, key } = this.props.bookSlots;
        const { controlledDate, hoursValue, Time } = this.state;

        ///validat Date
        console.log("validat Date", this.state.controlledDate)
        let splited = this.state.controlledDate.split("-");
        let timeSelected = this.state.Time.split(":");
        let selectedHour = timeSelected[0];
        let selectedMints = timeSelected[1]

        console.log("array", splited)
        let selected = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, selectedMints);
        var startTime = selected.getHours();
        console.log("startTime", selected);

        selected = selected.getTime()
        console.log("afdf", new Date().getTime(), selected, selected >= (new Date().getTime()), startTime)
        if (selected >= (new Date().getTime())) {
            validDate = this.state.controlledDate
            validTime = this.state.Time
        }
        else {
            alert("Select proper date and time ")
        }
        //------

        selectedHour = Number(selectedHour) + Number(hoursValue);
        let endTime = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, Number(selectedMints), );

        console.log("endTime", endTime);

        // console.log("Date", controlledDate)
        // console.log("Time", Time);
        // console.log("hoursValue", hoursValue);



        // console.log("index", );
        // let Date = controlledDate;
        // let slotNumber = this.state.slot;
        // firebase.database().ref(`ParkingLocation/${key}/slots/${this.state.slot - 1}`).update({ booking: true })

        // // firebase.database().ref(`/bookings/${key}/${index}/`).push({email, location});
        // firebase.database().ref('Booking').push({ email, location, key, slotNumber, Date, value, hoursValue });

        // this.handletoggle();
    }
    // click = (index) => {
    //     console.log("click", this.state.controlledDate);

    //     console.log("1", index)
    //     console.log("2", this.props.bookSlots)
    //     this.props.bookSlots((key) => {
    //         console.log("click", key)
    //     })
    // }
    render() {
        const { open, controlledDate, value, hoursValue, } = this.state;
        // console.log("render", validDate, validTime)
        return (
            <Fragment>
                {
                    //console.log("Slots + bookSlots", this.props.bookSlots.slots)

                    this.props.bookSlots.slots && this.props.bookSlots.slots.map((slt, index) => {
                        // console.log(this.props.bookSlots.slots)
                        return <Button onClick={() => {
                            this.handletoggle(index + 1);
                            this.setState({ index: index + 1 });
                            // this.click(index)
                        }} style={{ margin: 10 }} variant="contained" color={slt.booking ? 'secondary' : "primary"} key={index}>slot {index + 1}</Button>
                    })
                }
                <Dialog
                    open={open}
                    onClose={this.handletoggle} >
                    <DialogTitle>Book Slot {this.state.index}</DialogTitle>
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
                            {/* 
                            <Typography>
                                Time
                            </Typography>
                            <Select
                                value={this.state.value} onChange={this.handleTime}
                            >
                                <MenuItem value={0} >Select</MenuItem>
                                <MenuItem value={"12:00 AM"} >12:00 AM</MenuItem>
                                <MenuItem value={"01:00 AM"} >01:00 AM</MenuItem>
                                <MenuItem value={"02:00 AM"} >02:00 AM</MenuItem>
                                <MenuItem value={"02:00 AM"} >02:00 AM</MenuItem>
                                <MenuItem value={"03:00 AM"} >03:00 AM</MenuItem>
                                <MenuItem value={"04:00 AM"} >04:00 AM</MenuItem>
                                <MenuItem value={"05:00 AM"} >05:00 AM</MenuItem>
                                <MenuItem value={"06:00 AM"} >06:00 AM</MenuItem>
                                <MenuItem value={"07:00 AM"} >07:00 AM</MenuItem>
                                <MenuItem value={"08:00 AM"} >08:00 AM</MenuItem>
                                <MenuItem value={"09:00 AM"} >09:00 AM</MenuItem>
                                <MenuItem value={"10:00 AM"} >10:00 AM</MenuItem>
                                <MenuItem value={"11:00 AM"} >11:00 AM</MenuItem>
                                <MenuItem value={"12:00 PM"} >12:00 PM</MenuItem>
                                <MenuItem value={"01:00 PM"} >01:00 PM</MenuItem>
                                <MenuItem value={"02:00 PM"} >02:00 PM</MenuItem>
                                <MenuItem value={"03:00 PM"} >03:00 PM</MenuItem>
                                <MenuItem value={"04:00 PM"} >04:00 PM</MenuItem>
                                <MenuItem value={"05:00 PM"} >05:00 PM</MenuItem>
                                <MenuItem value={"06:00 PM"} >06:00 PM</MenuItem>
                                <MenuItem value={"07:00 PM"} >07:00 PM</MenuItem>
                                <MenuItem value={"10:00 PM"} >10:00 PM</MenuItem>
                                <MenuItem value={"08:00 PM"} >08:00 PM</MenuItem>
                                <MenuItem value={"09:00 PM"} >09:00 PM</MenuItem>
                                <MenuItem value={"11:00 PM"} >11:00 PM</MenuItem>
                            </Select>
                            <br /> */}
                            <Typography>
                                Hours
                            </Typography>
                            <Select
                                value={this.state.hoursValue} onChange={this.hoursHours}
                            >
                                {/* <MenuItem value={0} >Select</MenuItem> */}
                                <MenuItem value={1}>1 hours</MenuItem>
                                <MenuItem value={2}>2 hours</MenuItem>
                                <MenuItem value={3}>3 hours</MenuItem>
                            </Select>
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
    const { bookSlots } = state;
    console.log("alotsssssssssss", bookSlots)
    return {
        bookSlots
    }
}

export default connect(mapStateToProps, null)(Slots); 