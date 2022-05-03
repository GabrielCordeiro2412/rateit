import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TelaLogin from './src/views/Login/TelaLogin'
import TelaCadastro from './src/views/Cadastro/TelaCadastro'

export default function App() {
  return (
    <TelaCadastro/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
