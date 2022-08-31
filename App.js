import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/routes";
import LocalProvider from "./src/contexts/local";

export default function App() {
  return (
    <>
      <LocalProvider>
        <Routes />
      </LocalProvider>
    </>
  );
}
