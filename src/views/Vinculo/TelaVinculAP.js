import React, { useState, useRef, useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";
import { LocalContext } from "../../contexts/local";

export default function TelaVinculoAp() {
  const [classe, setClasse] = useState();
  const {userLogin} = useContext(LocalContext)
  const [selectedInstituicao, setSelectedInstituicao] = useState(userLogin.instituicao.nmInstituicao);
  const [selectedClass, setSelectedClass] = useState("Selecione uma turma...");
  const [selectedAluno, setSelectedAluno] = useState(
    "Selecione um aluno..."
  );
  const [materia, setMateria] = useState();
  const navigator = useNavigation();
  const [modalVisibleClass, setModalVisibleClass] = useState(false);
  const [modalVisibleAluno, setModalVisibleAluno] = useState(false);
  

  function handleCriarSala() {
    Alert.alert("Sala criada!");
    console.log(selectedClass);
    navigator.navigate("TelaHome");
  }

  /*
   <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue, itemIndex) => setSelectedClass(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> 

        <TextInput
          placeholder="Selecione a matéria..."
          placeholderTextColor="#000"
          style={styles.input}
          value={materia}
          onChangeText={(text) => setMateria(text)}
        />

         <TextInput
          placeholder="Selecione a matéria..."
          placeholderTextColor="#000"
          style={styles.input}
          value={classe}
          onChangeText={(text) => setClasse(text)}
        />

        */

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
          <Text style={styles.title}>Vínculo de Alunos</Text>
        </View>

        <Text style={styles.label}>Aluno</Text>

        <TouchableOpacity
          style={styles.selectArea}
          onPress={() => setModalVisibleAluno(true)}
        >
          <Text style={styles.selectAreaText}>{selectedAluno}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Turma</Text>
        <TouchableOpacity
          style={styles.selectArea}
          onPress={() => setModalVisibleClass(true)}
        >
          <Text style={styles.selectAreaText}>{selectedClass}</Text>
        </TouchableOpacity>

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

        <TouchableOpacity style={styles.btnDarFeedback}>
          <Text style={styles.txtContinuar}>Vincular aluno</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          visible={modalVisibleClass}
          transparent={true}
          onRequestClose={() => {
            setModalVisibleClass(!modalVisibleClass);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Selecione uma turma</Text>
              <Picker
              style={{width: "100%"}}
              selectedValue={selectedClass}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedClass(itemValue)
                }
              >
                <Picker.Item label="2TDSS" value="2TDSS" />
                <Picker.Item label="1TDSS" value="1TDSS" />
                <Picker.Item label="1TDSR" value="1TDSR" />
                <Picker.Item label="2TDSR" value="2TDSR" />
              </Picker>

              <TouchableOpacity
                style={styles.btnFecharModal}
                onPress={() => setModalVisibleClass(!modalVisibleClass)}
              >
                <Text style={styles.txtXFecharModal}>X</Text>
                <Text style={styles.txtFecharModal}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          visible={modalVisibleAluno}
          transparent={true}
          onRequestClose={() => {
            setModalVisibleAluno(!modalVisibleAluno);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Selecione um aluno</Text>
              <Picker
              style={{width: "100%"}}
              selectedValue={selectedAluno}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedAluno(itemValue)
                }
              >
                <Picker.Item label="Lucas Gabriel" value="Lucas Gabriel" />
                <Picker.Item label="Gabriel Cordeiro" value="Gabriel Cordeiro" />
                <Picker.Item label="Willian" value="Willian" />
                <Picker.Item label="Gustavo" value="Gustavo" />
              </Picker>

              <TouchableOpacity
                style={styles.btnFecharModal}
                onPress={() => setModalVisibleAluno(!modalVisibleAluno)}
              >
                <Text style={styles.txtXFecharModal}>X</Text>
                <Text style={styles.txtFecharModal}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    padding: 10,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
  },
  selectArea: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: "center",
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
  selectAreaText: {
    color: "#626262",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#FBFBFB",
    borderRadius: 20,
    borderWidth: 1,
    padding: 35,
    width: "100%",
    height: "50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnFecharModal: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "space-around",
    alignItems: "center",
    width: 130,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  txtXFecharModal: {
    fontSize: 25,
    fontWeight: "600",
  },
  txtFecharModal: {
    fontSize: 20,
    fontWeight: "600",
  },
});
