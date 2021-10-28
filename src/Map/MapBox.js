import * as React from 'react';
import ReactMapGL ,{Marker} from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';

export default function MapBox() {
  const [viewport, setViewport] = React.useState({
    latitude: 13.801519,
    longitude: 100.615442,
    zoom: 5
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={"pk.eyJ1IjoicHBvbmQ0NTQiLCJhIjoiY2t1MnZidGF4MW53czJ2b3FjcGx2bmQ0YyJ9.2fkFjp41FwfnwW_1K-5AoQ"}
      style={"mapbox://styles/mapbox/streets-v11"}
    >
        <Marker >

        </Marker>
    </ReactMapGL>
  );
}