import React from 'react';
import { AuthProvider } from './src/context/authContext';
import { UserSettingsProvider } from './src/context/userSettingsContext';
import { MapContextProvider } from './src/context/mapContext';
import { Main } from './src/Main';

export default function App() {
  return (
    <UserSettingsProvider>
      <AuthProvider>
        <MapContextProvider>
          <Main></Main>
        </MapContextProvider>
      </AuthProvider>
    </UserSettingsProvider>
  );
}