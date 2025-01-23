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
