import PokeBuilder from "./PokeTeamBuilder.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const teamContainer = document.querySelector(".team-container");
const builder = new PokeBuilder("team", teamContainer);

builder.init();