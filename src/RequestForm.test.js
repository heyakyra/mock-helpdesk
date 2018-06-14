import React from "react";
import ReactDOM from "react-dom";
import RequestForm from "./RequestForm";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import { withRouter } from 'react-router'
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
const wrappedApp = withRouter(RequestForm)

describe("Request form component testing", () => {
  xit("loads a queue to state", () => {

  });
});
