import React, { createContext, useState, useEffect } from "react";

export const AvalicaoContext = createContext({});

function AvaliacaoProvider({ children }) {
  const [avaliacoes, setAvaliacoes] = useState([
    {
      id: 1,
      descricao: "Gostei muito da aula, nota 5",
      nota: 5,
      data: new Date().getDate(),
    },
    {
      id: 2,
      descricao: "Legal, mas poderia ser melhor, nota 3",
      nota: 3,
      data: new Date().getDate(),
    },
    {
      id: 3,
      descricao: "Didática péssima, não gostei nem um pouco! Nota 1",
      nota: 1,
      data: new Date().getDate(),
    },
  ]);
  const [notaGeral, setNotaGeral] = useState();
  const [qtdPorNota, setQtdPorNota] = useState();

  function addAvaliacao(avaliacao) {
    setAvaliacoes([...avaliacoes, avaliacao]);
  }

  function qualidadeAula() {
    let media;
    avaliacoes.forEach((element) => {
      console.log(element.nota);
      media = media + element.nota;
    });
    setNotaGeral(media);
    geraGraficoBasico();
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
    <AvalicaoContext.Provider
      value={{ avaliacoes, addAvaliacao, qualidadeAula, notaGeral, qtdPorNota }}
    >
      {children}
    </AvalicaoContext.Provider>
  );
}

export default AvaliacaoProvider;
