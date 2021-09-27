import { memo, useContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Box from "@mui/material/Box"
import { auth } from "../config/firebase"
import { contextSession } from "../App"
// import { useHistory } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import Ranking from "../components/Ranking"
import {coordsContext} from "./Home"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Navbar() {
  const classes = useStyles()
  // let history = useHistory()
  const [sideBar, setSideBar] = useState(false)

  const { session, setSession } = useContext(contextSession)
  const  {_data}  = useContext(coordsContext)

  const toggleDrawer = (e) => {
    e.preventDefault()
    setSideBar(!sideBar)
  }

  const handleLogout = () => {
    auth.signOut().then((res) => {
      setSession({
        isLoggedIn: false,
        currentUser: null,
      })
    })
    sessionStorage.removeItem("session")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {session.isLoggedIn ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <Avatar alt="picture" src={session.currentUser.photoURL} />
            </IconButton>

          ) : (
            <Box sx={{ width: "100%" }}>
              {sessionStorage.getItem("session") && (
                <CircularProgress style={{ color: "inherit" }} />
              )}
            </Box>
          )}
          <Typography className={classes.title}>
            {session.currentUser ? session.currentUser.displayName : null}
          </Typography>

          {session.isLoggedIn ? (
           
              // <IconButton color='inherit' onClick={toggleDrawer} > <MenuIcon/> </IconButton>
       
            <Button color="inherit" onClick={() => handleLogout()}>
              <ExitToAppIcon /> Logout
            </Button>
          ) : 
          ( null
            // <Button
            //   color="inherit"
            //   onClick={() => {
            //     history.push("./signup")
            //   }}
            // >
            //   {/* {sessionStorage.getItem("session") ? null : "Signup"} */}
            // </Button>
          )}
        </Toolbar>
      </AppBar>
      <Ranking sideBar={sideBar} setSideBar={setSideBar} session={session}  _data={_data} />
    </div>
  )
}
export default memo(Navbar)
