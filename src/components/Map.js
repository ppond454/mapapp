import React from "react"
import { longdo, map, LongdoMap } from "../config/Longdo"

export default function Map() {
  const mapKey = "d3050eef1ba6493b50409ad6572aae88"

  const initMap = () => {
    map.Layers.setBase(longdo.Layers.GRAY)
  }

  return (
    <div style={{ height: "100vh", width: "100%"  }}>
      <LongdoMap
        id="longdo-map"
        mapKey={mapKey}
        callblack={initMap}
      ></LongdoMap>
    </div>
  )
}
