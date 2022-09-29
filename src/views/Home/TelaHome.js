import React, { useContext, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { LocalContext } from "../../contexts/local";
import { useNavigation } from "@react-navigation/native";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import {
  set,
  ref,
  onValue,
  remove,
  update,
  equalTo,
  query,
  orderByChild,
  push,
  child,
} from "firebase/database";

export default function TelaHome() {
  const [className, setClassName] = useState("2TDSS");
  const [professor, setProfessor] = useState(true);
  const [data, setData] = useState([]);

  const onInit = async () => {
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const currentUserItemsRef = query(
            ref(db, "salas"),
            orderByChild("profId"),
            equalTo(auth.currentUser.uid)
          );

          onValue(currentUserItemsRef, (snapshot) => {
            setData([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((item) => {
                setData((oldArray) => [...oldArray, item]);
              });
            }
          });
        } else if (!user) {
          navigator.navigate("TelaLogin");
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error("Erro na requisção");
    } finally {
      console.log(data);
    }
  };

  useEffect(() => {
    onInit();
  }, []);

  async function sair() {
    signOut(auth)
      .then(() => {
        navigator.navigate("TelaLogin");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        return;
      });
  }

  const navigator = useNavigation();

  function handleCriarSala() {
    navigator.navigate("TelaCriarSala");
  }

  function handleVerDashboard(item) {
    navigator.navigate("TelaDetalhe", { sala: item });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.textWelcome}>Salas de Feedbacks</Text>

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


        <ScrollView>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.bntClass}
                onPress={() => handleVerDashboard(item)}
                key={index}
              >
                <Text style={styles.txtNomeClass}>
                  {item.materia} - {item.sala}
                </Text>
                <Image source={require("../../../assets/seta.png")} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity style={styles.btnExcluir} onPress={sair}>
          <Text style={styles.txtContinuar}>Sair da Aplicação</Text>
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
  imgAdd: {
    width: 40,
    height: 40,
  },
  btnExcluir: {
    backgroundColor: "#D7375E",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10
  },
  txtContinuar: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
