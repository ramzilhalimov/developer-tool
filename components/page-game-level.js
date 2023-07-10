export function initRenderLevelGame (difficulty) {
  const appHtml = 
  `<header class="header center">
  <form class="header__form ">
      <h1 class="nav__name">
      Уровень сложности: ${difficulty}
      </h1>
          <div class="radio-toolbar"> 
             
          </div> 
      <button id="start-button" class="nav__button">Начать заново</button>
  </form>
  </header>`
  ;
  app.innerHTML = appHtml;
}