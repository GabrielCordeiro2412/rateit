import React, { useState, useRef, useContext, useEffect } from "react";
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
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";
import { LocalContext } from "../../contexts/local";

export default function TelaCriarSala() {
  const [classe, setClasse] = useState();
  const { userLogin } = useContext(LocalContext);
  const [selectedInstituicao, setSelectedInstituicao] = useState(
    userLogin.instituicao.nmInstituicao
  );
  const [selectedClass, setSelectedClass] = useState("Selecione uma turma...");
  const [selectedMateria, setSelectedMateria] = useState(
    "Selecione uma materia..."
  );

  const [selectTurma, setSelectTurma] = useState("Selecione uma turma...");
  const [selectCdTurma, setSelecCdTurma] = useState("");
  const [selectMateria, setSelectMateria] = useState(
    "Selecione uma matéria..."
  );
  const [selectCdMateria, setSelecCdMateria] = useState("");

  const navigator = useNavigation();
  const [modalVisibleClass, setModalVisibleClass] = useState(false);
  const [modalVisibleMateria, setModalVisibleMateria] = useState(false);
  const [turma, setTurma] = useState([]);
  const [materia, setMateria] = useState([]);

  async function handleCriarSala() {

    const options = { method: "POST" };

    await fetch(
      `http://192.168.15.77:8090/sala/create?cdConta=${userLogin.cdConta}&cdMateria=${selectCdMateria}&turmaId=${selectCdTurma}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then(() => Alert.alert("Sala criada com sucesso!"))
      .catch((err) => console.error(err));
    navigator.navigate("TelaHome");
  }

  useEffect(() => {
    getTurmas();
    getMaterias();
  }, []);

  function getTurmas() {
    const options = { method: "GET", url: "http://192.168.15.77:8090/turma/" };

    axios
      .request(options)
      .then(function (response) {
        setTurma(response.data.content);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getMaterias() {
    const options = {
      method: "GET",
      url: "http://192.168.15.77:8090/materia/",
    };

    axios
      .request(options)
      .then(function (response) {
        setMateria(response.data.content);
      })
      .catch(function (error) {
        console.error(error);
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

        <TouchableOpacity
          style={styles.selectArea}
          onPress={() => setModalVisibleMateria(true)}
        >
          <Text style={styles.selectAreaText}>{selectMateria}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Turma</Text>
        <TouchableOpacity
          style={styles.selectArea}
          onPress={() => setModalVisibleClass(true)}
        >
          <Text style={styles.selectAreaText}>{selectTurma}</Text>
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

        <TouchableOpacity
          style={styles.btnDarFeedback}
          onPress={handleCriarSala}
        >
          <Text style={styles.txtContinuar}>Criar Sala...</Text>
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
                style={{ width: "100%" }}
                selectedValue={selectedClass}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedClass(itemValue);
                  setSelectTurma(JSON.parse(itemValue).nmTurma);
                  setSelecCdTurma(JSON.parse(itemValue).cdTurma);
                }}
              >
                {turma.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.nmTurma}
                      value={JSON.stringify(item)}
                    />
                  );
                })}
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
          visible={modalVisibleMateria}
          transparent={true}
          onRequestClose={() => {
            setModalVisibleMateria(!modalVisibleMateria);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Selecione uma Matéria</Text>
              <Picker
                style={{ width: "100%" }}
                selectedValue={selectedMateria}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedMateria(itemValue);
                  setSelectMateria(JSON.parse(itemValue).nmMateria);
                  setSelecCdMateria(JSON.parse(itemValue).cdMateria);
                }}
              >
                {materia.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.nmMateria}
                      value={JSON.stringify(item)}
                    />
                  );
                })}
              </Picker>

              <TouchableOpacity
                style={styles.btnFecharModal}
                onPress={() => setModalVisibleMateria(!modalVisibleMateria)}
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
