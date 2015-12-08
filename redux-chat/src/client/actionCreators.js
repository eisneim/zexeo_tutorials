import {fromJS,Map} from "immutable"
import {yymmddhhmm} from "../shared/utils/dateTime"

export function setState(state){
	return {
		type:"SET_STATE",
		state: Map.isMap(state) ? state : fromJS(state)
	}
}

export function setUsername(username){
	return {
		type: "SET_USERNAME", username
	}
}

export function switchRoom(roomId){
	return {
		type:"SWITCH_ROOM", roomId,
		meta:{ remote:true },
	}
}

export function newMessage({roomId,content,user,time}, isFromServer ){
	return {
		type:"NEW_MESSAGE",
		meta:{ remote: !isFromServer },
		message: {
			roomId, content:content||"", user,
			time:  yymmddhhmm()
		}
	}
}

export function addRoom( room ){
	if( !room || !room.owner) throw new Error("addRoom() room.owner is required")

	return {
		type:"ADD_ROOM", room,
		meta:{ remote:true },
	}
}

export function removeRoom( id, user ){
	return {
		type:"REMOVE_ROOM", 
		payload:{ id, user },
		meta:{ remote:true },
	}
}
