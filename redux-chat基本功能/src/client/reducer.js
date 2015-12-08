import {fromJS,Map,List} from "immutable"

export default function rootReducer(state=Map(),action){
	switch ( action.type ){
		case "SET_STATE": return state.merge(Map( action.state ))

		case "SET_USERNAME":
			return state.set("username", action.username )

		case "SWITCH_ROOM":
			return state.set("currentRoom", action.roomId )

		case "NEW_MESSAGE":
			if(!action.message||!action.message.roomId) 
				return state

			if( state.get("messages").has( action.message.roomId ) ){
				return state.updateIn(
					["messages",action.message.roomId],
					array => array.push( Map(action.message) )
				)
			} else{
		  	return state.setIn(
		  		["messages",action.message.roomId], 
		  		List.of( Map(action.message)) 
		  	)
		  }

		default: return state
	}
}
