import React, { createContext, useState, useEffect } from "react";

export const AvaliacaoContext = createContext({});

function AvaliacaoProvider({ children }) {
  const dataAgr = new Date();
  const dataFormatada =
    dataAgr.getDate() + "/" + dataAgr.getMonth() + "/" + dataAgr.getFullYear();

  const [salas, setSalas] = useState([]);

  const [notaGeral, setNotaGeral] = useState();
  const [qtdPorNota, setQtdPorNota] = useState();

  function addSala(data) {
    setSalas([...salas, data]);
    console.log(data);
  }

  function addAvalicao() {}

  /* useEffect(() => {
    //qualidadeAula();
    //geraGraficoBasico();
  }, []);
*/

  /*function qualidadePorAula(){
    var qualidade = 0;
    var qtdElementos = 0;
    var media = 0;
    var contador = 0;
    var avaliacao = []
    while(contador < salas[contador].feedbacks.length ){
      avaliacao.push(salas[contador].feedbacks["nota"])
      contador++;
    }
    console.log(avaliacao)
  }*/

  /*
  function qualidadeAula() {
    var qualidade = 0;
    var qtdElementos = 0;
    var media = 0;
    for (let i = 0; i < avaliacoes.length; i = i + 1) {
      qualidade = qualidade + avaliacoes[i]["nota"];
      qtdElementos = qtdElementos + 1;
    }
    media = qualidade / qtdElementos;
    setNotaGeral(media);
  }*/

  /*
  function geraGraficoBasico() {
    setQtdPorNota();
    var nota1 = 0;
    var nota2 = 0;
    var nota3 = 0;
    var nota4 = 0;
    var nota5 = 0;
    avaliacoes.forEach((element) => {
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

  return (
    <AvaliacaoContext.Provider
      value={{
        //avaliacoes,
        //addAvaliacao,
        //squalidadeAula,
        addSala,
        notaGeral,
        qtdPorNota,
        salas,
        // geraGraficoBasico
        //qualidadePorAula
      }}
    >
      {children}
    </AvaliacaoContext.Provider>
  );
}

export default AvaliacaoProvider;
