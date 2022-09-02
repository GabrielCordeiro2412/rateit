import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Switch,
  Alert,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";

export default function TelaLoginInstituicao() {

  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();

  const navigator = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.viewTitle}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Image
              source={require("../../../assets/voltar.png")}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >

          <Text style={styles.title}>Login Instituição</Text>
        </View>

        <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Seu email..."
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor="#000"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Sua senha..."
              style={styles.input}
              textContentType="password"
              autoCompleteType="password"
              value={senha}
              onChangeText={text => setSenha(text)}
              secureTextEntry={true}
              placeholderTextColor="#000"
            />

        <TouchableOpacity style={styles.btnCadastrar} onPress={() => navigator.navigate('TelaHomeInstituicao')}>
          <Text style={styles.txtBtnCadastro}>Fazer Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigator.navigate('TelaCadastroInstituicao')}>
            <Text style={styles.logue}>Não Possui uma Conta? Cadastre-se</Text>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
  btnCadastrar: {
    backgroundColor: "#6C62FF",
    width: "100%",
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
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 13,
    padding: 5,
  },
  inputDataAndroid: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#6C62FF",
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  inputDataIOS: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  viewTitle: {
    width: "80%",
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
    alignSelf: "center",
  },
  subcontainer: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  switchView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  titleSwitch: {
    color: "#000",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  switchViewAndroid: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  txtStep: {
    color: "#6C62FF",
    fontWeight: "600",
    fontSize: 18,
  },
  txtStepBack: {
    color: "#6C62FF",
    fontWeight: "800",
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
