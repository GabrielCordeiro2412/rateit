import React, { useState, useEffect } from "react";
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

import { Audio } from "expo-av";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

export default function TelaDarFeedback() {
  const navigator = useNavigation();

  const [btnEnabled, setBtnEnabled] = useState(false);
  const [recording, setRecording] = useState();
  const [estado, setEstado] = useState();
  const [uri, setUri] = useState();
  const [isPlaying, setPlaying] = useState(false);
  const [sounds, setSound] = useState(null);
  //const [fetch, setFecthing] = useState(false);

  const recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
      extension: ".mp3",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  function checkAnswer() {
    if (btnEnabled) {
      uploadAudioAsync(uri);
    } else {
      Alert.alert("Primeiro dê o feedback antes de proceder!");
    }
  }

  //Funcionou!!!!!!!!!
  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
      { shouldPlay: false }.uri
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound");
    console.log(sound);
    await sound.playAsync();
  }

  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    //console.log(fileType);

    const formData = new FormData();
    formData.append("audio", {
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
    };

    //console.log("POSTing " + uri + " to " + apiUrl);
    //console.log(options);
    //return fetch(apiUrl, options);

    options.body = formData;

    console.log(options);
    try{
      await fetch("http://192.168.137.1:1880/audio", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    }catch(err){
      console.log(err)
    }
  }
    
    

  async function startRecording() {
    if (btnEnabled == false) {
      console.log(btnEnabled);
    } else {
      setBtnEnabled(false);
    }
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });

      console.log("Starting recording..");
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(recordingOptions);
      await rec.startAsync();

      setRecording(rec);
      //console.log(recording);

      setEstado("Gravando Feedback....");
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uril = recording.getURI();

    setUri(uril);
    console.log("Recording stopped and stored at", uril);
    setBtnEnabled(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.viewTitle}>
          <TouchableOpacity onPress={() => navigator.navigate("TelaHome")}>
            <Image
              source={require("../../../assets/voltar.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Agile Software</Text>
          <Text style={styles.subtitle}>
            Olá "nome", clique no icone e diga seu feedback sobre a aula
          </Text>
        </View>

        <View style={styles.viewAudioFeedback}>
          {recording ? (
            <>
              <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
              >
                <TouchableOpacity
                  style={styles.btnAudioFeedbackRecording}
                  onPress={recording ? stopRecording : startRecording}
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                >
                  <Image
                    source={require("../../../assets/mic.png")}
                    style={styles.imgMic}
                  />
                </TouchableOpacity>
              </Animatable.View>
              <Text style={styles.subtitleFeedbackRecording}>
                Clique para parar de gravar!
              </Text>
            </>
          ) : (
            <TouchableOpacity
              style={styles.btnAudioFeedback}
              onPress={recording ? stopRecording : startRecording}
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
            >
              <Image
                source={require("../../../assets/mic.png")}
                style={styles.imgMic}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.subtitleFeedback}>
            Exemplo: “Eu adorei a aula, o professor foi muito interativo, nota
            5”
          </Text>
        </View>
        <TouchableOpacity
          style={
            btnEnabled ? styles.btnDarFeedback : styles.btnDarFeedbackDisabled
          }
          onPress={playAudio}
        >
          <Text style={styles.txtContinuar}>Continuar</Text>
        </TouchableOpacity>

        {!btnEnabled ? (
          <Text style={styles.txtHint}>
            *Grave o seu feedback para habilitar o botão!
          </Text>
        ) : (
          <></>
        )}
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
    marginTop: 50,
  },
  subtitleFeedback: {
    textAlign: "center",
    color: "#000",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 40,
  },
  subtitleFeedbackRecording: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    fontStyle: "italic",
  },
  btnAudioFeedback: {
    backgroundColor: "#6C62FF",
    borderRadius: 100,
    padding: 40,
  },
  btnAudioFeedbackRecording: {
    backgroundColor: "#D7375E",
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
    marginTop: 130,
  },
  txtContinuar: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  btnDarFeedbackDisabled: {
    backgroundColor: "#C4C4C4",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 130,
  },
  txtHint: {
    alignSelf: "center",
    color: "#000",
    fontWeight: "600",
    marginTop: 10,
  },
});
