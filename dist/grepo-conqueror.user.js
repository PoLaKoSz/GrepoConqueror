// ==UserScript==
// @name         GrepoConqueror
// @author       Tom PoLáKoSz
// @copyright    2025 Tom PoLáKoSz
// @description  Become Grepolis most feared conqueror with features provided by this mighty script.
// @downloadURL  https://raw.githubusercontent.com/PoLaKoSz/GrepoConqueror/refs/heads/main/dist/grepo-conqueror.user.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @icon         https://gphu.innogamescdn.com/images/game/start/favicon.ico
// @match        https://*.grepolis.com/game/*
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/PoLaKoSz/GrepoConqueror/refs/heads/main/dist/grepo-conqueror.css
// @supportURL   https://github.com/PoLaKoSz/GrepoConqueror/issues
// @updateURL    https://raw.githubusercontent.com/PoLaKoSz/GrepoConqueror/refs/heads/main/dist/grepo-conqueror.meta.js
// @version      0.2.0
// ==/UserScript==

(() => {
  // src/strategic-map/StrategicMapView.js
  var StrategicMapView = class extends GameViews.BaseView {
    onMapChunkLoad() {
      this.$el.find(".m_town").filter(function() {
        return this.style.color == "rgb(102, 102, 102)";
      }).addClass("ghost-town");
    }
  };

  // src/strategic-map/StrategicMapController.js
  var StrategicMapController = class extends GameControllers.BaseController {
    render() {
      this.view = new StrategicMapView({
        controller: this,
        el: $("#minimap_islands_layer")
      });
      this.registerEventListeners();
      this.view.onMapChunkLoad();
      return this;
    }
    registerEventListeners() {
      this.observeEvent(
        GameEvents.minimap.load_chunks,
        this.view.onMapChunkLoad.bind(this.view)
      );
    }
  };

  // src/index.js
  var GrepoConqueror = class {
    constructor() {
      this.strategicMapController = new StrategicMapController({});
    }
    run() {
      this.strategicMapController.render();
    }
  };
  var css = GM_getResourceText("IMPORTED_CSS");
  GM_addStyle(css);
  $.Observer(GameEvents.game.load).subscribe(() => {
    const grepoConqueror = new GrepoConqueror();
    grepoConqueror.run();
  });
})();
