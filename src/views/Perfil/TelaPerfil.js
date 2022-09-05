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

export default function TelaPerfil() {
  const [name, setName] = useState("Gabriel Cordeiro");
  const [instituicao, , setInstituicao] = useState("FIAP");
  const [className, setClassName] = useState("2TDSS");
  const [prof, setProf] = useState(false);

  const navigator = useNavigation();

  const { sair } = useContext(LocalContext);

  function handleSair() {
    sair();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.textWelcome}>Meu Perfil</Text>

        <View style={styles.headerClass}>
          {prof ? (
            <Image
              source={require("../../../assets/teacher.png")}
              style={styles.img}
            />
          ) : (
            <Image
              source={require("../../../assets/profile.png")}
              style={styles.img}
            />
          )}

          <View style={styles.headerSubClass}>
            <Text style={styles.txtNomeClass}>{name}</Text>
            <Text style={styles.txtNomeClass}>
              Instituição - {instituicao} {!prof ? `- ${className}` : ``}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bntSettings}
          onPress={() => navigator.navigate("TelaConfiguracao")}
        >
          <Image
            source={require("../../../assets/settings.png")}
            style={styles.imgSettings}
          />
          <Text style={styles.txtBtnSettings}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bntSettings} onPress={() => navigator.navigate('TelaEditarDados')}>
          <Image
            source={require("../../../assets/edit.png")}
            style={styles.imgSettings}
          />
          <Text style={styles.txtBtnSettings}>Editar Dados</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerClass: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  txtNomeClass: {
    color: "#000",
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
  headerSubClass: {
    marginLeft: 15,
  },
  bntSettings: {
    width: "100%",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 15,
  },
  txtBtnSettings: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imgSettings: {
    width: 35,
    height: 35,
  },
});
