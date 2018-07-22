import {ROOMS_STATUS} from '../../reducers/types'
import {ROOMS_SELECTED} from "../../reducers/types";

export function UpdateRooms(key=0,data=[]){

    return {
        type: ROOMS_STATUS,
        payload: {
            key: key,
            data: data
        }

    }
}
export function UpdateSelectedRooms(key=0,data=[]){
    return {
        type: ROOMS_SELECTED,
        payload: {
            key: key,
            data: data
        }

    }
}

