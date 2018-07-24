import React from "react";

export default class MainLayout extends React.Component {
  render() {
    const { content } = this.props;
    return <div>{content}</div>;
  }
}
