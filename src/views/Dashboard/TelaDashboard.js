import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";

export default function TelaDashboard({ route }) {
  const [descQualidade, setDescQualiade] = useState("");
  const [notaGeral, setNotaGeral] = useState(0);
  const [codigoSala, setCdSala] = useState(route.params.sala.cdSala);
  const [qtdPorNota, setQtdPorNota] = useState({
    n1: 0,
    n2: 0,
    n3: 0,
    n4: 0,
    n5: 0,
  });
  const [avaliacoes, setAvaliacoes] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(async () => {
    const options = { method: "GET" };

    await fetch(
      `http://192.168.15.77:8090/feedback/getBySalaId?salaId=${codigoSala}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setAvaliacoes(response);
        var qualidade = 0;
        var qtdElementos = 0;
        var media = 0;
        if (response.length > 0) {
          for (let i = 0; i < response.length; i = i + 1) {
            qualidade = qualidade + response[i]["star"];
            qtdElementos = qtdElementos + 1;
          }
          media = qualidade / qtdElementos;
        }
        console.log("media:", media);
        setNotaGeral(media);
      })
      .catch((err) => console.error(err));
  }, []);

  async function refreshAv() {
    const options = { method: "GET" };

    await fetch(
      `http://192.168.15.77:8090/feedback/getBySalaId?salaId=${codigoSala}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setAvaliacoes(response);
        var qualidade = 0;
        var qtdElementos = 0;
        var media = 0;
        if (response.length > 0) {
          for (let i = 0; i < response.length; i = i + 1) {
            qualidade = qualidade + response[i]["star"];
            qtdElementos = qtdElementos + 1;
          }
          media = qualidade / qtdElementos;
        }
        console.log("media:", media);
        setNotaGeral(media);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    qualidadeAula();
    geraGraficoBasico();
    geraQualidade();
  }, [notaGeral]);

  function qualidadeAula() {
    var qualidade = 0;
    var qtdElementos = 0;
    var media = 0;
    if (avaliacoes.length > 0) {
      for (let i = 0; i < avaliacoes.length; i = i + 1) {
        qualidade = qualidade + avaliacoes[i]["star"];
        qtdElementos = qtdElementos + 1;
      }
      media = qualidade / qtdElementos;
    }
    console.log("media:", media);
    setNotaGeral(media);
  }

  function geraGraficoBasico() {
    var nota1 = 0;
    var nota2 = 0;
    var nota3 = 0;
    var nota4 = 0;
    var nota5 = 0;
    avaliacoes.forEach((element) => {
      if (element.star == 1) {
        nota1 = nota1 + 1;
      }
      if (element.star == 2) {
        nota2 = nota2 + 1;
      }
      if (element.star == 3) {
        nota3 = nota3 + 1;
      }
      if (element.star == 4) {
        nota4 = nota4 + 1;
      }
      if (element.star == 5) {
        nota5 = nota5 + 1;
      }
    });

    const notas = {
      n1: nota1,
      n2: nota2,
      n3: nota3,
      n4: nota4,
      n5: nota5,
    };
    setQtdPorNota(notas);
  }

  const navigator = useNavigation();

  function geraQualidade() {
    console.log("nota geral: ", notaGeral);
    if (notaGeral < 3) {
      setDescQualiade("RUIM");
    }
    if (notaGeral >= 3 && notaGeral < 4) {
      setDescQualiade("MEDIA");
    }
    if (notaGeral >= 4 && notaGeral < 5) {
      setDescQualiade("BOA");
    }
    if (notaGeral == 5) {
      setDescQualiade("EXCELENTE");
    }
  }

  function refresh() {
    refreshAv();
    qualidadeAula();
    geraQualidade();
    geraGraficoBasico();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.subcontainer}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <View style={styles.viewTitle}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Image
              source={require("../../../assets/voltar.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {route.params.sala.materia.nmMateria} -{" "}
            {route.params.sala.turma.nmTurma}
          </Text>
        </View>
        <BarChart
          data={{
            labels: ["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5"],
            datasets: [
              {
                data: [
                  qtdPorNota.n1,
                  qtdPorNota.n2,
                  qtdPorNota.n3,
                  qtdPorNota.n4,
                  qtdPorNota.n5,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 35}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 5,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 5,
          }}
        />
        <View
          style={
            notaGeral < 3
              ? styles.viewFeedbackNotaRuim
              : notaGeral >= 3 && notaGeral < 4
              ? styles.viewFeedbackNotaMedia
              : notaGeral >= 4 && notaGeral < 5
              ? styles.viewFeedbackNotaBoa
              : notaGeral == 5
              ? styles.viewFeedbackNotaExcelente
              : styles.viewFeedback
          }
        >
          <Text style={styles.descFeedback}>Qualidade geral da aula</Text>
          <Text style={styles.descFeedback}>{descQualidade}</Text>
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          Comentários dos alunos
        </Text>
        <ScrollView showsVerticalScrollIndicator={true}>
          {avaliacoes.map((item, index) => {
            return (
              <View key={index} style={styles.viewFeedback}>
                <Text style={styles.descFeedback}>
                  {item.message} - {item.dateCreated}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
        style={[styles.backTotop, { right: 30, bottom: 70 }]}
        onPress={onPressTouch}
      >
        <Image
          source={require("../../../assets/backTop.png")}
          style={styles.imgBack}
        />
      </TouchableOpacity>
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
    marginBottom: 5,
  },
  backTotop: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "#3B4786",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgBack: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
});
