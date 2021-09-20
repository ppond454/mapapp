
 const getLocation =()=>{

    if ("geolocation" in navigator) {
        console.log("Available");
        navigator.geolocation.getCurrentPosition((position)=> {
          let lat = position.coords.latitude
          let long = position.coords.longitude
          console.log("Latitude is :",lat);
          console.log("Longitude is :",long);

          return {lat , long}
        });
      } else {
        console.log("Not Available");
      }
}

export {getLocation}