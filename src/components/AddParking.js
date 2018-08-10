import React, { Component } from 'react';
// import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import {ParkingLocationRef} from '../firebase'; 

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
            slots: [],
            numbersSolts:'',
            error:{
                message:''
            }
        }
    }
    addParkLocation(){
        // console.log("this.state", this.state);
        const {location, numbersSolts} = this.state;
        const{ email} = this.props.user;
        if(numbersSolts){
            // console.log("Ss", numbersSolts);
            let slots = [];
            for (var i=0; i< numbersSolts; i++){
                slots.push({booking: false})
            }
            // console.log("AA", slots)
            ParkingLocationRef.push({email, location,numbersSolts, slots})
        }
    }   
    render() {
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
                        onChange={event => this.setState({location: event.target.value})}
                    /><br />

                    <TextField
                        label="Number of Slots"
                        margin="normal"
                        onChange={event => this.setState({numbersSolts: event.target.value})}
                        type="number"
                    /><br />
                    <Button
                        // type="submit"
                        color="primary"
                        variant="raised"
                        onClick={()=> this.addParkLocation()}
                         >Add Parking</Button>
                    <br />
                </FormControl>
                {<p>{this.state.error.message}</p>}
            </form>
            </Paper>
            </Grid>
        </Grid>
        )
    }
}
function mapStateToProps(state){
    const {user, bookingList } = state;
    // console.log("state in Addparking.jsx", state)
    return{
        user, 
    };
}

export default connect(mapStateToProps, null) (AddParking);

