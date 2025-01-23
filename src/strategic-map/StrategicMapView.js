export default class StrategicMapView extends GameViews.BaseView {
  onMapChunkLoad() {
    this.$el
      .find(".m_town")
      .filter(function () {
        return this.style.color == "rgb(102, 102, 102)";
      })
      .addClass("ghost-town");
  }
}
