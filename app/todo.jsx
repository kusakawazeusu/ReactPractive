import React from 'react';
import ReactDom from 'react-dom';

// 純Render
const TodoList = (props) => (
	<ul>
		{
			props.items.map((item) =>{
                if(typeof item.pic === 'undefined')
                    return <li key={item.id}>{item.text}</li>
                else
                    return <li key={item.id}><img src={item.pic}/></li>;
            })
		}
	</ul>
)

const ImgMsg = (item) => {
    return <li key={item.id}><img src={item.pic}/></li>;
}


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.focus = this.focus.bind(this);
        this.pushMsg = this.pushMsg.bind(this);
        this.connectWS = this.connectWS.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeServerStatus = this.changeServerStatus.bind(this);
        this.state = {
            items: [],
            text: '',
            serverStatus: 'Pending'
        };
    }

    focus() {
        this.refs.inputBox.focus();
    }

    connectWS() {
        wsClient = new WebSocket("ws://220.129.155.191:9000");

        wsClient.onmessage = (e) => {
            this.pushMsg(e.data);
        }

        wsClient.onopen = () => {
            console.log('server connected');
            this.changeServerStatus(true);
        }

        wsClient.onerror = (err) => {
            alert('Connection Error');
            this.changeServerStatus(false);
        }

        wsClient.onclose = () => {
            this.changeServerStatus(false);
        }
    }

    render() {
        return (
            <div className="uk-margin-left uk-margin-top">
                <h3>Chat Server: {this.state.serverStatus} <button onClick={this.connectWS} className={this.state.serverStatus == 'Online'? "hidden":'uk-button uk-button-small uk-margin-small-left uk-button-danger'}>Connect</button></h3>
                
                <TodoList items={this.state.items}></TodoList>
                <form onSubmit={this.handleSubmit}>
                    <input ref="inputBox" onChange={this.onChange} value={this.state.text} />
                    <button className="uk-button uk-button-small uk-margin-small-left uk-button-primary">{'Add'}</button>
                </form>
            </div>
        )
    }
    onChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.text.length > 0)
        {
            this.pushMsg(this.state.text);
            this.focus();
            wsClient.send(this.state.text);
        }
    }
    pushMsg(msg) {

        if(msg.endsWith('.jpg') || msg.endsWith('.gif') || msg.endsWith('.png') || msg.endsWith('.jpeg'))
        {
            // handle pics
            this.state.items.push({pic: msg, id: Date.now()});
        }
        else
        {
            this.state.items.push({text: msg, id: Date.now()});
        }

        this.setState({items: this.state.items, text: ''});
    }
    changeServerStatus(status)
    {
        if(status)
            this.setState({serverStatus: 'Online'});
        else
            this.setState({serverStatus: 'Offline'});
    }

    componentWillMount() {
        this.connectWS();
    }
}

ReactDom.render(<TodoApp />, document.getElementById('todolist'));
