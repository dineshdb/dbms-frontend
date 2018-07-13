import {combineReducers} from 'redux'
import rooms from './rooms'
import RoomsSelected from './selectedRooms'
export default combineReducers({
    rooms,
    RoomsSelected
})