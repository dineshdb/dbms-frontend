import {ROOMS_STATUS} from '../../reducers/types'

export function UpdateRooms(key=0,data=[]){
    return {
        type: ROOMS_STATUS,
        payload: {
            key: key,
            data: data
        }

    }
}
