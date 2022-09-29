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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, child, set } from "firebase/database"
import { auth, app, db } from "../../configs/firebase";s

export default function TelaCadastro() {
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    senha: "",
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigation();
  const { userLogin, signUp } = useContext(LocalContext);

  /*function handleSignup() {
    if (name == undefined || email == undefined || password == undefined) {
      console.log("Preencha todos os campos");
    } else {
      signUp(name, email, password);
      Alert.alert("Usuário cadastrado com sucesso! Faça o login!");
      navigator.navigate("TelaLogin");
    }
  }
  */
  async function cadastrar() {
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.senha
    )
      .then(() => {
        navigator.navigate("TelaHome");
      })
      .catch((err) => alert(err.message));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Image
            source={require("../../../assets/voltar.png")}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Cadastro</Text>
      </View>

      <TextInput
        placeholder="Email..."
        placeholderTextColor="#000"
        style={styles.input}
        textContentType="emailAddress"
        keyboardType="email-address"
        value={registerInformation.email}
        onChangeText={(value) =>
          setRegisterInformation({
            ...registerInformation,
            email: value,
          })
        }
      />

      <TextInput
        placeholder="Senha..."
        placeholderTextColor="#000"
        style={styles.input}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry={true}
        value={registerInformation.senha}
        onChangeText={(value) =>
          setRegisterInformation({
            ...registerInformation,
            senha: value,
          })
        }
      />

      <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrar}>
        <Text style={styles.txtBtnCadastro}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigator.goBack()}>
        <Text style={styles.logue}>Já Possui uma Conta? Faça o Login</Text>
      </TouchableOpacity>
      <Text style={styles.logue}></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
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
  btnCadastrar: {
    backgroundColor: "#6C62FF",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  txtBtnCadastro: {
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
  logue: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 25,
  },
});
