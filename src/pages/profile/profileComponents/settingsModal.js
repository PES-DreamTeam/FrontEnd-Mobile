import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
import i18n from 'i18n-js';
import CustomButton from '../../../utils/button'
import Modal from 'react-native-modal';
import useUserSettings from "../../../hooks/useUserSettings";
import useAuth from "../../../hooks/useAuth";



export default ({isVisible, handleCancel}) => {
    
    const [nickname, setNickname] = useState('');
    const customStyle = require('../../../utils/customStyleSheet');
    const { setLanguage, language } = useUserSettings();
    const { auth, deleteAccount } = useAuth();
    const onSubmitDelete = () => {
        if (nickname === auth.user.nickname) {
            deleteAccount();
        }
    }
    return (
        <Modal isVisible={isVisible}>
            <View style={[customStyle.modalContainer]}>
                <Text style={[customStyle.bigTitle, {marginTop: 20}]}>
                    {i18n.t("settings.title")}
                </Text>
                <View style={[customStyle.modalContentContainer, {marginTop: 0}]}>
                
                    <View style={[customStyle.blockContainer, {marginBottom: 20}]}>
                        <View>
                            <Text style={customStyle.subtitle}>
                                {i18n.t("settings.setLanguage")} 
                            </Text>
                            <View style={customStyle.buttonRow}>
                                <CustomButton
                                    onPress={() => setLanguage("en")}
                                    text={i18n.t("settings.setEN")}
                                    customStyles={[
                                        language == "en" ? 
                                        styles.selectedLanguageButton 
                                        : {marginVertical: 20, width: '25%'},
                                    ]}
                                />
                                <CustomButton
                                    onPress={() => setLanguage("es")}
                                    text={i18n.t("settings.setES")}
                                    customStyles={[
                                        language == "es" ? 
                                        styles.selectedLanguageButton 
                                        : {marginVertical: 20, width: '25%'},
                                    ]}                                
                                />
                                <CustomButton
                                    onPress={() => setLanguage("cat")}
                                    text={i18n.t("settings.setCAT")}
                                    customStyles={[
                                        language == "cat" ? 
                                        styles.selectedLanguageButton 
                                        : {marginVertical: 20, width: '25%'},
                                    ]}                                
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[customStyle.blockContainer, {marginBottom: 20}]}>
                        <View>
                            <Text style={customStyle.subtitle}>
                                {i18n.t("settings.deleteAccount")} 
                            </Text>
                            <Text style={[customStyle.normalText,{textDecorationLine: "underline"}]}>
                                {"\n"}
                                {i18n.t("settings.deleteAccountSubtitle")}
                            </Text>
                            <Text style={customStyle.normalText}>
                                {"\n"}
                                {i18n.t("settings.confirmDeleteAccount")}: 
                                {"\n"}
                            </Text>
                            <TextInput
                                onChangeText={(text) => setNickname(text)}
                                value={nickname}
                                style={[customStyle.formInputText, {textAlignVertical: 'center', width: '100%'}]}
                                name="numberPlate"
                                placeholder= {auth.user.nickname}
                            />
                            <CustomButton
                                onPress={onSubmitDelete}
                                text={i18n.t("miscelaneus.delete")}
                                customStyles={{marginVertical: 20, width: '100%', backgroundColor: 'red'}}
                            />
                            
                        </View>
                    </View>
                    
                    <CustomButton
                        onPress={() => handleCancel()}
                        text={i18n.t('miscelaneus.back')}
                        customStyles={{marginBottom: 20, marginTop: 20}}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        marginTop: '5%',
        width: '100%',
        textAlign: 'left',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    textContainer: {
        width: '75%',
    },
    image: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    imageC: {  
        position:'absolute',
        marginRight: 95,
        marginTop:30,
        left:60,
        top: -10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 3,
    },
    titleD: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 3,
        color:'green'
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        width : 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#c72b20',
    },
    buttonContainer: {
        width: '20%',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    selectedLanguageButton: {
        backgroundColor: "#006fc7",
        borderColor: "black",
        borderWidth: 2,
        marginVertical: 20,
        width: '25%',
    },
});