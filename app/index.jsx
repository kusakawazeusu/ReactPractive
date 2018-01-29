import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

require('./css/uikit.min.css');
require('./css/index.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);

        this.state = {
            secondsElapsed: 0,
        };
    }

    render() {
        return (
            <div className="uk-margin-left">
                <h1>Hello, {this.props.name}. My first react title :)</h1>
                <h1>You've stayed for {this.state.secondsElapsed} seconds.</h1>
            </div>
        );
    }

    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }

    componentDidMount() {
        this.interval = setInterval(this.tick,1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

App.propTypes = {
    name: PropTypes.string,
}

App.defaultProps = {
    name: 'Who?',
}

//ReactDom.render(<App name="Davis" />, document.getElementById('app'));

