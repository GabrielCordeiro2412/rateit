import React, { useState, useContext } from "react";
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

import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";

export default function TelaCadastro() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [switchState, setSwitchState] = useState("Sou Aluno");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Data de nascimento...");

  const navigator = useNavigation();

  function onChange(event, selectedData) {
    const currentDate = selectedData || date;
    console.log(currentDate);
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    console.log(fDate);
    setText(fDate);
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

          <View style={styles.switchView}>
            <Switch
              trackColor={{ false: "#767577", true: "#7FC060" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#6C62FF"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.titleSwitch}>{switchState}</Text>
          </View>

          <Text style={styles.title}>Cadastro</Text>
        </View>
        {isEnabled ? (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Nome Completo..."
              placeholderTextColor="#000"
              style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Email..."
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholderTextColor="#000"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Senha..."
              style={styles.input}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry={true}
              placeholderTextColor="#000"
            />
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="Nome Completo..."
              placeholderTextColor="#000"
              style={styles.input}
            />
            <TextInput
              placeholder="Email..."
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholderTextColor="#000"
            />
            <TextInput
              placeholder="Senha..."
              style={styles.input}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry={true}
              placeholderTextColor="#000"
            />

            <TextInput
              placeholder="Instituição"
              placeholderTextColor="#000"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.inputData}
              onPress={() => showMode("date")}
            >
              <Text>{text}</Text>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                  style={{ width: 100 }}
                />
              )}
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.btnCadastrar}>
          <Text style={styles.txtBtnCadastro}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Text style={styles.logue}>Já Possui uma Conta? Faça o Login</Text>
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
    fontSize: 40,
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
    marginBottom: 20,
    padding: 5,
  },
  inputData: {
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 20,
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
});
