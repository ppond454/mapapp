import { memo, useContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Box from "@mui/material/Box"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import { auth } from "../config/firebase"
import { contextSession } from "../App"
// import { useHistory } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import Ranking from "../components/Ranking"
import { coordsContext } from "./Home"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily:  '"Montserrat", Open Sans'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

function Navbar() {
  const classes = useStyles()
  // let history = useHistory()
  const [sideBar, setSideBar] = useState(false)

  const { session, setSession } = useContext(contextSession)
  const { _data } = useContext(coordsContext)

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

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.root}>
          {session.isLoggedIn ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
          ) : (
            <Box sx={{ width: "100%" }}>
              {sessionStorage.getItem("session") && (
                <CircularProgress style={{ color: "inherit" }} />
              )}
            </Box>
          )}
          </Box>
          <Typography className={classes.root} style={{ fontSize: "22px" }} >
            ThaiTracking-19
          </Typography >
          <Typography style={{ fontFamily:  'Chilanka' }} >
            {session.currentUser ? session.currentUser.displayName : null}
          </Typography>
          

          {
            session.isLoggedIn ? (
              // <IconButton color='inherit' onClick={toggleDrawer} > <MenuIcon/> </IconButton>
              <IconButton onClick={handleClick} >
                <Avatar alt="picture" src={session.currentUser.photoURL} />
              </IconButton>
            ) : null
            // <Button
            //   color="inherit"
            //   onClick={() => {
            //     history.push("./signup")
            //   }}
            // >
            //   {/* {sessionStorage.getItem("session") ? null : "Signup"} */}
            // </Button>
          }
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem style={{ padding: "5px" }} onClick={() => handleLogout()}>
              <ExitToAppIcon /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Ranking
        sideBar={sideBar}
        setSideBar={setSideBar}
        session={session}
        _data={_data}
      />
    </div>
  )
}
export default memo(Navbar)
