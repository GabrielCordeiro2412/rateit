import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const LocalContext = createContext({});

function LocalProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [instLogin, setInstLogin] = useState(null);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@rateit:userApp");
      console.log(storageUser);

      if (storageUser) {
        console.log(storageUser);
        setUserLogin(JSON.parse(storageUser));
        setLoading(false);
      }
      //    console.log(storageUser);
      setLoading(false);
    }
    loadStorage();
  }, []);

  const signIn = async (email, senha) => {
    try {
      const response = await fetch(
        `http://192.168.15.77:8080/conta/oauth?email=${email}&senha=${senha}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log(json.Status);
      if (json.Status == "UNAUTHORIZED") {
        Alert.alert("Usuário inexistente!");
        return;
      } else {
        Alert.alert("Autenticado com sucessos!");

        setUserLogin(json);
      }
    } catch (err) {
      console.log(err);
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
        `http://192.168.15.77:8080/conta/create?token=${data.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(corpo),
        }
      );
      const json = await response.json();
      await AsyncStorage.setItem("@rateit:userApp", json);
      setUserLogin(json);
      console.log(json);
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
      const response = await fetch(`http://localhost:8080/instituicao/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corpo),
      });
      const json = await response.json();
      setInstLogin(json);
      console.log(json);
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
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}

export default LocalProvider;
