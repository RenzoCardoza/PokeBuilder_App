import PokeServices from "./PokeServices.mjs";
import SearchBar from "./SearchEngine.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const param = getParam("pkmnName");
const pokemonName = param.toLowerCase();
// get the element where the result would be displayed
const resultElem = document.querySelector(".result");
const pokeServices = new PokeServices();
const searchEngine = new SearchBar(pokemonName, resultElem);

searchEngine.searchPokemon();