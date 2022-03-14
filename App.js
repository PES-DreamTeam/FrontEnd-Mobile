import React from 'react';
import { AuthProvider } from './src/context/authContext';
import { UserSettingsProvider } from './src/context/userSettingsContext';
import { Main } from './src/Main';

export default function App() {
  return (
    <UserSettingsProvider>
      <AuthProvider>
        <Main></Main>
      </AuthProvider>
    </UserSettingsProvider>
  );
}