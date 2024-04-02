import PokeServices from "./PokeServices.mjs";
import PokemonDetails from "./PokemonDetails.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// load the dynamic header and footer
loadHeaderFooter();

const dataSource = new PokeServices();
const parameter = getParam("pokemon");
const pokemonId = parseInt(parameter);
const cardContainer = document.querySelector("main");
const pokemonDetails = new PokemonDetails(pokemonId, dataSource, cardContainer);

pokemonDetails.init();
