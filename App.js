import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/routes";
import LocalProvider from "./src/contexts/local";
import AvaliacaoProvider from "./src/contexts/avaliacoes";
import { useState } from "react";

export default function App() {
  const [hidden, setHidden] = useState(false);
  return (
    <>
    <StatusBar
        style="dark" />
      <LocalProvider>
        <AvaliacaoProvider>
          <Routes />
        </AvaliacaoProvider>
      </LocalProvider>
    </>
  );
}

