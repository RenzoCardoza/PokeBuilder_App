import PokeServices from "./PokeServices.mjs";
import PokemonList from "./PokemonList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// call the method to get the header and the footer for the app
loadHeaderFooter();

//get element for the container
const element = document.querySelector("#pokemon-show");
const dataSource = new PokeServices();
const pokeListing = new PokemonList(null, null, dataSource, element, true);

pokeListing.init();