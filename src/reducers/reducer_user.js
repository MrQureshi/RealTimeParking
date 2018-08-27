import { SIGNED_IN } from '../constants';

let user = {
    email: null,
    userName:null,
    key : null
}

export default (state = user, action) => {
    switch (action.type) {
        case SIGNED_IN:
            const {email , userName, key   } = action;
            user = {
                email , userName, key 
            }
            return user;
        default:
            return state;
    }
}