import { Links } from "/imports/api/links/links.js";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

class Info extends React.Component {
  handleSubmit = event => {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    const url = target.url;

    Meteor.call("links.insert", title.value, url.value, error => {
      if (error) {
        alert(error.error);
      } else {
        title.value = "";
        url.value = "";
      }
    });
  };
  render() {
    const { links } = this.props;
    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>
          <li>
            <form className="info-link-add" onSubmit={this.handleSubmit}>
              <input type="text" name="title" placeholder="Title" required />
              <input type="url" name="url" placeholder="Url" required />
              <input type="submit" name="submit" value="Add new link" />
            </form>
          </li>
          {links.map((link, index) => (
            <li key={link.title + "_" + index}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  const linksHandle = Meteor.subscribe("links.all");
  return {
    linksLoading: !linksHandle.ready(),
    links: Links.find({}).fetch()
  };
})(Info);
