import axios from "axios";

export default getRandomCocktail = () => {
    return axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(({data:{drinks:[{strDrink,strInstructions}]}}) => {
        return [strDrink,strInstructions]
    })
}