import React, {createContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const LocalContext = createContext({})

function LocalProvider({children}){

    const [ userLogin, setUserLogin ] = useState(null)
    const [ loadingUser, setLoadingUser ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    useEffect(() =>{
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@rateit:userApp');

            if(storageUser){
                console.log(storageUser);
                setUserLogin(JSON.parse(storageUser));
                setLoading(false);
            }
           //    console.log(storageUser);
            setLoading(false);
        }loadStorage();
    }, [])

    async function signIn(email, senha){
        setLoadingUser(true)
        try {
            if(userLogin){
                if(email == userLogin.email && senha == userLogin.senha){
                    Alert.alert("Sucesso no login!", setTimeout(1000))
                }
                setLoadingUser(false);
                console.log(data);
            }
        } catch (err) {
            setLoadingUser(false);
            console.log(err);
        }
    }

    async function signUp(nome, email, senha){
        setLoadingUser(true)
        try {
            let data = {
                nome: nome,
                email: email,
                senha: senha
            }

            setUserLogin(data);
            await AsyncStorage.setItem('@rateit:userApp', JSON.stringify(data));
            setLoadingUser(false);
            console.log(data);
        } catch (err) {
            setLoadingUser(false);
            console.log(err);
        }
    }



    async function logOut(){
        await AsyncStorage.clear()
        setUserLogin(null)
    }

    return(
        <LocalContext.Provider value={{signIn, signed: !!userLogin, userLogin, loadingUser, loading, logOut, signUp}}>
            {children}
        </LocalContext.Provider>
    );

}

export default LocalProvider;