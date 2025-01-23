import StrategicMapController from "./strategic-map/StrategicMapController";

class GrepoConqueror {
  constructor() {
    this.strategicMapController = new StrategicMapController({});
  }

  run() {
    this.strategicMapController.render();
  }
}

const css = GM_getResourceText("IMPORTED_CSS");
GM_addStyle(css);

$.Observer(GameEvents.game.load).subscribe(() => {
  const grepoConqueror = new GrepoConqueror();
  grepoConqueror.run();
});
