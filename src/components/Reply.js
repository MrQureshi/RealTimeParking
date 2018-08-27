import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReplyIcon from '@material-ui/icons/Reply';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { FormControl } from '@material-ui/core';

import * as firebase from 'firebase';

import { connect } from 'react-redux'
const styles = {
    dialogWidth: {
        width: 400
    }
}

class AdminReply extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            selectedFeedback: '',
            adminReply: '',
            error: {
                message: ''
            }
        }
    }
    handleReply = () => {
        // console.log("this.state", this.state.selectedFeedback)
        let select = this.state.selectedFeedback;
        // console.log("select.userKey", select.userKey, select.key)
        let uKey = select.userKey

        const { userName } = this.props.user
        const {adminReply} = this.state;

        // console.log("??", adminReply, userName)
        firebase.database().ref('userFeedback/'+ uKey +'/'+ select.key +'/reply').update({
            userName,
            adminReply
        }).then(()=>{
            this.setState({
                adminReply: ''
            })
            this.handletoggle()
        }).catch(
            error => {
                this.setState({ error })
            }
        )
    }
    handletoggle = () => {
        this.setState({
            open: !this.state.open,
        })

        let selectedFeedback = this.props.replyFor;
        console.log("selectedFeedback", selectedFeedback);

        // let selectedFeedback = [];
        // for (let key in adminReply) {
        //     selectedFeedback.push({ ...adminReply[key] })
        // }
        // console.log("BB", selectedFeedback)
        this.setState({
            selectedFeedback
        })
    }
    render() {
        const { open, adminReply } = this.state;
        // console.log("re der selected", selectedFeedback)

        const isInvalid =
        adminReply === ''

        return (
            <Fragment>
                <IconButton aria-label="Reply">
                    <ReplyIcon onClick={this.handletoggle} />
                </IconButton>
                <Dialog open={open}
                    onClose={this.handletoggle} >
                    <DialogTitle >
                        <Typography align="center"
                            variant="headline"
                            component="p"
                            color="primary">
                            Reply
                        </Typography>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={styles.dialogWidth}>
                        <FormControl fullWidth >
                            <TextField
                                label="Reply"
                                multiline
                                rows="4"
                                margin="normal"
                                onChange={event => this.setState({ adminReply: event.target.value })}
                                value={this.state.adminReply}
                            />
                            <br />
                            <Button
                                disabled={isInvalid}
                                color="primary"
                                variant="raised" onClick={() => this.handleReply()}>Reply</Button>
                        </FormControl>
                        {<p>{this.state.error.message}</p>}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}    
function mapStateToProps(state) {
    const { user, } = state;
    // console.log("state in Addparking.jsx", state)
    return {
        user,
    };
}
export default connect(mapStateToProps, null)(AdminReply);