import { fireEvent, render } from '@testing-library/react-native';
import { ReportAplicationScreen } from '../../../pages/reportScreen/ReportAplicationScreen';
describe("Text Inputs", () =>{
    /* it("Input value changes when modifying an  item", () =>{
        const navigation = jest.fn()
        const { getByPlaceholderText } = render(<ReportAplicationScreen navigation={navigation}/>);
        const element = getByPlaceholderText("Tablet, phone");
        fireEvent(element, 'changeText', 'Iphone');
        expect(getByPlaceholderText("Tablet, phone")).toHaveProp('value', "Iphone");
    });
    it("Input value clears when sending values", () =>{
        const navigation = jest.fn();
        const {getByPlaceholderText, getByText} = render(<ReportAplicationScreen navigation={navigation} />);
        fireEvent.changeText(getByPlaceholderText("Tablet, phone"), "Iphone");
        fireEvent.changeText(getByPlaceholderText("Inquiry details"), "Some details");
        fireEvent.press(getByText("Send"));
        expect(getByPlaceholderText("Tablet, phone").value).toBeUndefined();
        expect(getByPlaceholderText("Inquiry details").value).toBeUndefined();
    }); */
    it("Error value is defined when calling without inputing ", () =>{
        const navigation = jest.fn();
        const {getByPlaceholderText, getByText, getByTestId, debug} = render(<ReportAplicationScreen navigation={navigation} />);
        fireEvent.changeText(getByPlaceholderText("Tablet, phone"), "Oppo8");
        fireEvent.press(getByText("Send"));
        expect(getByPlaceholderText("Tablet, phone")).toHaveProp("value", "Oppo8");
        debug();
        console.log(getByTestId("error"));
    });

  
});