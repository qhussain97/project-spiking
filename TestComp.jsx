import { useState,useEffect } from "react";
import getRandomCocktail from './api.js'
import { View,Text } from "react-native";

function TestComp() {
    let [cocktail, setCocktail]=useState([])

    useEffect(() => {
        getRandomCocktail().then((data) => {
            // console.log(data)
            setCocktail(data)
        })
    },[])
    return (
        <View>
            <Text>
                {cocktail}
            </Text>
        </View>
    )

}


export default TestComp;