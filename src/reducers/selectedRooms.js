import {ROOMS_SELECTED} from './types'
export default function RoomsSelected(state={
    roomsSelected: []
},action){
    switch(action.type){
        case ROOMS_SELECTED:
            let temp = state.roomsSelected
            temp[action.payload.key] = action.payload.data
            return {...state,rooms: temp}

    }
    return state
}