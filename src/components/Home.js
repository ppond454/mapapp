import MapView from "../Map/MapView"
import { createContext, useState } from "react"
import useSWR from 'swr'
import axios from "axios"
import Navbar from "./Navbar"

export const  coordsContext  = createContext()

const Home = () => {
  const [coords, setCoords] = useState({
    lat: 13.801519,
    lng: 100.615442,
  })
  const [select, setSelect] = useState({
    coords: {
      lat: 13.801519,
      lng: 100.615442,
    },
    info: null  ,
    state: false,
  })

  const {data} = useSWR("data", ()=> axios.get("https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces") )
  
  let _data
  
  if (data){
    _data = data.data.sort((a,b)=> b.total_case_excludeabroad -a.total_case_excludeabroad )
  }

console.log("home rerender");
  return (
    <coordsContext.Provider value={{ coords, setCoords , _data ,select, setSelect}}>
      <div>
      <Navbar />
        <MapView />
      </div>
    </coordsContext.Provider>
  )
}

export default Home
