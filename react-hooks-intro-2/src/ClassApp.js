import React from 'react'
// import logo from './logo.svg';
// import './App.css';

 class ClassApp extends React.Component {

  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  }

  componentDidMount() {
    document.title = `I was clicked ${this.state.count} Times`
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentDidUpdate() {
    document.title = `I was clicked ${this.state.count} Times`
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    })
  }

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }))
  }

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }
  
  render() {
  return (
    <>
      <h2>Counter</h2>
      <button onClick={this.incrementCount}>I was clicked {this.state.count} Times</button>
      <h2>Toggle Light</h2>
      <div style={{height: '50px', width: '50px', background: this.state.isOn ? 'yellow' : 'grey'}} onClick={this.toggleLight}>

      </div>
      <h2>Mouse Position</h2>
      <p>X Position: {this.state.x}</p>
      <p>Y Position: {this.state.y}</p>
    </>
  );
  }
}

export default ClassApp;
