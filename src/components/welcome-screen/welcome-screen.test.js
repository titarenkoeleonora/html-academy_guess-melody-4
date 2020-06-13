import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

it(`WelcomeScreen correctly render`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonClick={() => {}}
        />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
