import React, { Component, Fragment } from 'react';
import firebase from 'firebase';

import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { bookingsLists } from '../actions'
import { connect } from 'react-redux';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
class viewUsers extends Component {
    constructor() {
        super()

    }
    render() {

        return (
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper style={styles.paper} >
                        <Typography variant="headline" gutterBottom align="center">
                            All Users
                        </Typography>
                        <Divider />
                        <List component="ul"
                        // subheader={<ListSubheader component="div">View Parking Locations</ListSubheader>}
                        >

                            <Fragment >
                                <ListItem button >
                                    <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " />
                                    <ListItemSecondaryAction>

                                        <IconButton aria-label="Delete"  >
                                            <DeleteIcon
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                <ListItem button >
                                    <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " />
                                    <ListItemSecondaryAction>

                                        <IconButton aria-label="Delete"  >
                                            <DeleteIcon
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                <ListItem button >
                                    <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " />
                                    <ListItemSecondaryAction>

                                        <IconButton aria-label="Delete"  >
                                            <DeleteIcon
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                <ListItem button >
                                    <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " />
                                    <ListItemSecondaryAction>

                                        <IconButton aria-label="Delete"  >
                                            <DeleteIcon
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                <ListItem button >
                                    <ListItemText primary="abc | xyz" secondary="cbe | efg | ghi | ijk " />
                                    <ListItemSecondaryAction>

                                        <IconButton aria-label="Delete"  >
                                            <DeleteIcon
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default viewUsers;