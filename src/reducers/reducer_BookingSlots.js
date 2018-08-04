import {BOOKING_SLOTS} from '../constants';
// import { bookingSlots } from '../actions/index';

export default (state = [], action)=>{
    switch(action.type){
        case BOOKING_SLOTS:
        const {bookSlots} = action;
        return bookSlots;
        default:
        return state;
    }
}