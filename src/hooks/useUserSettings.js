import React, { useContext } from 'react';
import { UserSettingsContext } from '../context/userSettingsContext';
const useUserSettings = () => {
    const { saveUserSettings, language } = useContext(UserSettingsContext);

    const setLanguage = (language) => {
        saveUserSettings({ language });
    }
    return { setLanguage, language };
}

export default useUserSettings;