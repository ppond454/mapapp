import { signInWithGoogle } from "../config/firebase"
import { useState , useContext } from "react"
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,  
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from "@material-ui/core/Checkbox"
import {GoogleButton} from "react-google-button"
import { contextSession } from "../App"


const Login = () => {

  const {setSession} = useContext(contextSession)


  const paperStyle = {
    padding: 30,
    height: "50vh",
    width: 300,
    margin: "20px auto",
  }

  // const [isLoading, setLoad] = useState(false)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };


  
  const avatarStyle = { backgroundColor: "#1bbd7e" }
  const btnstyle = { margin: "12px 0" }

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
     // setLoad(true)
      handleClickOpen()
      await signInWithGoogle().then(()=>{
        sessionStorage.setItem("session",1)
        
      })
    } catch {
      handleClose()
      setSession({
        isLoggedIn : false,
      })
      window.location.reload()
    }
  }

  return (
    <div>
      <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
             
                <GoogleButton onClick={handleSignin} style ={{margin:"2rem auto"}} />

                
           
            </Paper>
        </Grid>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Login
