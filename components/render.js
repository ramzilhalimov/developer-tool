import { initRenderLightGame } from "./light.js";
import { initRenderAverageGame } from "./average.js";
import { initRenderHeavyGame } from "./heavy.js";

export function renderRadioComponents () {
  const appHtml = `
<header class="header center">
<form class="header__form ">
    <h1 class="nav__name">
        Выбери сложность
    </h1>
        <div class="radio-toolbar"> 
            <input type="radio" id="radio1" name="radios" value="1">
            <label for="radio1">1</label>
            
            <input type="radio" id="radio2" name="radios" value="2">
            <label for="radio2">2</label>
            
            <input type="radio" id="radio3" name="radios" value="3">
            <label for="radio3">3</label>
        </div> 
    <button type="submit"   class="nav__button">Старт</button>
</form>
</header>
`;

app.innerHTML = appHtml;

const header = document.querySelector("header");

const lightGame = document.getElementById("radio1");
const averageGame = document.getElementById("radio2");
const heavyGame = document.getElementById("radio3");

header.addEventListener("submit", function(event) {
  event.preventDefault();

  if(lightGame.checked) {
    initRenderLightGame();
  } else if(averageGame.checked) {
    initRenderAverageGame();
  } else if(heavyGame.checked) {
    initRenderHeavyGame();
  }
});
}

