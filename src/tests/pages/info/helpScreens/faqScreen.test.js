import { fireEvent, render } from "@testing-library/react-native";
import FaqScreen from "../../../../pages/info/helpScreens/faqScreen";
describe("Questions", () => {
  it("Initially, no question are open", () => {
    const navigation = { setOptions: jest.fn() };
    const { getAllByA11yLabel, getAllByA11yHint } = render(
      <FaqScreen navigation={navigation} />
    );
    expect(() => getAllByA11yHint("Question displayed")).toThrow(
      'No instances found with accessibilityHint "Question displayed"'
    );
  });
  it("When pressing on any question, answer shows up", () => {
    const navigation = { setOptions: jest.fn() };
    const { getAllByA11yLabel, getAllByA11yHint } = render(
      <FaqScreen navigation={navigation} />
    );
    const allQuestions = getAllByA11yLabel("Tap me!"); 
    allQuestions.forEach((current) => fireEvent.press(current))
    const allAnswers = getAllByA11yHint("Question displayed");
    expect(allAnswers.length).toEqual(allQuestions.length);
    
  });
  it("When pressing on any open answer, answer closes down", () => {
    const navigation = { setOptions: jest.fn() };
    const { getAllByA11yLabel, getAllByA11yHint } = render(
      <FaqScreen navigation={navigation} />
    );
    const allQuestions = getAllByA11yLabel("Tap me!"); 
    allQuestions.forEach((current) => fireEvent.press(current))
    const allAnswers = getAllByA11yHint("Question displayed");
    expect(allAnswers.length).toEqual(allQuestions.length);
    allQuestions.forEach((current) => fireEvent.press(current));
    expect(() => getAllByA11yHint("Question displayed")).toThrow(
      'No instances found with accessibilityHint "Question displayed"'
    );
    
  });
});