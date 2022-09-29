import React, {useContext} from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LocalContext} from '../../contexts/local';
import {useNavigation} from '@react-navigation/native'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import { set, ref, onValue, remove, update, equalTo, query, orderByChild, push, child } from "firebase/database";

export default function TelaHome() {

  const {userLogin, logOut} = useContext(LocalContext);
  const navigator = useNavigation();

  function handleLogOut(){
    logOut();
    navigator.navigate('TelaLogin');
  }

  async function sair(){
    signOut(auth)
    .then(() => {
      navigator.navigate('TelaLogin');
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      return;
    });
  }


  async function cadastrar(){
    const id = push(child(ref(db), 'items')).key
    set(ref(db, `/items/${id}`), {
      id: id,
      descricao: "Teste",
      userId: auth.currentUser.uid,
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      return;
    });
  }

 return (
   <SafeAreaView style={styles.container}>
    <Text style={styles.textWelcome}>Boa noite</Text>
    <TouchableOpacity style={styles.bntSair} onPress={cadastrar}>
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