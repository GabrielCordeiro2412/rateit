import React, { useContext, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AvaliacaoContext } from "../../contexts/avaliacoes";

export default function TelaDashboard() {
  const [className, setClassName] = useState("2TDSS");
  const [professor, setProfessor] = useState(true);
  const [aula, setAula] = useState("Agile Software");
  const [descQualidade, setDescQualiade] = useState("");
  const [qualidadeCor, setQualidadeCor] = useState("#6EC359");

  const { qualidadeAula, notaGeral, qtdPorNota, avaliacoes } =
    useContext(AvaliacaoContext);

  useEffect(() => {
    geraQualidade();
  }, []);

  const navigator = useNavigation();

  function geraQualidade() {
    if (notaGeral < 3) {
      setDescQualiade("RUIM");
      setQualidadeCor("#EC637C");
    }
    if (notaGeral >= 3 && notaGeral < 4) {
      setDescQualiade("MEDIA");

      setQualidadeCor("#DDBE6F");
    }
    if (notaGeral >= 4 && notaGeral < 5) {
      setDescQualiade("BOA");
      setQualidadeCor("#98D26B");
    }
    if (notaGeral == 5) {
      setDescQualiade("EXCELENTE");
      setQualidadeCor("#6EC359");
    }
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
          <Text style={styles.title}>
            {aula} - {className}
          </Text>
        </View>
        <View style={notaGeral < 3 ? styles.viewFeedbackNotaRuim : notaGeral >= 3 && notaGeral < 4 ? styles.viewFeedbackNotaMedia : notaGeral >= 4 && notaGeral < 5 ? styles.viewFeedbackNotaBoa : notaGeral == 5 ? styles.viewFeedbackNotaExcelente : styles.viewFeedback }>
          <Text style={styles.descFeedback}>Qualidade geral da aula</Text>
          <Text style={styles.descFeedback}>{descQualidade}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          {avaliacoes.map((item, index) => {
            return (
              <View key={index} style={styles.viewFeedback}>
                <Text style={styles.descFeedback}>
                  {item.descricao} - {item.data}
                </Text>
              </View>
            );
          })}
        </ScrollView>
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
    fontSize: 25,
    fontWeight: "bold",
  },
  subcontainer: {
    flex: 1,
    width: "90%",
    marginTop: 35,
  },
  viewFeedback: {
    backgroundColor: "#6C62FF",
    width: "100%",
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  viewFeedbackNotaRuim: {
    backgroundColor: "#EC637C",
    width: "100%",
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  viewFeedbackNotaMedia: {
    backgroundColor: "#DDBE6F",
    width: "100%",
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  viewFeedbackNotaBoa: {
    backgroundColor: "#98D26B",
    width: "100%",
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  viewFeedbackNotaExcelente: {
    backgroundColor: "#6EC359",
    width: "100%",
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  descFeedback: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
