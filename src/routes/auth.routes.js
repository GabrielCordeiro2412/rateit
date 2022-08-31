import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

import TelaLogin from "../views/Login/TelaLogin";
import TelaCadastro from "../views/Cadastro/TelaCadastro";

export default function AuthRoutes() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="TelaLogin"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AuthStack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="TelaCadastro"
          component={TelaCadastro}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
