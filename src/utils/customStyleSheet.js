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
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#bbb",
        textAlign: "left",
        padding: 10,
        textAlignVertical: "top",
    },
    modalContainer: {
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: '100%',
        height: '50%',
        borderRadius: 20,
        padding: 20,
        // backgroundColor: 'red'
    },
    bigTitle: {
        fontSize: 25,
        fontFamily: 'Montserrat-Bold',
        color: "black",
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
});
