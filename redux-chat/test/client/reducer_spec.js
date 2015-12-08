import {fromJS} from "immutable"
import {expect} from "chai"
import rootReducer from "../../src/client/reducer"

import {
	newMessage, setState, switchRoom, setUsername
} from "../../src/client/actionCreators"

const fakeState = fromJS({
	rooms:[
		{id:"0", name:"room",owner:"eisneim"},
		{id:"1", name:"room2",owner:"terry"},
	],
	currentRoom: "1",
	username:"eisneim",
	messages: {
		"1":[
			{user:"eisneim",content:"some message",time:"23:33"},
			{user:"terry",content:"ss message",time:"12:33"},
		]
	}
})

describe("client Root reducer",()=>{
	it("set state",()=>{
		const nextState = rootReducer(fakeState,
			setState(fromJS({username:"Joan",currentRoom:"0"})) 
		)
		expect(nextState.get("username")).to.equal("Joan")
		expect(nextState.get("rooms").size).to.equal(2)
	})

	it("setusername",()=>{
		const nextState = rootReducer(fakeState,setUsername("Terry"))
		expect( nextState.get("username") ).to.equal("Terry")
	})

	it("switch chat room",()=>{
		const nextState = rootReducer(fakeState, switchRoom("0"))
		expect( nextState.get("currentRoom") ).to.equal("0")
	})

	it("send new message",()=>{
		const action = newMessage({
			roomId: "0", user:"eisneim",content:"some message"
		})
		expect(action.message.time).to.be.ok
		const nextState = rootReducer(fakeState, action )

		expect( nextState.getIn(["messages","0"]).size ).to.equal(1)
		const nextNextState = rootReducer(fakeState,{
			type:"NEW_MESSAGE",message:{
				roomId: "1", user:"terry",time:"12:00",content:"some message"
			}
		})
		expect( nextNextState.getIn(["messages","1"]).size ).to.equal(3)
	})

})

