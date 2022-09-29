import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import { set, ref, onValue, remove, update, equalTo, query, orderByChild, push, child } from "firebase/database";


export default function TelaCriarSala() {
  const [classe, setClasse] = useState();
  const [selectedInstituicao, setSelectedInstituicao] = useState("FIAP");
  const [materia, setMateria] = useState();
  const navigator = useNavigation();

  function handleCriarSala() {
    Alert.alert("Sala criada!");
    navigator.navigate("TelaHome");
  }

  async function cadastrar(){
    const id = push(child(ref(db), 'salas')).key
    set(ref(db, `/salas/${id}`), {
      id: id,
      materia: materia,
      sala: classe,
      instituicao: selectedInstituicao,
      profId: auth.currentUser.uid,
    }).then(()=>{
      Alert.alert("Sala criada com sucesso!");
      navigator.navigate("TelaHome")
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
      <View style={styles.subcontainer}>
        <View style={styles.viewTitle}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Image
              source={require("../../../assets/voltar.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Criar Sala</Text>
        </View>

        <Text style={styles.label}>Matéria</Text>
        <TextInput
          placeholder="Digite a matéria..."
          placeholderTextColor="#000"
          style={styles.input}
          value={materia}
          onChangeText={(text) => setMateria(text)}
        />

        <Text style={styles.label}>Turma</Text>
        <TextInput
          placeholder="Digite a Turma..."
          placeholderTextColor="#000"
          style={styles.input}
          value={classe}
          onChangeText={(text) => setClasse(text)}
        />

        <Text style={styles.label}>Instituição</Text>
        <TextInput
          placeholder="Insitiuição..."
          style={styles.inputDesabled}
          placeholderTextColor="#000"
          value={selectedInstituicao}
          editable={false}
        />
        <Text style={styles.labelObs}>
          *Envie uma solicitação por email para mudar de instituição
        </Text>

        <TouchableOpacity style={styles.btnDarFeedback} onPress={cadastrar}>
          <Text style={styles.txtContinuar}>Criar Sala</Text>
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
    marginTop: 30,
  },
  txtContinuar: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
