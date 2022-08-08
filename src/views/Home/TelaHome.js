import React, {useContext} from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LocalContext} from '../../contexts/local';
import {useNavigation} from '@react-navigation/native'

export default function TelaHome() {

  const {userLogin, logOut} = useContext(LocalContext);
  const navigator = useNavigation();

  function handleLogOut(){
    logOut();
    navigator.navigate('TelaLogin');
  }

 return (
   <SafeAreaView style={styles.container}>
    <Text style={styles.textWelcome}>Boa noite, <Text style={styles.txtUser}>{userLogin.nome}</Text></Text>
    <TouchableOpacity style={styles.bntSair} onPress={handleLogOut}>
      <Text style={styles.txtSair}>Deslogar do app</Text>
    </TouchableOpacity>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bntSair:{
    backgroundColor: '#ff0000',
    width: '50%',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  txtSair:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWelcome:{
    fontSize: 20
  },
  txtUser:{
    fontWeight: 'bold'
  }
})