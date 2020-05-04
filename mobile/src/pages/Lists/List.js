import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage } from 'react-native';
// SafeAreaView: Serve para não deixar o conteúdo da minha View sobrescrito ou por cima de nenhum dado da tela do smarthphone.

import SpotList from '../../components/SpotList';

import logo from '../../assets/logo.png';

import style from './style.js';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => { // Executa a função apenas uma vez.
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());    // Separa todas as tecnologias por virgula

            setTechs(techsArray);
        })
    }, []); 

    return( 
        <SafeAreaView style={style.container}>
            <Image style={style.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}