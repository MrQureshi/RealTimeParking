import {BOOKINGS_LIST} from '../constants';

export default (state = [], action)=>{
    switch(action.type){
        case BOOKINGS_LIST:
        const {bookingList} = action;
        return bookingList;
        default:
        return state;
    }
}