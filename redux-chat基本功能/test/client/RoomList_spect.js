import React from "react"
import ReactDOM from "react-dom"
import {fromJS,Map,List} from "immutable"
import { expect } from "chai"

import RoomList from "../../src/client/components/RoomList"

import TestUtil,{
	Simulate,
	renderIntoDocument,
	isCompositeComponentWithType,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils"

describe("RoomList组件",()=>{

	it("render roomlist ",()=>{
		const rooms = fromJS([
			{id:"0", name:"room",owner:"eisneim"},
			{id:"1", name:"room2",owner:"terry"},
		])

		const component = renderIntoDocument(
			<RoomList rooms={rooms} currentRoom="1"/>
		)
		const $rooms = scryRenderedDOMComponentsWithTag(component,"a")
		expect( $rooms.length ).to.equal(2)
		const $active = scryRenderedDOMComponentsWithClass(component,"active")
		expect( $active.length ).to.equal(1)
	})

	it("能够切换房间",()=>{
		
		const rooms = fromJS([
			{id:"0", name:"room",owner:"eisneim"},
			{id:"1", name:"room2",owner:"terry"},
		])
		var currentRoom = "0"
		function switchRoom(id){
			console.log("change id:",id)
			currentRoom=id
		}
		const RoomListElm = (
			<RoomList rooms={rooms} 
					currentRoom={ currentRoom } 
					switchRoom={ switchRoom } 
			/>
		)
		const component = renderIntoDocument( RoomListElm )
		const $rooms = scryRenderedDOMComponentsWithTag(component,"a")
		Simulate.click( ReactDOM.findDOMNode($rooms[1]) )
		expect( currentRoom ).to.equal("1")

		expect( isCompositeComponentWithType( component,RoomList ) ).to.be.true
		// console.log("isElement",TestUtil.isElement(RoomListElm))
		// console.log("isElementOfType",TestUtil.isElementOfType(RoomListElm,RoomList))
		// console.log("TestUtil.isDOMComponent",TestUtil.isDOMComponent( component ))
		// console.log("isCompositeComponent",TestUtil.isCompositeComponent(component))
		
	})


})