import React, { Component, Fragment } from 'react';

import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';

class bookSlots extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
    }
    handletoggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        const { open } = this.state;
        return (
            <Fragment>
                <Button variant="raised" color="primary" onClick={this.handletoggle}>
                    Book
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handletoggle}
                >
                    <DialogTitle >
                        <Typography align="center"
                            variant="headline"
                            component="p"
                            color="primary">
                            Slot
                    </Typography>
                        <DialogContent>
                            <Typography>
                                kasnklkasjl
                        </Typography>
                        </DialogContent>
                    </DialogTitle>

                </Dialog>
            </Fragment>
        )
    }
}

export default bookSlots; 