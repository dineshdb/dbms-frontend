import {USER_STATUS} from './types'
export default function userStatus(state={
        id: "",
        isOnline: false
    
},action){
    switch(action.type){
        case USER_STATUS:
            return {...state,id: action.payload.id,isOnline: action.payload.isOnline}
    }
    return state
}