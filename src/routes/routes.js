import React, {useContext} from 'react';
import {View, ActivityIndicator, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

import TelaLogin from "../views/Login/TelaLogin";
import TelaCadastro from "../views/Cadastro/TelaCadastro";
import TelaHome from "../views/Home/TelaHome";

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'

export default function Routes(){

    const AuthStack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="TelaLogin" 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: "#f0f0f5",
                    },
            }}>
                <AuthStack.Screen name="TelaLogin" component={TelaLogin}
                options={{
                    headerShown:false
                  }}/>
                <AuthStack.Screen name="TelaCadastro" component={TelaCadastro}
                options={{
                    headerShown:false
                    }}/>
            <AuthStack.Screen name="TelaHome" component={TelaHome}
                options={{
                    headerShown:false
            }}/>
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}