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
  ActivityIndicator,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";
import { LocalContext } from "../../contexts/local";

export default function TelaCadastro() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [switchState, setSwitchState] = useState("Sou Aluno");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);
  const [text, setText] = useState("Selecione a data...");
  const [step, setStep] = useState(1);
  const [cpf, setCpf] = useState();
  const [nome, setNome] = useState();
  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();
  const [instuicao, setInstuicao] = useState();
  const [sendDate, setSendDate] = useState();
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(LocalContext);

  const navigator = useNavigation();

  useEffect(() => {
    setStep(1);
    if (Platform.OS === "ios") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  function nextStep() {
    if (step == 2) {
    } else {
      setStep(step + 1);
    }
  }

  function previousStep() {
    if (step == 1) {
      return;
    } else {
      setStep(step - 1);
    }
  }

  useEffect(() => {
    //console.log(date)
    if (date.getMonth() + 1 < 10) {
      let fDate =
        date.getFullYear() +
        "-" +
        "0" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate();
      setSendDate(fDate);
    } else if (date.getDate() < 10) {
      let fDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + "0" + (date.getDate());
      setSendDate(fDate);
    }else{
      let fDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      setSendDate(fDate);
    }
  }, [date]);

  useEffect(() => {
    if (date.getMonth() + 1 < 10) {
      let fDate =
        date.getFullYear() +
        "-" +
        "0" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate();
      setSendDate(fDate);
    } else if (date.getDate() < 10) {
      let fDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()+1);
      setSendDate(fDate);
    }else{
      let fDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      setSendDate(fDate);
    }
  }, []);

  function onChange(event, selectedData) {
    const currentDate = selectedData || date;
    //console.log(currentDate);
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    //console.log(fDate);
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

  function cadastrar() {
    setLoading(true);
    let aluno;

    if (isEnabled) {
      aluno = "a";
    } else {
      aluno = "p";
    }

    const data = {
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf,
      instituicao: instuicao,
      data: sendDate,
      professor: aluno
    };

    console.log(data);
    if (
      email == null ||
      senha == null ||
      nome == null ||
      data == null ||
      cpf == null ||
      instuicao == null
    ) {
      Alert.alert("Preencha todo os campos!");
      setLoading(false);
    } else {
      signUp(data);
      navigator.navigate("TelaLogin");
      setLoading(false);
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

          <View
            style={
              Platform.OS === "ios"
                ? styles.switchView
                : styles.switchViewAndroid
            }
          >
            <Switch
              trackColor={{ false: "#767577", true: "#7FC060" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#6C62FF"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.titleSwitch}>{switchState}</Text>
          </View>
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
          {step == 1 ? (
            <Text style={styles.title}>Cadastro</Text>
          ) : (
            <TouchableOpacity>
              <Text style={styles.txtStepBack} onPress={previousStep}>
                Voltar
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.txtStep}>Parte {step} de 2</Text>
        </View>

        {step == 1 ? (
          <>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              placeholder="Seu nome..."
              placeholderTextColor="#000"
              value={nome}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Seu email..."
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#000"
            />
            <Text style={styles.label}>Número do CPF</Text>
            <TextInputMask
              style={styles.input}
              type={"cpf"}
              value={cpf}
              onChangeText={(text) => setCpf(text)}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Sua senha..."
              style={styles.input}
              textContentType="password"
              autoCompleteType="password"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry={true}
              placeholderTextColor="#000"
            />
            <Text style={styles.label}>Token da Instituição</Text>
            <TextInput
              placeholder="Token da Instituição"
              placeholderTextColor="#000"
              value={instuicao}
              onChangeText={(text) => setInstuicao(text)}
              style={styles.input}
            />
            <Text style={styles.label}>Data de Nascimento</Text>
            {Platform.OS === "ios" ? (
              <TouchableOpacity
                style={styles.inputDataIOS}
                onPress={() => showMode("date")}
              >
                {show && (
                  <DateTimePicker
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    style={{ width: 90, marginTop: 20, marginLeft: -5 }}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.inputDataAndroid}
                onPress={() => showMode("date")}
              >
                <Text>{text}</Text>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    style={{ width: 90 }}
                  />
                )}
              </TouchableOpacity>
            )}
          </>
        )}

        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={step == 1 ? nextStep : cadastrar}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={25} />
          ) : (
            <Text style={styles.txtBtnCadastro}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {step == 1 ? (
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Text style={styles.logue}>Já Possui uma Conta? Faça o Login</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
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
