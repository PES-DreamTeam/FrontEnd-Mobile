import { fireEvent, render } from "@testing-library/react-native";
import FaqScreen  from "../../../../pages/info/helpScreens/faqScreen"
describe("Questions", () => {
  it("Initially, no question are open", () => {
    const navigation = {setOptions: jest.fn()}
    const { getByText, debug, getAllByA11yLabel, getAllByA11yHint } = render(
      <FaqScreen
        navigation={navigation}
      />
    );
    // const allAnswers = getAllByA11yHint("Question displayed")
   expect(() => getAllByA11yHint("Question displayed")).toThrow('No instances found with accessibilityHint "Question displayed"')
    //  debug();
   
  });
});
