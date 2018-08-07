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
            // bookSlots: [],
        }
    }

    DeletedLocation(key) {
        // console.log("kk", key);
        firebase.database().ref(`ParkingLocation/${key}`).remove();
        // this.state.slots= []
    }
    clickView(bookSlots){
        // this.setState( bookSlots)
        console.log("clickView", bookSlots);
        this.props.bookingSlots(bookSlots);
    }

    componentDidMount() {
        firebase.database().ref('ParkingLocation').on('value', snap => {
            console.log("hghhgv")
            let objParkLocation = snap.val();
            let p_Lists = [];

            for (let key in objParkLocation) {
                p_Lists.push({ ...objParkLocation[key], key });
            }
            this.props.parkingLocation(p_Lists);
        })
    }
    render() {
        // console.log("this.props.p_Lists ", this.props.p_Lists)
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
                                                    <IconButton aria-label="Edit">
                                                        <ViewIcon onClick={() => this.clickView(pList )} />
                                                    </IconButton>
                                                    <IconButton aria-label="Delete"  >
                                                        <DeleteIcon onClick={() => this.DeletedLocation(pList.key)} />
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
                        <Slots 
                        // slots={this.state.bookSlots}
                         />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


function mapStateToProps(state) {
    const { p_Lists } = state;
    console.log("state in ViewParking.jsx", state)
    return {
        p_Lists,
        abc:p_Lists&&p_Lists.length
    }
}

export default connect(mapStateToProps, { parkingLocation , bookingSlots})(ViewParking);

