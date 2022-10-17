import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";

export const LocalContext = createContext({});

function LocalProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instLogin, setInstLogin] = useState(null);
  const [turma, setTurma] = useState();

  const signIn = async (email, senha) => {
    try {
      const response = await fetch(
        `http://192.168.15.77:8090/conta/oauth?email=${email}&senha=${senha}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.Status == "NOT_FOUND") {
        Alert.alert("Usuário inexistente!");
        return;
      } else {
        if (json.dsTipoConta == "p") {
          setUserLogin(json);
        } else {
          if (await getTurma(json.cdConta)) {
            setUserLogin(json);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTurma = async (data) => {
    try {
      const response = await fetch(
        `http://192.168.15.77:8090/turma/listTurmasByConta?contaId=${data}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.status == 400) {
        Alert.alert(
          "Não encontrada uma turma para este aluno, fale com um professor!"
        );
        return false;
      } else {
        setTurma(json[0].turma);
        return true;
      }
    } catch (error) {
      Alert.alert(
        "Não encontrada uma turma para este aluno, fale com um professor!"
      );
    }
  };

  const signUp = async (data) => {
    const corpo = {
      nmConta: data.nome,
      dsEmail: data.email,
      dsSenha: data.senha,
      dsDocumento: data.cpf,
      dtNascimento: data.data,
      stConta: true,
      dsTipoConta: data.professor,
    };

    try {
      const response = await fetch(
        `http://192.168.15.77:8090/conta/create?token=${data.instituicao}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(corpo),
        }
      );
      const json = await response.json();
      Alert.alert("Cadastrado com sucesso!");
    } catch (err) {
      console.log(err);
      Alert.alert("Ocorreu algum erro!");
    }
  };

  const signUpInstituicao = async (data) => {
    const corpo = {
      nmInstituicao: data.nome,
      nrCnpj: data.cnpj,
      dsPlano: data.plano,
      dsToken: data.token,
      dsSenha: data.senha,
    };
    try {
      const response = await fetch(
        `http://192.168.15.77:8090s/instituicao/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(corpo),
        }
      );
      const json = await response.json();
      setInstLogin(json);
    } catch (err) {
      console.log(err);
      Alert.alert("Ocorreu algum erro!");
    }
  };

  function sair() {
    setUserLogin(null);
  }

  return (
    <LocalContext.Provider
      value={{
        signIn,
        signed: !!userLogin,
        userLogin,
        loadingUser,
        loading,
        sair,
        signUp,
        signUpInstituicao,
        getTurma,
        turma,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}

export default LocalProvider;
