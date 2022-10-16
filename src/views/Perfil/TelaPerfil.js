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
  const navigator = useNavigation();

  const { turma, userLogin } = useContext(LocalContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.textWelcome}>Meu Perfil</Text>

        <View style={styles.headerClass}>
          {userLogin.dsTipoConta == "p" ? (
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
            <Text style={styles.txtNomeClass}>
              {userLogin.dsTipoConta == "p" ? (
                <Text style={styles.txtNomeClass}>Profº </Text>
              ) : (
                <></>
              )}
              {userLogin.nmConta}
            </Text>
            <Text style={styles.txtNomeClass}>
              Instituição - {userLogin.instituicao.nmInstituicao}{" "}
              {userLogin.dsTipoConta == "a" ? `- ${turma.nmTurma}` : ``}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bntSettings}
          onPress={() => navigator.navigate("TelaEditarDados")}
        >
          <Image
            source={require("../../../assets/edit.png")}
            style={styles.imgSettings}
          />
          <Text style={styles.txtBtnSettings}>Editar Dados</Text>
        </TouchableOpacity>

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

        {userLogin.dsTipoConta == "p" ? (
          <TouchableOpacity
            style={styles.bntSettings}
            onPress={() => navigator.navigate("TelaVinculoAp")}
          >
            <Image
              source={require("../../../assets/students.png")}
              style={styles.imgSettings}
            />
            <Text style={styles.txtBtnSettings}>Gerenciar Alunos</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
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
