import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LocalContext } from "../../contexts/local";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";

export default function TelaLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigation();

  const { userLogin } = useContext(LocalContext);

  function handleLogin() {
    try {
      if (email == userLogin.email && password == userLogin.senha) {
        Alert.alert("Usuário autenticado");
        navigator.navigate("TelaHome");
      } else {
        Alert.alert("Erro de Login");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Usuário não encontrado ou não existe!");
    }
  }


  async function login(){
    signInWithEmailAndPassword(
      auth, email, password
    ).then(() => {
      navigator.navigate('TelaHome');
    }).catch((err) => {
      console.log('erro',  JSON.stringify(err));
      if (err.code == 'auth/invalid-email')
        alert('E-mail inválido');
      else if (err.code == 'auth/wrong-password')
        alert('Senha inválida');
      else
        alert(err.message);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../../assets/login.png")} style={styles.img} />

      <View style={styles.viewTitle}>
        <Text style={styles.title}>Login</Text>
      </View>

      <TextInput
        placeholder="Email..."
        style={styles.input}
        placeholderTextColor="#000"
        value={email}
        textContentType="emailAddress"
        onChangeText={(texto) => setEmail(texto)}
      />

      <TextInput
        placeholder="Senha..."
        style={styles.input}
        value={password}
        placeholderTextColor="#000"
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry={true}
        onChangeText={(texto) => setPassword(texto)}
      />

      <TouchableOpacity style={styles.viewEsqueceu}>
        <Text style={styles.esqueceu}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLogin} onPress={login}>
        <Text style={styles.txtBtnLogin}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigator.navigate("TelaCadastro")}>
        <Text style={styles.cadastre}>Não posui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 370,
    height: 370,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
  },
  btnLogin: {
    backgroundColor: "#6C62FF",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
  },
  txtBtnLogin: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 20,
    padding: 5,
  },
  viewTitle: {
    width: "80%",
    marginBottom: 20,
  },
  viewEsqueceu: {
    width: "80%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  esqueceu: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },
  cadastre: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 25,
  },
});
