import { combineReducers } from 'redux'

import user from './reducer_user';
import p_Lists from './reducer_ParkingLocation';
import bookSlots from './reducer_BookingSlots';

export default combineReducers({
    user,
    p_Lists,
    bookSlots
})