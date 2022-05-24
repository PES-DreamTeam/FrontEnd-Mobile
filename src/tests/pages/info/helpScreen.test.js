import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, act } from "@testing-library/react-native";

import HelpScreen from "../../../pages/info/helpScreen";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
describe("Testing navigation in helpScreen navigator", () => {
  it("initial page contains list of buttons to redirect", async () => {
    const component = (
      <NavigationContainer>
        <HelpScreen />
      </NavigationContainer>
    );
    const { findAllByA11yRole, getAllByA11yHint, debug } = render(component);
    const buttons = await findAllByA11yRole("button");
    const hints = getAllByA11yHint(
      "Navigates to the screen with the given name"
    );
    expect(hints.length).toEqual(buttons.length);
  });
  it("clicking on FAQs button redirects you to the FAQs screen ", async () => {
    const component = (
      <NavigationContainer>
        <HelpScreen/>
      </NavigationContainer>
    );
    const { findByText, debug, getByA11yHint } = render(component);
    const faqsbutton = await findByText("FAQs");
    act(() => {
      fireEvent(faqsbutton, "press");
    });
    expect(
      getByA11yHint("Navigates back to the main list of buttons")
    ).toBeTruthy();
  });

  it("navigating to FAQscreen and pressing back button redirects you to mainList", async () => {
    const component = (
      <NavigationContainer>
        <HelpScreen />
      </NavigationContainer>
    );
    const { findByText, getByA11yHint, findByA11yHint, getAllByA11yHint } =
      render(component);
    const faqsbutton = await findByText("FAQs");

    act(() => {
      fireEvent(faqsbutton, "press");
    });
    expect(
      getByA11yHint("Navigates back to the main list of buttons")
    ).toBeTruthy();

    const backbutton = getByA11yHint(
      "Navigates back to the main list of buttons"
    );
    
    act(() => {
      fireEvent(backbutton, "press");
    });
    expect(
      getAllByA11yHint("Navigates to the screen with the given name")
    ).toBeTruthy();
  });
});
