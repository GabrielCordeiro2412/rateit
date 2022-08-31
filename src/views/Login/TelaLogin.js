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

export default function TelaLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigation();

  const { signIn, userLogin } = useContext(LocalContext);

  function handleLogin() {
    signIn();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Image
          source={require("../../../assets/login.png")}
          style={styles.img}
        />

        <View style={styles.viewTitle}>
          <Text style={styles.title}>Login</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          placeholderTextColor="#000"
          style={styles.input}
          value={email}
          textContentType="emailAddress"
          onChangeText={(texto) => setEmail(texto)}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholder="Digite sua senha..."
          style={styles.input}
          value={password}
          textContentType="password"
          autoCompleteType="password"
          secureTextEntry={true}
          onChangeText={(texto) => setPassword(texto)}
        />

        <TouchableOpacity style={styles.viewEsqueceu}>
          <Text style={styles.esqueceu}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.txtBtnLogin}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigator.navigate("TelaCadastro")}>
          <Text style={styles.cadastre}>Não posui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    marginTop: 20,
    alignSelf: "center",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    alignSelf: "center",
  },
  subcontainer: {
    flex: 1,
    width: "90%",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
});
