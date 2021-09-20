import {useContext}from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Box from '@mui/material/Box';
import { auth } from "../config/firebase"
import { contextSession } from "../App"
import {useHistory} from "react-router-dom"
import { CircularProgress } from "@mui/material"


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

export default function Navbar() {
  const classes = useStyles()
  let history = useHistory()

  const {session,setSession } = useContext(contextSession)


  const handleLogout= ()=>{
    auth.signOut().then(res=>{
      setSession({
        isLoggedIn : false,
        currentUser: null,
      })
    })
    sessionStorage.removeItem("session")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {session.isLoggedIn ? <Avatar alt="picture" src={session.currentUser.photoURL} /> : <Box sx={{ width: '100%' }}>
              {sessionStorage.getItem("session") &&<CircularProgress style ={{color:"inherit"}} /> }
    </Box>}
          </IconButton>
          <Typography  className={classes.title}>
            {session.currentUser ? session.currentUser.displayName :null}
          </Typography>

          {session.isLoggedIn ? <Button color="inherit" onClick={() => handleLogout()}>
            <ExitToAppIcon /> Logout
          </Button>  : <Button color="inherit" onClick={() => {history.push("./signup")}}>
             {sessionStorage.getItem("session") ? null: "Signup" }
          </Button>}
        </Toolbar>
        
      </AppBar>
    </div>
  )
}
