import { memo, useEffect, useState } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100vw",
  height: "100vh",
}

const MapView = () => {
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  })

  

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available")
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    } else {
      console.log("Not Available")
    }
  }, [])

  return (
    <LoadScript googleMapsApiKey="YOUR API KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={13}>
        {/* Child components, such as markers, info windows, etc. */}
        {coords && <Marker position={coords}></Marker>}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default memo(MapView)
