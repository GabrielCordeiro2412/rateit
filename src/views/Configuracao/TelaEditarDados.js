import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";

export default function TelaEditarDados() {
  const [selectedClass, setSelectedClass] = useState("2TDSS");
  const [selectedInstituicao, setSelectedInstituicao] = useState("FIAP");
  const [professor, setProfessor] = useState(true);
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
          <Text style={styles.title}>Editar Dados</Text>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput placeholder="Nome Completo..." placeholderTextColor="#000" style={styles.input} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email..."
          style={styles.input}
          textContentType="emailAddress"
          placeholderTextColor="#000"
          keyboardType="email-address"
        />
        {
            professor ?
            <>
                <Text style={styles.label}>Instituição Vinculado</Text>
                <TextInput
                    placeholder="Insitiuição..."
                    style={styles.inputDesabled}
                    placeholderTextColor="#000"
                    value={selectedInstituicao}
                />
                <Text style={styles.labelObs}>
                *Envie uma solicitação por email para mudar de instituição
                </Text>
            </>
            :
            <>
                <Text style={styles.label}>Turma</Text>
                <TextInput
                    placeholder="Turma..."
                    style={styles.inputDesabled}
                    placeholderTextColor="#000"
                    value={selectedClass}
                    />
                <Text style={styles.labelObs}>
                *Para mudar a turma contate a sua instituição
                </Text>
            </>
        }
        

        <TouchableOpacity style={styles.btnDarFeedback}>
          <Text style={styles.txtContinuar}>Atualizar</Text>
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
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 25,
    padding: 5,
  },
  inputDesabled: {
    width: "100%",
    height: 50,
    borderBottomWidth: 2,
    marginTop: 10,
    padding: 5,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  labelObs: {
    fontWeight: "500",
    marginTop: 5,
    fontSize: 12,
  },
  btnDarFeedback: {
    backgroundColor: "#6C62FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 30
  },
  txtContinuar: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
