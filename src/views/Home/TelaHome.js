import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LocalContext } from "../../contexts/local";
import { StatusBar } from "expo-status-bar";

export default function TelaHome() {
  const [className, setClassName] = useState("2TDSS");

  const { sair } = useContext(LocalContext);

  const navigator = useNavigation();

  function handleFeedback() {
    navigator.navigate("TelaDarFeedback");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#fff" hidden={false} />
      <View style={styles.subcontainer}>
        <Text style={styles.textWelcome}>Home - {className}</Text>
        <TouchableOpacity style={styles.bntClass} onPress={handleFeedback}>
          <Text style={styles.txtNomeClass}>Agile Software</Text>
          <Image
            source={require("../../../assets/seta.png")}
            style={styles.img}
          />
        </TouchableOpacity>
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
});
