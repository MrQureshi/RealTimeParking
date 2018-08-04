import { PARKING_LOCATION } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case PARKING_LOCATION:
            const { p_Lists } = action;
            return p_Lists;
        default:
            return state;
    }
}