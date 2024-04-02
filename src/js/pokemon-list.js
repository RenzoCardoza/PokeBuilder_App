import PokeServices from "./PokeServices.mjs";
import PokemonList from "./PokemonList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// call the method to get the header and the footer for the app
loadHeaderFooter();

//get element for the container
const element = document.querySelector("#pokemon-show");
const dataSource = new PokeServices();
const pokeListing = new PokemonList(null, null, dataSource, element, true);

//elements for the next and previous page
const pageNum = document.querySelector("#pageNum");
const backArrow = document.querySelector("#backBtn");
const frontArrow = document.querySelector("#frontBtn");

// init the object that draws the cards to the page.
pokeListing.init();

// add the page number to the landing page
let indexNumber = 1;
pageNum.innerHTML = indexNumber;

// add event listener that flips pages through the pokemon
frontArrow.addEventListener("click", () => {
    indexNumber++;
    pageNum.innerHTML = indexNumber;

    pokeListing.renderEntireList(indexNumber);
});
backArrow.addEventListener("click", () => {
    if (indexNumber > 1){
        indexNumber--;
        pageNum.innerHTML = indexNumber;

        pokeListing.renderEntireList(indexNumber);
    }
});