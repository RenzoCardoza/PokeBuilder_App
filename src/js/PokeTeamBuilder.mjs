import { getLocalStorage, setLocalStorage } from "./utils.mjs";

//// function template here



// class to create the object of the pokebuilder
export default class PokeBuilder{
    constructor(key, parentElement){
        this.key = key;
        this.parentElement = parentElement;
    }
    async init(){
        const pokemonTeam = getLocalStorage(this.key);
    }
    renderPokemonTeam(team){
        
    }
}