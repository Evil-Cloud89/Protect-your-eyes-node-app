import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(() => this.step(), 1000),
    });
  }
  
  step = () => {
    this.setState((state) => {
      const newState = { ...state };
  
      if (newState.time > 0) {
        newState.time -= 1;
      } else if (newState.status === 'work') {
        newState.status = 'rest';
        newState.time = 20;
      } else {
        newState.status = 'work';
        newState.time = 1200;
      }
  
      return newState;
    });
  };

  render() {
    
    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        { status === 'off' && (
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        { status === 'work' && (<img src="./images/work.png" />)}
        { status === 'rest' && (<img src="./images/rest.png" />)}
        { status !== 'off' && (
          <div className="timer">
            {this.formatTime(this.state.time)}
          </div>
        )}
        { status === 'off' && (<button className="btn" onClick={this.startTimer}>Start</button>)}
        { status !== 'off' && (<button className="btn">Stop</button>)}
        <button className="btn btn-close">X</button>
      </div>
    );
  }
};

render(<App />, document.querySelector('#app'));
