import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import i18n from 'i18n-js';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import useReportAplication from '../../hooks/useReportAplication';
import CustomButton from '../../utils/button';
import CustomDropDown from "../../utils/customDropDown";
import { useToast } from 'react-native-toast-notifications';

function ReportAplicationScreen({navigation}) {

    const toast = useToast();
    const { sendReport } = useReportAplication();

    const customStyle = require('../../utils/customStyleSheet');

    const [open, setOpen] = useState(false);
    const [pickerVal, setPickerVal] = useState("bug");


      const initialState = {
        platform: '',
        osVersion: '',
        subject: '',
        details: '',
    };
    
    const [report, setReport] = useState(initialState);
    const {platform, osVersion, subject, details} = report;
    const [error, setError] = useState({
        error: false, 
        message: ''
    });

    const onChangeText = (text, name) => {
        setReport({
            ...report,
            [name]: text 
        })
    }

    const clearAllFields = () => {
        setReport(initialState);
        setPickerVal(null);
    }
    
    const reportApp = async ()  => {
        if (platform.trim().length === 0 || osVersion.trim().length === 0 ||
        subject.trim().length === 0 || details.trim().length === 0 || pickerVal === null) {
        setError({
            error: true,
            message:  <Text>{i18n.t("report.ReportApplicationScreen.fillfields")}</Text>
        })
        }
        else{              
            await sendReport(pickerVal,platform,osVersion,subject,details)
            clearAllFields()
            navigation.navigate("Home");
            toast.show("", {
                title: i18n.t("reportAppToast.title"),
                message: i18n.t("reportAppToast.message"),
                type: "custom_type",
                location: "reportApp",
              });
        }
        
    }        
    
    return(
    
       <View style={customStyle.formContainer}>
           {error.error ?
                        <View style={styles.errorContainer}>
                            <Text style={styles.error}>
                                {error.message}
                            </Text>
                        </View>
                : null}
           
           <ScrollView style={[styles.topContainer]} keyboardShouldPersistTaps="always">  
                <View style={customStyle.formInputContainer}>           
                    <Text style={customStyle.formInputTitle}>
                        {i18n.t("report.ReportApplicationScreen.type")}
                    </Text>
                    <CustomDropDown
                        options={[
                            i18n.t("report.ReportApplicationScreen.bug"),
                            i18n.t("report.ReportApplicationScreen.generalHelp"),
                            i18n.t("report.ReportApplicationScreen.featureRequest"),
                            i18n.t("report.ReportApplicationScreen.feedback")

                        ]}
                        changeSelected={setPickerVal}
                    />
                </View>
                <View style={customStyle.formInputContainer}> 
                    <Text style={customStyle.formInputTitle}>
                        {i18n.t("report.ReportApplicationScreen.mobilepl")}
                    </Text>
                    <CustomDropDown
                        options={[
                            i18n.t("report.ReportApplicationScreen.smartphone"),
                            i18n.t("report.ReportApplicationScreen.tablet"),
                        ]}
                        changeSelected={setPickerVal}
                    />
                </View>
                <View style={customStyle.formInputContainer}> 
                    <Text style={customStyle.formInputTitle}>
                        {i18n.t("report.ReportApplicationScreen.OSversion")}
                    </Text>
                    <CustomDropDown
                        options={[
                            i18n.t("report.ReportApplicationScreen.ios"),
                            i18n.t("report.ReportApplicationScreen.android"),
                        ]}
                        changeSelected={setPickerVal}
                    />  
                </View>
                <View style={customStyle.formInputContainer}> 
                    <Text style={customStyle.formInputTitle}>
                        {i18n.t("report.ReportApplicationScreen.subjectinquiry")}
                    </Text>
                    <TextInput
                        style={[customStyle.formInputText, {textAlignVertical: "center"}]}
                        name="reportMessage"
                        value={subject}
                        onChangeText={(text) => onChangeText(text, 'subject')}
                        placeholder= 'Inquiry subject'
                    />    
                </View> 
                <View style={customStyle.formInputContainer}> 
                    <Text style={customStyle.formInputTitle}>
                        {i18n.t("report.ReportApplicationScreen.detailsinquiry")}
                    </Text>
                    <TextInput
                        style={customStyle.formInputText}
                        name="reportMessage"
                        value={details}
                        onChangeText={(text) => onChangeText(text, 'details')}
                        placeholder= 'Inquiry details'
                        multiline={true}
                        numberOfLines={5}
                            
                    />      
                </View>
                <CustomButton
                    customStyles={styles.button}
                    text="Send"
                    onPress={reportApp}
                />
            </ScrollView>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    preScroll:{
        width: '100%',
        zIndex: 19,
    },
    topContainer:{
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 25,
    },
    formTitle: {
        marginBottom: 10,
        color: '#5CB362',
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#c5a9fc',
        borderColor: '#b491fa',
        borderWidth: 3
    },
    input: {
        height: 40, 
        marginBottom: 15,
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    errorContainer: {
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor:'#ff00001c',
        padding: 5,
    }
  
})

export {ReportAplicationScreen}