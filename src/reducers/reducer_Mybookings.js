import {MY_BOOKING_LIST} from '../constants';

export default (state = [], action)=>{
    switch(action.type){
        case MY_BOOKING_LIST:
        const {Mybookings} = action;
        return Mybookings;
        default:
        return state;
    }
}