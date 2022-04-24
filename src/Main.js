import React, { useEffect } from "react";
import { AuthNavigator, SidebarNavigator } from "./navigators";
import useAuth from "./hooks/useAuth";
import { ToastProvider } from "react-native-toast-notifications";
import AchievementToast from "./pages/achievements/components/achievementToast";

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
        custom_type: (toast) => <AchievementToast message={toast.message} />,
      }}
    >
      <SidebarNavigator />
    </ToastProvider>
  );
}

export { Main };
