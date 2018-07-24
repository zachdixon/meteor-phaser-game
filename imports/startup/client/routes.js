import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
import { mount } from "react-mounter";

// Import needed templates
import MainLayout from "/imports/ui/layouts/MainLayout";
import HomePage from "/imports/ui/pages/HomePage";
import NotFoundPage from "/imports/ui/pages/NotFoundPage";

// Set up all routes in the app
FlowRouter.route("/", {
  name: "App.home",
  action() {
    mount(MainLayout, { content: <HomePage /> });
  }
});

FlowRouter.notFound = {
  action() {
    mount(MainLayout, { content: <NotFoundPage /> });
  }
};
