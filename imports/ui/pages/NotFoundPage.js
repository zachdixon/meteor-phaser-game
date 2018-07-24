import React from "react";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div id="not-found">
        <div className="not-found-image">
          <img src="/img/404.svg" alt="" />
        </div>
        <div className="not-found-title">
          <h1>Sorry, that page doesn't exist</h1>
          <a href="/" class="gotohomepage">
            Go to home
          </a>
        </div>
      </div>
    );
  }
}
