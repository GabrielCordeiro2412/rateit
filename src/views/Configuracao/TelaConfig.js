import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LocalContext } from "../../contexts/local";

export default function TelaConfiguracao() {
  const navigator = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const [switchState, setSwitchState] = useState("Modo Noturno");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const { sair } = useContext(LocalContext);

  function handleSair() {
    sair();
  }

  function handleAlterarSenha() {
    Alert.alert("Funcionalidade em produção");
  }

  function handleApagarConta() {
    Alert.alert("Funcionalidade em produção");
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  function toggleSwitch() {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setSwitchState("Sou Professor");
    } else {
      setSwitchState("Sou Aluno");
    }
  }

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
          <Text style={styles.title}>Configurações</Text>
        </View>

        <View style={styles.bntSettings}>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#6C62FF"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.txtBtnSettingsLock}>Modo Noturno</Text>
        </View>

        <TouchableOpacity
          style={styles.bntSettings}
          onPress={handleAlterarSenha}
        >
          <Image
            source={require("../../../assets/lock.png")}
            style={styles.imgSettingsLock}
          />
          <Text style={styles.txtBtnSettingsLock}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bntSettings} onPress={handleSair}>
          <Image
            source={require("../../../assets/out.png")}
            style={styles.imgSettings}
          />
          <Text style={styles.txtBtnSettings}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bntSettings}
          onPress={handleApagarConta}
        >
          <Image
            source={require("../../../assets/deleteAc.png")}
            style={styles.imgSettings}
          />
          <Text style={styles.txtBtnSettings}>Apagar Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  img: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  viewTitle: {
    width: "80%",
    marginBottom: 20,
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
  subcontainer: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  bntSettings: {
    width: "100%",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 15,
  },
  txtBtnSettings: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },
  txtBtnSettingsLock: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 13,
  },
  imgSettings: {
    width: 35,
    height: 35,
  },
});
