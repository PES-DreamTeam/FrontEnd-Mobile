import React, { useContext, useEffect } from 'react';
import { UserSettingsContext } from '../context/userSettingsContext';
const useUserSettings = () => {
    const { saveUserSettings, language } = useContext(UserSettingsContext);

    const setLanguage = (language) => {
        saveUserSettings({ language });
    }
    useEffect(()=>{},[language])
    return { setLanguage, language };
}

export default useUserSettings;