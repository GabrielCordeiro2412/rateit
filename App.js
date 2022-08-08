import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/routes';
import LocalProvider from './src/contexts/local';

export default function App() {
  return (
    <>
      <LocalProvider>
        <StatusBar barStyle='light-content'backgroundColor="#9F8FC0"/>
        <Routes/>
      </LocalProvider>
    </>
    
  );
}