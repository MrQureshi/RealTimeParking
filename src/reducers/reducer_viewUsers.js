import { USERS_LIST } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case USERS_LIST:
        const { usersList } = action;
        // console.log("USERS_LIST reducers", usersList)
        return usersList;
        default:
            return state;
    }
}