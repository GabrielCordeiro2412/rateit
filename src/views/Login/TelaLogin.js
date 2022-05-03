import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function TelaLogin() {

  const navigator = useNavigation();

 return (
   <View style={styles.container}>
        <Image
        source={require('../../../assets/login.png')}
        style={styles.img}
        />

        <View style={styles.viewTitle}>
          <Text style={styles.title}>Login</Text>
        </View>
       
       <TextInput placeholder='Email...' style={styles.input}/>
       <TextInput placeholder='Senha...' style={styles.input} textContentType='password' autoCompleteType='password' secureTextEntry={true}/>

       <TouchableOpacity style={styles.viewEsqueceu}>
          <Text style={styles.esqueceu}>Esqueceu a senha?</Text>         
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnLogin}>
         <Text style={styles.txtBtnLogin}>Login</Text>
       </TouchableOpacity>
       
       <TouchableOpacity  onPress={() => navigator.navigate('TelaCadastro')}>
          <Text style={styles.cadastre}>Não posui conta? Cadastre-se</Text>
       </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  img:{
    width: 370,
    height: 370,
    marginTop: 20
  },
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  title:{
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold'
  },
  btnLogin:{
    backgroundColor: '#6C62FF',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
  },
  txtBtnLogin:{
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  input:{
    width: '80%',
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 20,
    padding: 5
  },
  viewTitle:{
    width: '80%',
    marginBottom: 20
  },
  viewEsqueceu:{
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 20
  
  },
  esqueceu:{
    color: '#000',
    fontSize: 15,
    fontWeight: '600'
  },
  cadastre:{
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 25
  }
})