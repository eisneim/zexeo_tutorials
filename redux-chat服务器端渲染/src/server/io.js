const DEFAULT_ROOM = "0"

export default function listenWebSocket( io, store ){
	io.on("connection", socket=>{
		console.log("one client connected")
		
		socket.emit("state", store.getState() )
		// join this to the default room
		socket.join( DEFAULT_ROOM )
		// add/remove room logic goes here
		socket.on("action",action => {
			console.log("client action:", action )
			switch( action.type ){
				case "SWITCH_ROOM":
					return switchRoom( socket, action.roomId || DEFAULT_ROOM )
				
				// send this message back
				case "NEW_MESSAGE":
					if( socket.rooms && socket.rooms.length>0  ){
						socket.rooms.forEach(id=>{
							socket.to( id ).emit("message", action.message)	
						})
					}else{
						socket.emit( "message", action.message )
					}
					return
			}

			store.dispatch(action)
			// now send back new state
			socket.emit("state", store.getState() )
			if( ["ADD_ROOM","REMOVE_ROOM"].indexOf(action.type) > -1){
				socket.broadcast.emit("state", store.getState() )
			}
		})


		socket.on('disconnect', () => {
		  console.log('user disconnected');
		});
	})
}

function switchRoom(socket,roomId){
	socket.rooms.forEach( (room,index)=>{
		console.log("should leave room, skip first one")
		if( index > 0 ){
			socket.leave( room )
		}
	})

	setTimeout(()=>{
		socket.join( roomId )
		console.log( "roomId:",roomId, "socket.rooms:",socket.rooms )
	},200)
}