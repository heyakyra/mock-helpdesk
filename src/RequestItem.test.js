import React from "react";
import ReactDOM from "react-dom";
import RequestItem from "./RequestItem";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import { withRouter } from "react-router";
import Adapter from "enzyme-adapter-react-16";

const claimedProps = {
  requestTicket: { name: "Name", email: "e@ma.il", phone: "123-456-7890" },
  clickHandler: () => {}
};

const unclaimedProps = {
  ...claimedProps,
  position: 1
};

configure({ adapter: new Adapter() });
const claimedContainer = shallow(<RequestItem {...claimedProps} />);
const unclaimedContainer = shallow(<RequestItem {...unclaimedProps} />);

describe("RequestItem component testing", () => {
  it("should render a list item with the checked class if no position prop is passed", () => {
    expect(claimedContainer.find("li").hasClass("claimed")).to.equal(true);
  });

  it("should render a list item without the checked class if a position prop is passed", () => {
    expect(unclaimedContainer.find("li").hasClass("unclaimed")).to.equal(true);
  });
});
