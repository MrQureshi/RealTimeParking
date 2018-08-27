import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { ParkingLocationRef } from '../firebase';

import { connect } from 'react-redux'
const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        padding: 20,
        paddingTop: 30,
        
        marginTop: 60,
        marginBottom: 10,
    },
};


class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //////
            value: 0,
            hoursValue: 1,
            controlledDate: null,
            //////


            location: '',
            numbersSolts: '',
            slots: [],
            // error: {
            //     message: ''
            // }
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
    addParkLocation() {
        // console.log("this.state", this.state);
        const { location, numbersSolts } = this.state;
        const { email } = this.props.user;
        if (numbersSolts) {
            // console.log("Ss", numbersSolts);
            let slots = [];
            for (var i = 0; i < numbersSolts; i++) {
                slots.push({ booking: false })
            }
            // console.log("AA", slots)
            ParkingLocationRef.push({
                email,
                location,
                numbersSolts,
                slots
            }).then(
                this.setState({
                    location: '',
                    numbersSolts: '',
                })
                )
                .catch(
                error => {
                    this.setState({ error })
                }
                )
        }
    }
    render() {
        const {
            location,
            numbersSolts
        } = this.state;

        const isInvalid =
            location === '' ||
            numbersSolts === '';
        // console.log("render Addparking : ", this.props.user)
        return (
            <Grid container>
                <Grid style={styles.flex} item xs={8}>
                    <Paper style={styles.paper} >
                        <form >
                            <FormControl  >
                                <Typography>
                                    Date
                                </Typography>
                                <TextField
                                    type="date"
                                    // defaultValue={this.state.controlledDate}
                                    value={this.state.controlledDate}
                                    onChange={this.handelDate}
                                    
                                />
                                <Typography>
                                    Time
                                </Typography>
                                <TextField
                                    type="time"
                                    // defaultValue="07:02"
                                    value={this.state.Time}
                                    onChange={this.handelTimePicker}
                                    
                                />
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
                                {/* <Typography align="center" variant="subheading" color="error">
                                    {error}
                                </Typography> */}
                                <br />

                                <Button
                                    variant="raised"
                                    color="primary"
                                    // onClick={() => this.bookingSlot()}
                                >
                                    BOOK
                                 </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    const { user, bookingList } = state;
    // console.log("state in Addparking.jsx", state)
    return {
        user,
    };
}

export default connect(mapStateToProps, null)(AddParking);

