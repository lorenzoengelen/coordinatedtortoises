class WorldMap extends React.Component {

  //Upon mount it draws the world map
  componentDidMount() {
    window.worldMap.draw();
  }

  //A very simple panel which hosts the world map
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Locations</div>
        <div className="panel-body main-map">
          <svg width="820" height="620"></svg>
        </div>
      </div>
    );
  }

}

window.WorldMap = WorldMap;
