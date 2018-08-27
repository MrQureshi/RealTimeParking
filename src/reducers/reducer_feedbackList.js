import { FEEDBACK_LIST } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case FEEDBACK_LIST:
        const { feedbackList } = action;
        // console.log("FEEDBACK_LIST reducers", usersList)
        return feedbackList;
        default:
            return state;
    }
}