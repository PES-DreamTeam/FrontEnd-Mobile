import React, { useEffect, useState } from "react";
import { AuthNavigator, SidebarNavigator } from "./navigators";
import useAuth from "./hooks/useAuth";
import { ToastProvider } from "react-native-toast-notifications";
import Toast from "./utils/toast";
import * as Font from 'expo-font';

function Main() {
  //console.disableYellowBox = true;
  const { isSignedIn, auth } = useAuth();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Thin': require('../assets/fonts/Montserrat/Montserrat-Thin.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Italic': require('../assets/fonts/Montserrat/Montserrat-Italic.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {}, [auth]);

  useEffect(async () => {
    setFontsLoaded(false); 
    await loadFonts();
  }, []);
  
  return fontsLoaded ? (
  
  !isSignedIn() ? (
    <AuthNavigator />
  ) : (
    <ToastProvider
      placement="top"
      offsetTop={50}
      animationType="slide-in"
      animationDuration={250}
      swipeEnabled={true}
      renderType={{
        custom_type: (toast) => <Toast title={toast.title} message={toast.message} type={toast.location} image={toast.image} />,
      }}
    >
      <SidebarNavigator color={'red'}/>
    </ToastProvider>
  )): null
}

export { Main };
