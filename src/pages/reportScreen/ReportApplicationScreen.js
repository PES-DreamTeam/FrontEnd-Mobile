import { ReportScreenContainer } from "./ReportScreenContainer";
import useReportAplication from '../../hooks/useReportAplication';

import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const ReportApplicationScreen = ({navigation}) => {
    const {sendReport} = useReportAplication();
    return (
        <View>
          <ReportScreenContainer navigation={navigation} sendReport={sendReport}/>
        </View>
      );
}
 
export { ReportApplicationScreen };