import React,{ Component, PropTypes } from "react"
import Message from "./Message"

class MessageList extends Component {
	isSelf( message ){
		return this.props.username === message.get("user")
	}

	$getMessages( messages ){
		if(!messages || messages.size == 0)
			return <p>还没有信息</p>

		return messages.map((message,index)=>{
			return <Message key={index} 
				isSelf={ this.isSelf(message) }
				message={ message }/>
		})
	}

	render(){
		return (
			<ul className="chat-messages">
				{
					this.$getMessages( this.props.messages )
				}
			</ul>
		)
	}

}

import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(MessageList, PureRenderMixin )

export default MessageList
