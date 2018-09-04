import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button, Tabs, Tab } from '@material-ui/core';


import{ connect } from 'react-redux'
import { firebaseApp    } from '../firebase'

import Addparking from './AddParking';
import ViewParking from './ViewParkingForUsers';
import Selecttime from './SelectTime'
import ViewBooking from './ViewBooking';
import ViewUser from './ViewUsers';
import Mybookings from './MyBookings';
import Feedback from './UserFeedback'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    tabPaper:{
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



class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            value: 0,
        };


    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    signOut() {
        firebaseApp.auth().signOut();
    }


    render() {
        const { userName } = this.props.user;
        return (
            <Fragment >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="display2" color="inherit" style={styles.flex}  >
                           {userName} 
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => this.signOut()}>
                            Sign Out
                        </Button>
                    </Toolbar>
                </AppBar>

                <Paper style={styles.tabPaper} >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        
                            {/* <Tab label="Add Location" /> */}
                            <Tab label="View Location" />
                            <Tab label="My Booking" />
                            <Tab label="Feedback" />
                            {/* <Tab label="View Feeback" /> */}
                        
                    </Tabs>
                </Paper>

                <Grid container>
                    <Grid item xs={12}>
                        {/* <Paper style={styles.paper} > */}
                            {/* {this.state.value === 0 ? <Addparking/> : null} */}
                            {this.state.value === 0 ? <ViewParking/> : null}
                            {/* {this.state.value === 0 ? <Selecttime/> : null} */}
                            {this.state.value === 1 ? <Mybookings/> : null}
                            {this.state.value === 2 ? <Feedback/> : null}
                        {/* </Paper> */}
                    </Grid>
                    {/* <Grid item xs={8}>
                        <Paper style={styles.paper} >

                        </Paper>
                    </Grid> */}
                </Grid>
                
            </Fragment >
        )
    }
}
function mapStateToProps(state){
    const { user } = state;
    console.log('state', state);
    return{
        user
    }
}

export default connect(mapStateToProps, null)(Dashboard);
