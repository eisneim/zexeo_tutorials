import { createStore } from "redux"
import coreReducer from "./reducer"

import {fromJS} from "immutable"

export const DEFAULT_STATE = fromJS({
	rooms:[{
		name:"公开房间", id:"0"
	}],
})

export function makeStore( state=DEFAULT_STATE ){
	return createStore( coreReducer, state )
}