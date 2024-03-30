import PokeServices from "./PokeServices.mjs";
import PokemonList from "./PokemonList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


// call the method to get the header and the footer for the app
loadHeaderFooter();

//create an array with six different ids to find pokemons
let pokeArray = [];
for (let i=0; i < 7; i++){
    // Get a random number between 0 to 600;
    let rndInt = Math.floor(Math.random() * 700) + 1;
    // add the number to the data source
    pokeArray.push(rndInt);
}
console.log(pokeArray);

// get the random six pokemon every time it loads
const dataSource = new PokeServices();
const element = document.querySelector(".card-container");
const pokemonList = new PokemonList(null, pokeArray, dataSource, element);

pokemonList.init();