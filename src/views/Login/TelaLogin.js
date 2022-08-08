import React, {useState, useContext} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LocalContext} from '../../contexts/local';

export default function TelaLogin() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigation();

  const {signIn, userLogin} = useContext(LocalContext);

  function handleLogin(){
    if(email != userLogin.email ){
      Alert.alert("crendenciais invalidas"); 
    }else{
      signIn(email, password);
    }
    
  }

 return (
   <SafeAreaView style={styles.container}>
        <Image
        source={require('../../../assets/login.png')}
        style={styles.img}
        />

        <View style={styles.viewTitle}>
          <Text style={styles.title}>Login</Text>
        </View>
       
       <TextInput 
       placeholder='Email...' 
       style={styles.input}
       value={email}
       textContentType='emailAddress'
       onChangeText={(texto) => setEmail(texto)}
       />

       <TextInput 
       placeholder='Senha...' 
       style={styles.input} 
       value={password}
       textContentType='password' 
       autoCompleteType='password' 
       secureTextEntry={true}
       onChangeText={(texto) => setPassword(texto)}
       />

       <TouchableOpacity style={styles.viewEsqueceu}>
          <Text style={styles.esqueceu}>Esqueceu a senha?</Text>         
       </TouchableOpacity>

       <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
         <Text style={styles.txtBtnLogin}>Login</Text>
       </TouchableOpacity>
       
       <TouchableOpacity  onPress={() => navigator.navigate('TelaCadastro')}>
          <Text style={styles.cadastre}>Não posui conta? Cadastre-se</Text>
       </TouchableOpacity>

    </SafeAreaView>
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