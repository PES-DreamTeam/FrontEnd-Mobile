import { fireEvent, render } from '@testing-library/react-native';
import {  ReportApplicationScreen } from '../../../pages/reportScreen/ReportApplicationScreen';
describe("Text Inputs", () =>{
    it("Input value changes when modifying an  item", () =>{
        const navigation = jest.fn()
        const sendReport = jest.fn();
        const { getByPlaceholderText } = render(<ReportApplicationScreen navigation={navigation} sendReport={sendReport}/>);
        const element = getByPlaceholderText("Tablet, phone");
        fireEvent(element, 'changeText', 'Iphone');
        expect(getByPlaceholderText("Tablet, phone")).toHaveProp('value', "Iphone");
    });
    it("Input value doesn't clear when not sending all values", () =>{
        const navigation = jest.fn();
        const sendReport = jest.fn();
        const {getByPlaceholderText, getByText} = render(<ReportApplicationScreen navigation={navigation} sendReport={sendReport} />);
        fireEvent.changeText(getByPlaceholderText("Tablet, phone"), "Iphone");
        fireEvent.changeText(getByPlaceholderText("Inquiry details"), "Some details");
        fireEvent.press(getByText("Send"));
        expect(getByPlaceholderText("Tablet, phone").props.value).toEqual("Iphone");
        expect(getByPlaceholderText("Inquiry details").props.value).toEqual("Some details");

    });
    it("Error value is defined when calling without inputing ", () =>{
        const navigation = jest.fn();
        const sendReport = jest.fn();
        const {getByPlaceholderText, getByText, getByTestId} = render(<ReportApplicationScreen navigation={navigation} sendReport={sendReport} />);
        fireEvent.changeText(getByPlaceholderText("Tablet, phone"), "Oppo8");
        fireEvent.press(getByText("Send"));
        expect(getByPlaceholderText("Tablet, phone")).toHaveProp("value", "Oppo8");
        expect(getByTestId("error")).toBeDefined();
        expect(sendReport).not.toHaveBeenCalled();
    });
   /*  it("Input value clears when filling all fields and sending" , () =>{
        const navigation = jest.fn();
        const sendReport = jest.fn();
        const {getByPlaceholderText, getByText, getByTestId, debug} = render(<ReportApplicationScreen navigation={navigation} sendReport={sendReport} />);
        fireEvent.changeText(getByPlaceholderText("Tablet, phone"), "Oppo8");
        fireEvent.changeText(getByPlaceholderText("Inquiry details"), "Some details");
        fireEvent.changeText(getByPlaceholderText("Inquiry subject"), "Some subject");
        fireEvent.changeText(getByPlaceholderText("OS version"), " Android 14");
        
        const element = getByTestId("picker");
        fireEvent(element, "changeValue", "bug")
        // debug()
        console.log(getByTestId("picker").children);
        
        fireEvent.press(getByText("Send"));
        expect(getByPlaceholderText("Tablet, phone")).toHaveProp("value", "Oppo8");
        expect(sendReport).toHaveBeenCalled(); 

    }); 
    */
        
  
});