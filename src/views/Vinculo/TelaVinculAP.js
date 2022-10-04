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

import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { Picker } from "@react-native-picker/picker";
import { LocalContext } from "../../contexts/local";

export default function TelaVinculoAp() {
  const [classe, setClasse] = useState();
  const { userLogin, addTurma } = useContext(LocalContext);
  const [selectedInstituicao, setSelectedInstituicao] = useState(
    userLogin.instituicao.nmInstituicao
  );
  const [selectedClass, setSelectedClass] = useState("Selecione uma turma...");
  const [selectedAluno, setSelectedAluno] = useState("Selecione um aluno...");
  const [selectAluno, setSelectAluno] = useState("Selecione um aluno...");
  const [selectCdAluno, setSelecCdAluno] = useState("Selecione um aluno...");
  const [selectTurma, setSelectTurma] = useState("Selecione um aluno...");
  const [selectCdTurma, setSelecCdTurma] = useState("Selecione um aluno...");
  const [materia, setMateria] = useState();
  const navigator = useNavigation();
  const [modalVisibleClass, setModalVisibleClass] = useState(false);
  const [modalVisibleAluno, setModalVisibleAluno] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [turma, setTurma] = useState([]);

   function handleVincular() {
    console.log(selectCdTurma,typeof(selectCdAluno))
    const options = {
      method: 'POST',
      url: 'http://192.168.15.77:8090/turma/associate',
      params: {turmaId: selectCdTurma, contaId: selectCdAluno},
      headers: {'Content-Type': 'application/json'}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      Alert.alert("Conta Vinculada!")
    }).catch(function (error) {
      console.error(error);
      Alert.alert("Erro")
    });
  }

  useEffect(() => {
    getAlunos();
    getTurmas();
  }, []);

  function getTurmas() {
    const options = { method: "GET", url: "http://192.168.15.77:8090/turma/" };

    axios
      .request(options)
      .then(function (response) {
        setTurma(response.data.content);
        //console.log(response.data.content);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getAlunos() {
    const options = { method: "GET", url: "http://192.168.15.77:8090/conta" };

    axios
      .request(options)
      .then(function (response) {
        setAlunos(response.data.content);
        //console.log(response.data.content);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function vinculaAluno() {
    const data = {
      cdAluno: selectCdAluno,
      cdTurma: selectCdTurma,
    };

    console.log(data);
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
          <Text style={styles.title}>Vínculo de Alunos</Text>
        </View>

        <Text style={styles.label}>Aluno</Text>

        <TouchableOpacity
          style={styles.selectArea}
          onPress={() => setModalVisibleAluno(true)}
        >
          <Text style={styles.selectAreaText}>{selectAluno}</Text>
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

        <TouchableOpacity style={styles.btnDarFeedback} onPress={handleVincular}>
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
                style={{ width: "100%" }}
                selectedValue={selectedClass}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedClass(itemValue);
                  setSelectTurma(JSON.parse(itemValue).nmTurma);
                  setSelecCdTurma(JSON.parse(itemValue).cdTurma);
                }}
              >
                {
                  turma.map((item, index) =>{
                    return (
                      <Picker.Item
                        key={index}
                        label={item.nmTurma}
                        value={JSON.stringify(item)}
                      />
                    );
                  })
                }
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
                style={{ width: "100%" }}
                selectedValue={selectedAluno}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedAluno(itemValue);
                  setSelectAluno(JSON.parse(itemValue).nmConta);
                  setSelecCdAluno(JSON.parse(itemValue).cdConta);
                }}
              >
                {alunos.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.nmConta}
                      value={JSON.stringify(item)}
                    />
                  );
                })}
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
