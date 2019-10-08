import React from 'react';
import {YellowBox} from 'react-native';

// Ignorando aviso de depreciação do AsyncStorage com o React Native. A dependencia esta instalada separada na aplicação.
YellowBox.ignoreWarnings(['Warning: AsyncStorage has been extracted from react-native core']);
// Importando Rotas do arquivo Routes.js
import Routes from './src/routes';

export default function App() {
  return <Routes />
}
