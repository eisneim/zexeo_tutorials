import React,{ Component } from "react"
import ReactDOM from "react-dom"

class InputBox extends Component {

	handleSubmit(e){
		e.preventDefault()
		var $textarea = ReactDOM.findDOMNode( this.refs.textarea )
		if( typeof this.props.sendMessage === "function" ){
			this.props.sendMessage( $textarea.value )
			$textarea.value = ""
		}else{
			console.log("props.sendMessage not defined!!")
		}

	}

	render(){
		return (
			<div id="chat-inputbox">
				<form className="flex-row" onSubmit={this.handleSubmit.bind(this)}>
					<div className="flex">
						<textarea ref="textarea" name="message" rows="4"></textarea>
					</div>
					<div style={{width:"130px",textAlign:"right"}}>
						<button type="submit" className="btn lg color-2">发送</button>
					</div>
				</form>
			</div>
		)
	}
}

import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(InputBox, PureRenderMixin )


export default InputBox