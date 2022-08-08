import React from "react";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const AuthStack = createNativeStackNavigator();

import TelaHome from "../views/Home/TelaHome";

export default function AppRoutes(){
    return(
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="TelaHome" 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: "#f0f0f5",
                    },
            }}>
                <AuthStack.Screen name="TelaHome" component={TelaHome}
                options={{
                    headerShown:false
                  }}/>
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}
