import { SIGNED_IN, PARKING_LOCATION, BOOKING_SLOTS, BOOKINGS_LIST } from '../constants';

export function logUser(email){
    const action ={
        type: SIGNED_IN,
        email
    }
    return action;
}

export function parkingLocation(p_Lists){
    console.log("action", p_Lists)
    const action ={
        type: PARKING_LOCATION,
        p_Lists
    }
    return action;
}

export function bookingSlots(bookSlots){
    console.log("SlotsAction",bookSlots )
    const action={
        type: BOOKING_SLOTS,
        bookSlots
    }
    return action;
}
export function bookingsLists(bookingList){
    console.log("bookingsLists", bookingList)
    const action={
        type: BOOKINGS_LIST,
        bookingList
    }
    return action;
}