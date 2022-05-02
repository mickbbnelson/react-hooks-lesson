import React from "react";

class App extends React.Component {
  state = {
    count: 0
  }

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <button onClick={this.incrementCount}>I was Clicked {this.state.count} times</button>
    )
  }
}

export default App;
