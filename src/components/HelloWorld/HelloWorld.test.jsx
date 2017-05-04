import React from "react";
import renderer from "react-test-renderer";
import HelloWorld from "./HelloWorld";

describe ("HelloWorld", () => {
  it ("works", () => {
    const component = renderer.create (<HelloWorld name="Bob" />);
    const tree = component.toJSON ();
    expect (tree).toMatchSnapshot ();
  });
});
