import React, { createContext, useState, useEffect } from "react";

export const AvaliacaoContext = createContext({});

function AvaliacaoProvider({ children }) {
  const dataAgr = new Date();
  const dataFormatada =
    dataAgr.getDate() + "/" + dataAgr.getMonth() + "/" + dataAgr.getFullYear();

  const [avaliacoes, setAvaliacoes] = useState([
    {
      id: 1,
      descricao: "Gostei muito da aula, nota 5",
      nota: 5,
      data: dataFormatada,
    },
    {
      id: 2,
      descricao: "Legal, mas poderia ser melhor, nota 3",
      nota: 3,
      data: dataFormatada,
    },
    {
      id: 3,
      descricao: "Didática péssima, não gostei nem um pouco! Nota 1",
      nota: 1,
      data: dataFormatada,
    },
  ]);
  const [notaGeral, setNotaGeral] = useState();
  const [qtdPorNota, setQtdPorNota] = useState();

  useEffect(()=>{
    qualidadeAula()
  },[])

  function addAvaliacao(avaliacao) {
    setAvaliacoes([...avaliacoes, avaliacao]);
    geraGraficoBasico();
  }

  function qualidadeAula() {
    var qualidade = 0;
    var qtdElementos = 0;
    var media = 0;
    for(let i = 0; i < avaliacoes.length; i = i + 1 ){
        qualidade = qualidade+avaliacoes[i]['nota']
        qtdElementos = qtdElementos +1
    }
    media = qualidade/qtdElementos;
    setNotaGeral(media)
    console.log(notaGeral)
    //console.log(qualidade, media, qtdElementos)
    /*avaliacoes.forEach((element) => {
      qualidade = qualidade + element.nota;
      console.log(qualidade)
      qtdElementos = qtdElementos + 1;
    });
    media = qualidade / qtdElementos;
    setNotaGeral(media);*/
  }

  function geraGraficoBasico() {
    setQtdPorNota();
    let nota1;
    let nota2;
    let nota3;
    let nota4;
    let nota5;
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
  }

  return (
    <AvaliacaoContext.Provider
      value={{ avaliacoes, addAvaliacao, qualidadeAula, notaGeral, qtdPorNota }}
    >
      {children}
    </AvaliacaoContext.Provider>
  );
}

export default AvaliacaoProvider;
