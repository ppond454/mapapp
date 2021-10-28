import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import { CircularProgress } from "@mui/material"
import { memo, useContext } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import MenuItem from "@mui/material/MenuItem"

import { dataProvince } from "../data/dataProvince"
import { coordsContext } from "../components/Home"

function Ranking({ sideBar, setSideBar, _data }) {
  const { setSelect } = useContext(coordsContext)

  const toggleDrawer = (e) => {
    e.preventDefault()
    setSideBar(!sideBar)
  }

  const handleClick = (province, dataProvince) => {
    let result = dataProvince.find((item) => {
      return item.province === province.province
    })
    setSelect({
      coords: {
        lat: result.lat,
        lng: result.lng,
      },
      info: province,
      state: true,
    })
  }

  // console.log(_data);
  // console.log("rerenderRanking");

  const list = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      // onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div align="center">
        <h4>
          จัดลำดับจังหวัดที่มีผู้ติดโควิด-19 🔥
          <IconButton style={{ width: "5px" }} onClick={toggleDrawer}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </h4>
      </div>

      <Divider />
      {/* <List>
 
              {_data ? _data.map((data,key)=> {
                return(
                  <IconButton key={key} style={{fontSize:"15px"}}>
                    <p>{key+1}. {data.province} : {data.total_case_excludeabroad.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} คน</p>
                    </IconButton>
                )
              }) : <CircularProgress/> }
      </List> */}
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ maxWidth: "1rem" }}>
                ลำดับ
              </TableCell>
              <TableCell align="center">
                <strong>จังหวัด</strong>
              </TableCell>
              <TableCell align="center">จำนวนผู้ป่วย(คน)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_data ? (
              _data.map((data, key) => {
                return (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={
                      data.total_case_excludeabroad > 30000
                        ? { backgroundColor: "pink" }
                        : data.total_case_excludeabroad > 10000
                        ? { backgroundColor: "#fff391" }
                        : { backgroundColor: "#bedd9a" }
                    }
                  >
                    <TableCell align="center">{key + 1}</TableCell>
                    <TableCell align="center">
                      <MenuItem
                        style={{ fontSize: "15px" }}
                        value={data.province}
                        onClick={(e) => {
                          e.preventDefault()
                          handleClick(data, dataProvince)
                        }}
                      >
                        {data.province}
                      </MenuItem>
                    </TableCell>
                    <TableCell align="center">
                      {data.total_case_excludeabroad
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )

  return (
    <div>
      <Drawer
        anchor="left"
        open={sideBar}
        onClose={toggleDrawer}
        variant="persistent"
      >
        {list()}
      </Drawer>
    </div>
  )
}
export default memo(Ranking)
