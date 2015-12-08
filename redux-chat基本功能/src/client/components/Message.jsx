import React,{ Component } from "react"

class Message extends Component {
	render(){
		const { message, isSelf } = this.props
		const className = isSelf ? "message-self":""

		return (
			<li className={className+" clearfix"}>
				<div className="message-inner">
					<p className="chat-username">{message.get("user")}
						<small>{message.get("time")}</small>
					</p>
					<p>{message.get("content")}</p>
				</div>
			</li>
		)
	}
}

import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(Message, PureRenderMixin )

export default Message
