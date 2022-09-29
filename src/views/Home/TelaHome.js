import React, {useContext, useState} from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {LocalContext} from '../../contexts/local';
import {useNavigation} from '@react-navigation/native'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import { set, ref, onValue, remove, update, equalTo, query, orderByChild, push, child } from "firebase/database";

export default function TelaHome() {

  const {userLogin, logOut} = useContext(LocalContext);

  function handleLogOut(){
    logOut();
    navigator.navigate('TelaLogin');
  }

  async function sair(){
    signOut(auth)
    .then(() => {
      navigator.navigate('TelaLogin');
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      return;
    });
  }


  async function cadastrar(){
    const id = push(child(ref(db), 'items')).key
    set(ref(db, `/items/${id}`), {
      id: id,
      descricao: "Teste",
      userId: auth.currentUser.uid,
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      return;
    });
  }

  const [className, setClassName] = useState("2TDSS");
  const [professor, setProfessor] = useState(true);
  const [aula, setAula] = useState("Agile Software");
  const [salas, setSalas] = useState([
    {
      id: 1,
      sala: "Agile Software",
      turma: "2TDSS",
      feedbacks: [
        {
          id: 1,
          descricao: "Gostei muito da aula, nota 5",
          nota: 1,
        },
        {
          id: 1,
          descricao: "Gostei muito da aula, nota 5",
          nota: 1,
        },
        {
          id: 1,
          descricao: "Gostei muito da aula, nota 5",
          nota: 5,
        },
      ],
    },
    {
      id: 2,
      sala: "DevOps Cloud",
      turma: "2TDSG",
      feedbacks: [
        {
          id: 1,
          descricao: "Gostei muito da aula, nota 5",
          nota: 5,
        },
        {
          id: 1,
          descricao: "Gostei muito da aula, nota 5",
          nota: 5,
        },
        {
          id: 1,
          descricao: "Gostei muito da aula, nota 5",
          nota: 5,
        },
      ],
    },
  ]);

  const navigator = useNavigation();

  function handleFeedback() {
    navigator.navigate("TelaDarFeedback");
  }

  function handleCriarSala() {
    navigator.navigate("TelaCriarSala");
  }

  function handleVerDashboard(item) {
    navigator.navigate("TelaDashboard",{sala: item});
  }

  return (
    <SafeAreaView style={styles.container}>
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
    
            salas.map((item, index) =>{
              return(
                <TouchableOpacity
                style={styles.bntClass}
                onPress={() => handleVerDashboard(item)}
                key={index}
              >
                <Text style={styles.txtNomeClass}>
                  {item.sala} - {item.turma}
                </Text>
                <Image source={require("../../../assets/seta.png")} />
              </TouchableOpacity>
              )
            })
          
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
