import React, { Component, Fragment } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { ParkingLocationRef } from '../firebase';
import Book from './BookSlots'
import firebase from 'firebase';

import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux'
const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        padding: 20,
        // paddingTop: 10,

        // paddingLeft: 10,

        marginTop: 10,
        marginBottom: 10,

        marginRight: 20,
    },
};

class SelectTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingsList: [],
            value: 0,
            hoursValue: 1,
            controlledDate: null,

            error: {
                message: ''
            }
        }
    }
    componentDidMount() {
        // firebase.database().ref('ParkingLocation').on('value', snap => {
        //     // console.log("hghhgv")
        //     let objParkLocation = snap.val();
        //     let p_Lists = [];

        //     for (let key in objParkLocation) {
        //         p_Lists.push({ ...objParkLocation[key], key });
        //     }
        //     this.props.parkingLocation(p_Lists);
        // })

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
    handelDate = (event) => {
        this.setState({ controlledDate: event.target.value })
        // console.log("Done");
    }
    handelTimePicker = (event) => {
        // console.log("getTimePicker");
        this.setState({ Time: event.target.value })
    }
    handleHours = event => {
        this.setState({ hoursValue: event.target.value });
    }
    handelTime() {
        const { Time, hoursValue, controlledDate } = this.state;
        console.log("handelTime", hoursValue, controlledDate, Time)

        let validDate = null
        let validTime = null

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
            let selectedLocation = this.props.bookSlots

            console.log("props bookSlots", selectedLocation.slots)

            // selectedHour = Number(selectedHour) + Number(hoursValue);
            // let selectedEndTime = new Date(Number(splited[0]), (Number(splited[1]) - 1), Number(splited[2]), selectedHour, Number(selectedMints), );
            // selectedEndTime = selectedEndTime.getTime()
            // console.log("selected EndTime", selectedEndTime)

            // let Check = this.state.bookingsList;
            // console.log("check handelTime", Check);

            // Check.map((bList, index)=>{
            //     console.log("map", bList.key, bList.startTime, bList.endTime)
            //     if(selectedstartTime >= bList.startTime && selectedEndTime < bList.endTime && selectedLocation.key === bList.key ){
            //         console.log("yeappp")
            //     }else{
            //         console.log("not yeappp")
            //     }
            // })

            validDate = controlledDate,
                validTime = Time
            // alert("done")
            this.setState({ error: "Done" })
        }
        else {
            this.setState({ error: "Select proper date and time" })
            // alert("Select proper date and time");
            return;
        }
    }
    render() {
        const { error } = this.state;
        console.log("render error", error)
        return (
            // <Grid container>
            //     <Grid style={styles.flex} item xs={12}>
            //         <Paper style={styles.paper} >
            <Fragment>
                <Typography variant="headline" gutterBottom align="center">
                    Select Time
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
                    {/* <Typography align="center" component="p" variant="subheading" color="error">
                                {error}
                            </Typography> */}
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

        )
    }
}
function mapStateToProps(state) {
    const { user, bookingList, bookSlots } = state;
    // console.log("state in Addparking.jsx", state)
    return {
        user,
        bookSlots
    };
}

export default connect(mapStateToProps, null)(SelectTime);

