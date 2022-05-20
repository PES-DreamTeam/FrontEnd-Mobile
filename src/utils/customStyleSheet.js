'use strict';

import {StyleSheet} from 'react-native';

/*
PALETA DE COLORES


*/

module.exports = StyleSheet.create({
    blockContainer: {
        fontSize: 13,
        color: "black",
        fontFamily: 'Montserrat-Regular',
        textAlign: "left",
        textAlignVertical: "top",
        backgroundColor: "#ffffff",
    },
    blockTitleContainer: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        marginBottom: 15,
        backgroundColor: "#f3edff",
        padding: 10,
        minHeight: 100,
    },
    blockImageContainer: {
        marginRight: "10%",
        marginTop: -60,
        width: "30%",
        aspectRatio: 1,
        backgroundColor: "#ffffff",
        borderRadius: 2000,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto',
        borderRadius: 20,
        // backgroundColor: 'red'
    },
    modalContentContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '90%',
        marginTop: 20,
    },
    modalContentContainerScrollable: {
        backgroundColor: '#fff',
        width: '90%',
        marginTop: 20,
        //backgroundColor: 'red'
    },
    bigTitle: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: "black",
    },
    subtitle: {
        fontSize: 17,
        fontFamily: 'Montserrat-Bold',
        color: "black",
    },
    normalText: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: "black",
    },
    submitButtonText: {
        fontSize: 15,
        color: "white",
        fontFamily: 'Montserrat-Regular',
    },
    formContainer: {
        width: "90%",
        height: "100%",
        alignSelf: "center",
    },
    formInputContainer: {
        width: "100%",
        marginBottom: 10,
        marginTop: 10,
    },
    formInputTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: "#5CB362",
    },
    formSelectableButton: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    dropDownModalButton: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        alignSelf: "center",
        marginBottom: 20,
        
    },
    formSelectableButtonText: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Montserrat-Regular',
    },
    formInputText: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Montserrat-Regular',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        textAlign: "left",
        padding: 10,
        textAlignVertical: "top",
    },
    modalSelectableButton: {
        width: "80%",
        height: 50,
        backgroundColor: "#eee",

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressBarBackground: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        textAlign: 'left',
        justifyContent: 'center',
        backgroundColor: '#eee',
        
    },
    progressBarFill: {
        backgroundColor: "#5CB362",
        borderRadius: 15,
        textAlignVertical: 'center',
        height: "100%",

    },
    progressBarInternalText: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        height: "100%",
        textAlignVertical: 'center',
    },
});
