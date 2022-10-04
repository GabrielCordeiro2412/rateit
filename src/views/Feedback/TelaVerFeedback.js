import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from "react-native";

import { AirbnbRating } from "react-native-ratings";

import { useNavigation } from "@react-navigation/native";
import { LocalContext } from "../../contexts/local";

const STAR_IMAGE = require("../../../assets/star.png");



export default function TelaVerFeedback({route}) {
  const navigator = useNavigation();

  const [btnEnabled, setBtnEnabled] = useState(false);
  const [recording, setRecording] = React.useState();
  const [msgFeedback, setMsgFeedback] = useState(route.params.teste.convertida)
  const [notaFeedback, setNotaFeedback] = useState(route.params.teste.nota)
  const {userLogin} = useContext(LocalContext)

  useEffect(() =>{
    console.log(msgFeedback, notaFeedback)
  },[])

  function sendFeedback(){
      const data = {
        aluno: userLogin.cdConta,
        nota: notaFeedback,
        descricao: msgFeedback,
        sala: "1"
      }

      console.log(data)
  }

  function ratingCompleted() {
    Alert.alert("Seu feedback sobre a aula {nome} foi enviado!");
    navigator.navigate('TelaHome')
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
          <Text style={styles.title}>Seu feedback foi:</Text>
        </View>

        <View style={styles.viewAudioFeedback}>
          <AirbnbRating
            count={5}
            reviews={["Muito ruim", "Ruim", "Mediana", "Bom", "Muito bom"]}
            defaultRating={notaFeedback}
            size={40}
            reviewColor="#6C62FF"
            selectedColor="#6C62FF"
            isDisabled
          />
          <Text style={styles.subtitleFeedback}>
            {msgFeedback}
          </Text>
        </View>

        <TouchableOpacity style={styles.btnDarFeedback} onPress={sendFeedback}>
          <Text style={styles.txtContinuar}>Continuar</Text>
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
  subcontainer: {
    flex: 1,
    width: "90%",
    marginTop: 35,
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
  subtitle: {
    color: "#000",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 15,
  },
  viewAudioFeedback: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitleFeedback: {
    textAlign: "center",
    color: "#000",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 40,
  },
  btnAudioFeedback: {
    backgroundColor: "#6C62FF",
    borderRadius: 100,
    padding: 40,
  },
  imgMic: {
    width: 80,
    height: 80,
  },
  btnDarFeedback: {
    backgroundColor: "#6C62FF",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 300,
  },
  txtContinuar: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  txtHint: {
    alignSelf: "center",
    color: "#000",
    fontWeight: "600",
    marginTop: 10,
  },
});
