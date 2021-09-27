import { memo, useContext} from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"

import CircularProgress from "@mui/material/CircularProgress"
import { dataProvince } from "../data/dataProvince"

import { coordsContext } from "../components/Home"
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from "@mui/material/Divider"

const containerStyle = {
  width: "100vw",
  height: "100vh",
}

const MapView = () => {
  const { coords ,setSelect ,select ,_data } = useContext(coordsContext)

  const handleClick =(province , dataProvince)=>{

    let result =dataProvince.find(item=>{
      return item.province === province.province
    })
    setSelect({
      coords: {
        lat: province.lat ,
        lng:  province.lng,
      },
      info: result,
      state: true,
    })

  }
  


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDOKoPOVH659fLqlsF7kU3sCQhkSgkB5FM",
  })

  console.log(select);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={6}>
      {/* <Marks coords={coords}/> */}
      {dataProvince.map((data, key) => {
        return (
          <Marker
            key={key}
            position={{ lat: data.lat, lng: data.lng }}
            onClick={()=>{
              handleClick(data , _data)}}
          ></Marker>
        )
      })}

     {select.state && <InfoWindow 
            position={{
              lat: select.coords.lat,
              lng: select.coords.lng
           }}
      onCloseClick={() => {
         setSelect({ 
           coords:{
          lat: null,
          lng: null
        },
        state: false
         });
      }}><div align="center">
         <h3>จังหวัด{select.info.province}</h3>
        <TableContainer component={Paper} >
        <Table size="small" aria-label="a dense table"  >
          <TableRow>
          <TableCell align="center" ><strong>ผู้ป่วยวันนี้</strong></TableCell>
          <TableCell align="center">{`${select.info.new_case.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} คน`}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell align="center" style={{backgroundColor:"#fce4ec"}} ><strong>เสียชีวิตวันนี้</strong></TableCell>
          <TableCell align="center" style={{backgroundColor:"#fce4ec"}}>{`${select.info.new_death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} คน`}</TableCell>
          </TableRow>
        </Table>
        <Divider/>
        <Table size="small" aria-label="a dense table"  >
          <TableRow>
          <TableCell align="center" ><strong>ผู้ป่วยรวม</strong></TableCell>
          <TableCell align="center">{`${select.info.total_case.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} คน`}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell align="center" style={{backgroundColor:"pink"}} ><strong>เสียชีวิตรวม</strong></TableCell>
          <TableCell align="center" style={{backgroundColor:"pink"}}>{`${select.info.total_death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} คน`}</TableCell>
          </TableRow>
        </Table>
        
        </TableContainer>
        </div>
      </InfoWindow> }
    </GoogleMap>
  ) : (
    <CircularProgress />
  )
}

export default memo(MapView)
