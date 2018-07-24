import React from "react";

export default class Hello extends React.Component {
  state = {
    counter: 0
  };
  handleClick = () => {
    this.setState({ counter: ++this.state.counter });
  };
  render() {
    const { counter } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <p>You've pressed the button {counter} times.</p>
      </div>
    );
  }
}
