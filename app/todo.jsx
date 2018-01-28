import React from 'react';
import ReactDom from 'react-dom';

// 純Render
const TodoList = (props) => (
	<ul>
		{
			props.items.map((item) => (
				<li key={item.id}>{item.text}</li>
			))
		}
	</ul>
)

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.focus = this.focus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            items: [],
            text: ''
        };
    }

    focus() {
        this.refs.inputBox.focus();
    }

    render() {
        return (
            <div className="uk-margin-left">
                <h3>Todo</h3>
                <TodoList items={this.state.items}></TodoList>
                <form onSubmit={this.handleSubmit}>
                    <input ref="inputBox" onChange={this.onChange} value={this.state.text} />
                    <button className="uk-button uk-button-small uk-margin-small-left uk-button-primary">{'Add #'+ (this.state.items.length+1)}</button>
                </form>
            </div>
        )
    }
    onChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.state.items.push({text: this.state.text, id: Date.now()});
        this.setState({items: this.state.items, text: ''});
        this.focus();
    }
}

ReactDom.render(<TodoApp />, document.getElementById('todolist'));
