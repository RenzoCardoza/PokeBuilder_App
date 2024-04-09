import PokeBuilder from "./PokeTeamBuilder.mjs";
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const teamContainer = document.querySelector(".team-container");
const builder = new PokeBuilder("team", teamContainer);

builder.init();
