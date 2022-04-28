import React, { useEffect } from "react";
import { AuthNavigator, SidebarNavigator } from "./navigators";
import useAuth from "./hooks/useAuth";
import { ToastProvider } from "react-native-toast-notifications";
import Toast from "./utils/toast";

function Main() {
  //console.disableYellowBox = true;
  const { isSignedIn, auth } = useAuth();
  useEffect(() => {}, [auth]);

  return !isSignedIn() ? (
    <AuthNavigator />
  ) : (
    <ToastProvider
      placement="top"
      offsetTop={50}
      animationType="slide-in"
      animationDuration={250}
      swipeEnabled={true}
      renderType={{
        type_achievement: (toast) => <Toast message={toast.message} title={toast.title} type="achievement" />,
        type_report: (toast) => <Toast message={toast.message} title={toast.title} type="report" />,
      }}
    >
      <SidebarNavigator />
    </ToastProvider>
  );
}

export { Main };
