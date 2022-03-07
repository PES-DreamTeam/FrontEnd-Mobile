import React from 'react';
import { AuthProvider } from './src/context/authContext';
import { Main } from './src/Main';
import {Text,View} from 'react-native';

export default function App() {
  return (
      <AuthProvider>
        <Main></Main>
      </AuthProvider>
  );
}