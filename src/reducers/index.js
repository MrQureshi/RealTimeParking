import { combineReducers } from 'redux'

import user from './reducer_user';
import p_Lists from './reducer_ParkingLocation';
import bookSlots from './reducer_BookingSlots';
import bookingList from './reducer_Bookings';
import usersList  from './reducer_viewUsers';
import Mybookings from'./reducer_Mybookings';
import feedbackList from './reducer_feedbackList'

export default combineReducers({
    user,
    p_Lists,
    bookSlots,
    bookingList,
    usersList,
    Mybookings ,
    feedbackList   
})