import { signInWithGoogle } from "../config/firebase"
import { useState , useContext} from "react"
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Dialog,   
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import GoogleButton from "react-google-button"
import { contextSession } from "../App"



const Login = () => {

  const {setSession} = useContext(contextSession)


  const paperStyle = {
    padding: 30,
    height: "50vh",
    width: 300,
    margin: "20px auto",
  }
  const googleBt= {
    margin: "auto",
    padding: 30 ,
    
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

  const handleSignin = async () => {
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
                <Typography style ={googleBt}>
                <GoogleButton onClick={()=>{handleSignin()}} />
                
                </Typography>
            </Paper>
        </Grid>
        <Dialog open={open} onClose={handleClose} style={{backgroundColor: "transparent"}}>
  
        </Dialog>
    </div>
  )
}

export default Login
