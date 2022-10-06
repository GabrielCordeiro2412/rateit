import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { AirbnbRating } from "react-native-ratings";

import { useNavigation } from "@react-navigation/native";
import { LocalContext } from "../../contexts/local";

import axios from "axios";

const STAR_IMAGE = require("../../../assets/star.png");

export default function TelaVerFeedback({ route }) {
  const navigator = useNavigation();

  const [loading, setLoading] = useState(false);
  const [msgFeedback, setMsgFeedback] = useState(route.params.teste.convertida);
  const [notaFeedback, setNotaFeedback] = useState(route.params.teste.nota);
  const [sala, setSala] = useState(route.params.clss);
  const [avaliacao, setAvaliacao] = useState(route.params.clss.avaliacoes);
  const { userLogin } = useContext(LocalContext);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    //console.log(sala, avaliacao);
  }, []);

  async function sendFeedback() {
    let dataF = "";
    if (date.getDate() < 10) {
      dataF = "0" + date.getDate();
    } else {
      dataF = date.getDate();
    }

    const data = {
      star: notaFeedback,
      message: msgFeedback,
      conta: userLogin,
      dateCreated:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + dataF,
      cdSala: {
        cdSala: sala.cdSala,
        conta: sala.conta,
        materia: sala.materia,
      },
    };

    const options = {
      method: 'POST',
      url: 'http://192.168.15.77:8090/feedback/create',
      headers: {'Content-Type': 'application/json'},
      data: data
    }
    console.log(data);

    await axios
      .request(options)
      .then(function (response) {
        Alert.alert(
          `Seu feedback sobre a aula ${sala.materia.nmMateria} foi enviado!`
        );
        navigator.navigate("TelaHome");
        console.log(response.data);
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
          <Text style={styles.subtitleFeedback}>{msgFeedback}</Text>
        </View>

        <TouchableOpacity style={styles.btnDarFeedback} onPress={sendFeedback}>
          {loading ? (
            <ActivityIndicator color="#fff" size={25} />
          ) : (
            <Text style={styles.txtContinuar}>Continuar</Text>
          )}
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
