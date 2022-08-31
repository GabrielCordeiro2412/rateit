import React, { useContext } from "react";
import { View, ActivityIndicator, SafeAreaView } from "react-native";
import "react-native-gesture-handler";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { LocalContext } from "../contexts/local";

export default function Routes() {
  const { signed, loading } = useContext(LocalContext);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator color="#9763A9" size={50} />
      </SafeAreaView>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
