import React, { Component } from 'react';
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
        marginLeft: '50%',
        marginTop: 60,
        marginBottom: 10,
    },
};


class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = {

            location: '',
            numbersSolts: '',
            slots: [],
            error: ""
        }
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
                    error: ''
                })
                )
                .catch(
                error => {
                    this.setState({ error })
                })
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
                            <FormControl fullWidth >
                                <TextField
                                    label="Location"
                                    margin="normal"
                                    onChange={event => this.setState({ location: event.target.value })}
                                    value={this.state.location}
                                /><br />
                                <TextField
                                    label="Number of Slots"
                                    margin="normal"
                                    onChange={event => event.target.value <= 0 ? this.setState({ error: "Zero and nagative value will not accept" }) : this.setState({ numbersSolts: event.target.value, error: '' })}
                                    type="number"
                                    // value={this.state.numbersSolts>=0 ? this.setState({error: "Zero and nagative value will not accept"}) :
                                    value={this.state.numbersSolts}
                                /><br />
                                <Typography align="center" component="p" variant="subheading" color="error">
                                    {this.state.error}
                                </Typography>
                                <br />
                                <Button
                                    disabled={isInvalid}
                                    color="primary"
                                    variant="raised"
                                    onClick={() => this.addParkLocation()}
                                >
                                    Add Parking
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

