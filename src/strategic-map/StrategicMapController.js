import StrategicMapView from "./StrategicMapView";

export default class StrategicMapController extends GameControllers.BaseController {
  render() {
    this.view = new StrategicMapView({
      controller: this,
      el: $("#minimap_islands_layer"),
    });

    this.registerEventListeners();

    this.view.onMapChunkLoad();

    return this;
  }

  registerEventListeners() {
    this.observeEvent(
      GameEvents.minimap.load_chunks,
      this.view.onMapChunkLoad.bind(this.view),
    );
  }
}
