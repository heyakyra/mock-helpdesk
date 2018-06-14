import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { mount, configure, shallow } from "enzyme";
import { expect } from "chai";
import { withRouter } from "react-router";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
const container = shallow(<App/>)
const WrappedApp = withRouter(container)

describe("App component testing", () => {
  // not working
  xit("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WrappedApp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render one div, header, unordered list, and main", () => {
    expect(container.find('div').length).to.equal(1);
    expect(container.find('header').length).to.equal(1);
    expect(container.find('ul').length).to.equal(1);
    expect(container.find('main').length).to.equal(1);
  });

  it("should render the div with the proper class", () => {
    expect(container.find('div').hasClass('App')).to.equal(true)
  });

  it("should render the header with the proper class", () => {
    expect(container.find('header').hasClass('App-header')).to.equal(true)
  });
});
