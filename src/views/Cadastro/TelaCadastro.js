import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function TelaCadastro() {

  const navigator = useNavigation();


 return (
   <View style={styles.container}>
        <View style={styles.viewTitle}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
              <Image
              source={require('../../../assets/voltar.png')}
              style={styles.img}
              />
          </TouchableOpacity>
          <Text style={styles.title}>Cadastro</Text>
        </View>

       <TextInput placeholder='Nome Completo' style={styles.input}/>
       <TextInput placeholder='Email...' style={styles.input} textContentType='emailAddress' keyboardType='email-address'/>
       <TextInput placeholder='Senha...' style={styles.input} textContentType='password' autoCompleteType='password' secureTextEntry={true}/>


       <TouchableOpacity style={styles.btnCadastrar}>
         <Text style={styles.txtBtnCadastro}>Cadastrar</Text>
       </TouchableOpacity>

       <TouchableOpacity  onPress={() => navigator.goBack()}>
          <Text style={styles.logue}>Já Possui uma Conta? Faça o Login</Text>
       </TouchableOpacity>
       <Text style={styles.logue}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img:{
    width: 40,
    height: 40,
    marginTop: 40,
    marginBottom: 10
  },
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  title:{
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  btnCadastrar:{
    backgroundColor: '#6C62FF',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginTop: 10
  },
  txtBtnCadastro:{
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
  logue:{
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 25
  }
})