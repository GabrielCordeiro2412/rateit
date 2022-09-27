import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl
} from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AvaliacaoContext } from "../../contexts/avaliacoes";
import {
  BarChart,
} from "react-native-chart-kit";

export default function TelaDashboard({route}) {
  const [professor, setProfessor] = useState(true);
  const [descQualidade, setDescQualiade] = useState("");
  const [avl, setAvl] = useState(route.params.sala.feedbacks)
  const [notaGeral, setNotaGeral] = useState();
  //const [qtdPorNota, setQtdPorNota] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  const { qtdPorNota, avaliacoes, qualidadePorAula } =
    useContext(AvaliacaoContext);

  useEffect(() => {
    qualidadeAula();
    console.log(avl)
  }, []);

  useEffect(() => {
    geraQualidade();
  }, [notaGeral]);

  

  function qualidadeAula() {
    var qualidade = 0;
    var qtdElementos = 0;
    var media = 0;
    for (let i = 0; i < avl.length; i = i + 1) {
      qualidade = qualidade + avl[i]["nota"];
      qtdElementos = qtdElementos + 1;
    }
    media = qualidade / qtdElementos;
    setNotaGeral(media);
  }

  /*function geraGraficoBasico() {
    var nota1 = 0;
    var nota2 = 0;
    var nota3 = 0;
    var nota4 = 0;
    var nota5 = 0;
    console.log(avl)
    avl.forEach((element) => {
      console.log(element.nota)
      if (element.nota == 1) {
        nota1 = nota1 + 1;
      }
      if (element.nota == 2) {
        nota2 = nota2 + 1;
      }
      if (element.nota == 3) {
        nota3 = nota3 + 1;
      }
      if (element.nota == 4) {
        nota4 = nota4 + 1;
      }
      if (element.nota == 5) {
        nota5 = nota5 + 1;
      }
    });

    let notas = {
      n1: nota1,
      n2: nota2,
      n3: nota3,
      n4: nota4,
      n5: nota5,
    };

    setQtdPorNota(notas);
  }*/

  const navigator = useNavigation();

  function geraQualidade() {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.subcontainer}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => geraQualidade()}/>}
      >
        <View style={styles.viewTitle}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Image
              source={require("../../../assets/voltar.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {route.params.sala.sala} - {route.params.sala.turma}
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
        <Text style={{fontSize: 25, fontWeight: '700', marginTop: 15, marginBottom: 10}}>Comentários dos alunos</Text>
        <ScrollView showsVerticalScrollIndicator={true}>
          {avl.map((item, index) => {
            return (
              <View key={index} style={styles.viewFeedback}>
                <Text style={styles.descFeedback}>
                  {item.descricao} - {item.data}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
      <TouchableOpacity style={[styles.backTotop, { right: 30, bottom: 70 }]} onPress={onPressTouch}>
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
