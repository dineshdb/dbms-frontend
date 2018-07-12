import {ROOMS_STATUS} from './types'
export default function rooms(state={
    rooms: []
},action){
    switch(action.type){
        case ROOMS_STATUS:
            let temp = state.rooms
            console.log("HELLO",state)
            temp[action.payload.key] = action.payload.data
            return {...state,rooms: temp}

    }
    return state
}