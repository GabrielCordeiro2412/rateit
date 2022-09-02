import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";

export default function TelaHomeInstituicao() {
  const [cnpj, setCnpj] = useState("14.408.259/0001-80");
  const [nome, setNome] = useState("FIAP");
  //const [senha, setSenha] = useState();
  const [email, setEmail] = useState("fiap@fiap.com");
  const [token, setToken] = useState("WWE-342");
  const [modalVisible, setModalVisible] = useState(false);

  const navigator = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={styles.title}>Meus Dados</Text>
          <TouchableOpacity
            style={styles.btnSair}
            onPress={() => navigator.navigate("TelaLogin")}
          >
            <Text style={styles.txtBtnSair}>Sair</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          placeholder="Nome da Instituição..."
          placeholderTextColor="#000"
          value={nome}
          onChangeText={(text) => setNome(text)}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Seu email..."
          style={styles.input}
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>CNPJ</Text>
        <TextInput
          placeholderTextColor="#000"
          value={cnpj}
          editable={false}
          style={styles.inputDesabilitado}
        />

        <Text style={styles.label}>Token</Text>
        <TextInput
          placeholderTextColor="#000"
          value={token}
          editable={false}
          style={styles.inputDesabilitado}
        />

        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={() => navigator.navigate("TelaHomeInstituicao")}
        >
          <Text style={styles.txtBtnCadastro}>Atualizar Dados</Text>
        </TouchableOpacity>

        <View style={styles.viewPlanos}>
          <Text style={styles.txtPlanoTitle}>Plano Atual:</Text>
          <View style={styles.txtViewPlano}>
            <Text style={styles.txtPlano}>BÁSICO</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnModalPlanos}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.txtBtnAlterarPlano}>Alterar Plano</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.viewSelectPlano}>
                <View style={styles.viewPlanosModal}>
                  <Text style={styles.txtPlanoTitle}>Plano</Text>
                  <View style={styles.txtViewPlano}>
                    <Text style={styles.txtPlano}>BÁSICO</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btnSelectPlano}>
                  <Text style={styles.txtBtnCadastro}>Selecionar por R$00,00/mês</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewSelectPlano}>
                <View style={styles.viewPlanosModal}>
                  <Text style={styles.txtPlanoTitle}>Plano</Text>
                  <View style={styles.txtViewPlanoPro}>
                    <Text style={styles.txtPlano}>PRO</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btnSelectPlano}>
                  <Text style={styles.txtBtnCadastro}>Selecionar por R$25,00/mês</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btnFecharModal} onPress={() => setModalVisible(!modalVisible)}>
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
  img: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
  btnCadastrar: {
    backgroundColor: "#6C62FF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  btnSelectPlano: {
    backgroundColor: "#6C62FF",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  btnModalPlanos: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#6C62FF",
  },
  txtBtnCadastro: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  txtBtnAlterarPlano: {
    color: "#6C62FF",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 13,
    padding: 5,
    color: "#000",
    fontWeight: "600",
  },
  inputDesabilitado: {
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 13,
    padding: 5,
    color: "#626262",
    fontWeight: "600",
  },
  viewTitle: {
    width: "80%",
  },
  esqueceu: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },
  logue: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 25,
    alignSelf: "center",
  },
  subcontainer: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  btnSair: {
    borderWidth: 2,
    borderColor: "#C54848",
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
  },
  txtBtnSair: {
    color: "#C54848",
    fontWeight: "600",
    fontSize: 18,
  },
  viewPlanos: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 25,
    alignItems: "center",
  },
  viewPlanosModal: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 15,
    marginBottom: 10,
  },
  txtPlanoTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
  txtViewPlano: {
    backgroundColor: "#6AD975",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  txtViewPlanoPro: {
    backgroundColor: "#D49041",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  txtPlano: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#E3E1FF",
    borderRadius: 20,
    borderWidth: 1,
    padding: 35,
    width: "100%",
    height: "60%",
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
  viewSelectPlano: {
    width: "110%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6C62FF",
    borderRadius: 10,
    marginBottom: 20,
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
