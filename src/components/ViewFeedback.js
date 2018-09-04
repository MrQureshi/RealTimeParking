import React, { Component, Fragment } from 'react';
// import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
// import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
// import { FormControl } from '@material-ui/core';
import firebase from 'firebase';
import { FeedbackLists } from '../actions'
import DeleteIcon from '@material-ui/icons/Delete';
import Reply from './Reply'
// import ReplyIcon from '@material-ui/icons/Reply';

import { connect } from 'react-redux'


const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        // padding: 5,
        // paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        // marginLeft: '50%',
        marginTop: 15,
        // marginBottom: 5,
    },
    typo: {
        paddingTop: 20,
    },
    bgcolor: {
        backgroundColor: '#e8f5e9',
      },
      
    
};
class ViewFeedback extends Component {
    constructor() {
        super();
        this.state = {
            feedback: '',
            // selectedFeedback: ''

        }
    }
    DeletedFeedback(selectedFeedback){
        firebase.database().ref(`userFeedback/${selectedFeedback.userKey}/${selectedFeedback.key}`).remove();
    }
    componentDidMount() {
        firebase.database().ref('userFeedback').on('value', snap => {
            let objFeedback = snap.val();
            console.log("componentDidMount", objFeedback)
            let feedbackList = [];
            for (let key in objFeedback) {
                let parent = objFeedback[key];
                for (let key in parent) {
                    feedbackList.push({ ...parent[key], key });
                }
            }
            this.props.FeedbackLists(feedbackList)
        })
    }
    render() {
        
        console.log("Renderrrr ViewFeedback", this.props.feedbackList)
        return (
            <Grid container>
                <Grid style={styles.flex} item xs={1}></Grid>
                <Grid style={styles.flex} item xs={10}>
                    {
                        !this.props.feedbackList.length?
                        <Typography style={styles.typo} align="center">
                            No Feedback Found
                        </Typography>
                        :
                        this.props.feedbackList.map((fdList, index) => {
                            // date:"August,24,2018"
                            // email:"ras@g.com"
                            // feedback:"adasdasda"
                            // userKey:"9R7qXInTrjf4YThnQLLQbc164Jv1"
                            // userName:"rasheed"
                            // console.log("fdList.reply", fdList.reply.adminReply)
                            return (
                                <Card style={styles.paper} key={index}>
                                    <CardHeader
                                        title={fdList.userName}
                                        subheader={fdList.date}>
                                    </CardHeader>
                                    <Divider />
                                    <CardContent>
                                        <Typography component="p">
                                            {fdList.feedback}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <CardActions align="right" style={styles.bgcolor} >
                                        {/* <Grid style={styles.flex} item xs={5}> */}
                                        {/* </Grid> */}
                                        <Grid item xs={11}>
                                            {/* <ReplyIcon onClick={()=> this.clickReply(fdList)} /> */}
                                            
                                            {
                                                fdList.reply 
                                                ?
                                                <Fragment >
                                                    <Typography align="center"  variant="headline"  component="p">
                                                        {fdList.reply.userName }
                                                    </Typography>
                                                    <Typography align="center"  component="p">
                                                        {fdList.reply.adminReply}
                                                    </Typography>
                                                </Fragment>
                                                :
                                                <Reply replyFor={fdList}  />
                                            }
                                        </Grid>
                                        <Grid style={styles.flex} item xs={1}>
                                            <IconButton aria-label="Delete">
                                                <DeleteIcon 
                                                onClick={() => this.DeletedFeedback(fdList)} 
                                                
                                                />
                                            </IconButton>
                                        </Grid>
                                        {/* <Grid style={styles.flex} item xs={5}></Grid> */}
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    const { feedbackList } = state
    // console.log("mapStateToProps feed ", feedbackList)
    return {
        feedbackList
    }
}

export default connect(mapStateToProps, { FeedbackLists })(ViewFeedback);

