import React from "react";
import { withTracker } from "meteor/react-meteor-data";

import AccountsUI from "/imports/ui/components/AccountsUI";
import Game from "/imports/phaser/Game";

class HomePage extends React.Component {
  render() {
    return <div>{this.props.user ? <Game /> : <AccountsUI />}</div>;
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(HomePage);
