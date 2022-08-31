import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import TelaHome from "../views/Home/TelaHome";
import TelaPerfil from "../views/Perfil/TelaPerfil";
import TelaConfiguracao from "../views/Configuracao/TelaConfig";
import TelaDarFeedback from "../views/Feedback/TelaDarFeedback";
import TelaVerFeedback from "../views/Feedback/TelaVerFeedback";
import TelaEditarDados from "../views/Configuracao/TelaEditarDados";

const AppStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const icons = {
  TelaHome: {
    name: "ios-home-outline",
  },
  TelaPerfil: {
    name: "person-outline",
  },
};

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="home"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AppStack.Screen
          name="home"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="TelaConfiguracao"
          component={TelaConfiguracao}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="TelaDarFeedback"
          component={TelaDarFeedback}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="TelaVerFeedback"
          component={TelaVerFeedback}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="TelaEditarDados"
          component={TelaEditarDados}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

function TabNav() {
  return (
    <Tabs.Navigator
      initialRouteName="TelaHome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Ionicons name={name} color={color} size={35} />;
        },
        tabBarActiveTintColor: "#6C62FF",
        tabBarInactiveTintColor: "#000",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tabs.Screen
        name="TelaHome"
        component={TelaHome}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="TelaPerfil"
        component={TelaPerfil}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
}
