import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AvaliacaoContext } from "../../contexts/avaliacoes";
import { LocalContext } from "../../contexts/local";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TelaHome() {
  const [className, setClassName] = useState("2TDSS");
  const [professor, setProfessor] = useState(false);
  const [aula, setAula] = useState("Agile Software");
  //const { salas } = useContext(AvaliacaoContext);
  const [salas, setSalas] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();

  const { userLogin, turma } = useContext(LocalContext);

  const navigator = useNavigation();

  useEffect(async () => {
    //console.log(userLogin.cdConta);
    if (userLogin.dsTipoConta == "p") {
      //console.log("entrou p");
      const options = { method: "GET" };

      await fetch(
        `http://192.168.15.77:8090/sala/findSalaByContaId?contaId=${userLogin.cdConta}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setSalas(response))
        .catch((err) => console.error(err));
    } else {
      const options = { method: "GET" };

      await fetch("http://192.168.15.77:8090/sala/", options)
        .then((response) => response.json())
        .then((response) => setSalas(response.content))
        .catch((err) => console.error(err));
    }
  }, []);

  function handleFeedback(item) {
    navigator.navigate("TelaDarFeedback", { sala: item });
  }

  function handleCriarSala() {
    navigator.navigate("TelaCriarSala");
  }

  function handleVerDashboard(item) {
    navigator.navigate("TelaDashboard", { sala: item });
  }

  async function handleUpdateView() {
    if (userLogin.dsTipoConta == "p") {
      const options = { method: "GET" };

      await fetch(
        `http://192.168.15.77:8090/sala/findSalaByContaId?contaId=${userLogin.cdConta}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setSalas(response))
        .catch((err) => console.error(err));
    } else {
      const options = { method: "GET" };

      await fetch("http://192.168.15.77:8090/sala/", options)
        .then((response) => response.json())
        .then((response) => setSalas(response.content))
        .catch((err) => console.error(err));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        {userLogin.dsTipoConta == "p" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.textWelcome}>Feedbacks</Text>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 100,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleCriarSala}
            >
              <Image source={require("../../../assets/add.png")} />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.textWelcome}>Home - {turma.nmTurma}</Text>
        )}

        <ScrollView
          ref={scrollRef}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleUpdateView}
            />
          }
        >
          {userLogin.dsTipoConta == "p"
            ? salas.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.bntClass}
                    onPress={() => handleVerDashboard(item)}
                    key={index}
                  >
                    <Text style={styles.txtNomeClass}>
                      {item.materia.nmMateria} - {item.turma.nmTurma}
                    </Text>
                    <Image source={require("../../../assets/seta.png")} />
                  </TouchableOpacity>
                );
              })
            : salas.map((item, index) => {
                if (turma.cdTurma == item.turma.cdTurma) {
                  return (
                    <TouchableOpacity
                      style={styles.bntClass}
                      onPress={() => handleFeedback(item)}
                      key={index}
                    >
                      <Text style={styles.txtNomeClass}>
                        {item.materia.nmMateria} - {item.turma.nmTurma}
                      </Text>
                      <Image
                        source={require("../../../assets/seta.png")}
                        style={styles.img}
                      />
                    </TouchableOpacity>
                  );
                } else {
                  <></>;
                }
              })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bntClass: {
    backgroundColor: "#6C62FF",
    width: "100%",
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  txtNomeClass: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  textWelcome: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subcontainer: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  imgAdd: {
    width: 40,
    height: 40,
  },
});
