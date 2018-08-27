import { SIGNED_IN, PARKING_LOCATION, BOOKING_SLOTS, BOOKINGS_LIST, USERS_LIST, MY_BOOKING_LIST, FEEDBACK_LIST } from '../constants';

export function logUser(email , userName, key ){
    const action ={
        type: SIGNED_IN,
        email, userName,
        key
    }
    return action;
}

export function parkingLocation(p_Lists){
    // console.log("action", p_Lists)
    const action ={
        type: PARKING_LOCATION,
        p_Lists
    }
    return action;
}

export function bookingSlots(bookSlots){
    // console.log("SlotsAction",bookSlots )
    const action={
        type: BOOKING_SLOTS,
        bookSlots
    }
    return action;
}
export function bookingsLists(bookingList){
    // console.log("bookingsLists", bookingList)
    const action={
        type: BOOKINGS_LIST,
        bookingList
    }
    return action;
}
export function UsersLists(usersList){
    // console.log("Action UsersLists", usersList)
    const action={
        type: USERS_LIST,
        usersList
    }
    return action;
}
export function MyBookingsList(Mybookings){
    // console.log("Action UsersLists", usersList)
    const action={
        type: MY_BOOKING_LIST,
        Mybookings
    }
    return action;
}
export function FeedbackLists(feedbackList){
    // console.log("Action FeedbackList", feedbackList)
    const action={
        type: FEEDBACK_LIST,
        feedbackList
    }
    return action;
}