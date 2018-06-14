import React from "react";
import ReactDOM from "react-dom";
import AgentDashboard from "./AgentDashboard";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import { withRouter } from 'react-router'
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
const wrappedApp = withRouter(AgentDashboard)

describe("App component testing", () => {
  xit("renders without crashing", () => {
  });
});
