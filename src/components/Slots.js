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

import { parkingLocation } from '../actions';

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
            slot: 1,
            // Time: 'Select',
            controlledDate: null,
            // toggleSlots: false,

            value: 0,
            time: 1,
            hours: 1,
            hoursValue: 0,
        };
    }

    componentWillMount() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var current = yyyy + '-' + mm + '-' + dd;
        // console.log("mount", current);
        this.setState({ controlledDate: current })

    }


    handelDate = (event) => {
        console.log("Done");
        let splited = event.target.value.split("-");
        let selected = new Date(splited[0], (splited[1] - 1), splited[2]).getTime();
        console.log(new Date(selected))
        if (selected > (new Date().getTime())) {
            this.setState({ controlledDate: event.target.value })
        }
        else {
            alert("Select proper date")
        }
        console.log(event.target.value)
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
        const {email, location, key} = this.props.bookSlots;
        firebase.database().ref(`addParkingLocation/${key}/slots/${this.state.slot-1}`).update({booking: true})
        console.log("slot", this.state.slot)
        console.log("AA",this.props.bookSlots)
        console.log("BB", email, location)

        const { controlledDate, value, hoursValue } = this.state;
        console.log("Clicked", controlledDate, value, hoursValue);
        console.log("index", );
        



        // console.log("controlledDate", this.state.controlledDate);

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
        const { open, controlledDate, value, hoursValue } = this.state;
        console.log("render", this.props.bookSlots)
        return (
            <Fragment>
                {
                    //console.log("Slots + bookSlots", this.props.bookSlots.slots)
                   
                    this.props.bookSlots.slots && this.props.bookSlots.slots.map((slt, index) => {
                    // console.log(this.props.bookSlots.slots)
                        return <Button onClick={() => { this.handletoggle(index + 1); 
                            // this.click(index)
                         }} style={{ margin: 10 }} variant="contained" color={slt.booking ? 'secondary' : "primary"}  key={index}>slot {index + 1}</Button>
                })
                }
                <Dialog
                    open={open}
                    onClose={this.handletoggle} >
                    <DialogTitle>Book your Slot</DialogTitle>
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
                            <br />
                            <Typography>
                                Hours
                            </Typography>
                            <Select
                                value={this.state.hoursValue} onChange={this.hoursHours}
                            >
                                <MenuItem value={0} >Select</MenuItem>
                                <MenuItem value={"1 hours"}>1 hours</MenuItem>
                                <MenuItem value={"2 hours"}>2 hours</MenuItem>
                                <MenuItem value={"3 hours"}>3 hours</MenuItem>
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
    return {
        bookSlots
    }
}

export default connect(mapStateToProps, null)(Slots); 