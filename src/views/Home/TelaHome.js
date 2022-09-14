import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function TelaHome() {
  const [className, setClassName] = useState("2TDSS");
  const [professor, setProfessor] = useState(false);
  const [aula, setAula] = useState("Agile Software");

  const navigator = useNavigation();

  function handleFeedback() {
    navigator.navigate("TelaDarFeedback");
  }

  function handleCriarSala() {
    navigator.navigate("TelaCriarSala");
  }

  function handleVerDashboard() {
    navigator.navigate("TelaDashboard");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#fff" hidden={false} />
      <View style={styles.subcontainer}>
        {professor ? (
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
          <Text style={styles.textWelcome}>Home - {className}</Text>
        )}

        {professor ? (
          <TouchableOpacity
            style={styles.bntClass}
            onPress={handleVerDashboard}
          >
            <Text style={styles.txtNomeClass}>
              {aula} - {className}
            </Text>
            <Image source={require("../../../assets/seta.png")} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bntClass} onPress={handleFeedback}>
            <Text style={styles.txtNomeClass}>{aula}</Text>
            <Image
              source={require("../../../assets/seta.png")}
              style={styles.img}
            />
          </TouchableOpacity>
        )}
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
