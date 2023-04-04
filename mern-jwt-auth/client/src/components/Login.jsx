import {useRef,useState,useEffect} from 
'react'
import {  useNavigate , useLocation} from 'react-router-dom'
import useInput from '../hooks/useInput'
import useToggle from '../hooks/useToggle'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { useDispatch,useSelector } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { selectColorMode } from '../features/ToggleColorModeSlice'
import BaseTheme from './themes/BaseTheme'

const login_url = '/auth'

const Login = () => {
    const colorMode = useSelector(selectColorMode)
    const theme = createTheme({...BaseTheme(colorMode)})
    // const usetheme = useTheme()
    // console.log('at login')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const userRef = useRef()
    const errRef = useRef()
    const[user,resetUser,userAttribs] = useInput('input','')
    const [pwd,setPwd] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [check,toggleCheck] = useToggle('persist',false)
    const [login,{isLoading,isError}] = useLoginMutation()
    const dispatch = useDispatch()
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const userData = await login({user,pwd}).unwrap()
            dispatch(setCredentials({user:user,accessToken:userData.accessToken}))
            resetUser()
            setPwd('')
            // console.log('here')
            navigate(from, {replace:true})
            // console.log('there')
        } 
        catch(error){
          // console.log(error?.originalStatus)
            if(!error?.originalStatus){
                setErrMsg('No server response')
            }
            else if(error.originalStatus === 400){
                setErrMsg('Missing Username or Password')
            }
            else if(error.originalStatus === 401){
                setErrMsg('Invalid Password or Username')
            }
            else{
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }
    return ( isLoading ? <CircularProgress color="secondary"/>:(
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                // label="username"
                name="username"
                autoComplete="off"
                {...userAttribs}
                autoFocus
                placeholder='email...'
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setPwd(e.target.value)}
                name="password"
                // label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={pwd}
                placeholder='password...'
              />
              <FormControlLabel
                control={<Checkbox value="remember"  sx={{color:'primary','&.Mui-checked': {
                    color: 'primary.dark',
                    ":hover":{
                        color:'primary.light'
                    }
                  },}}/>}
                label="Remember me"
                id='persist'
                onChange={toggleCheck}
                checked = {check}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , color:"primary", backgroundColor:'primary.dark',":hover":{backgroundColor:'primary.light'}}}
              >
                Sign In
              </Button>
              {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
              {errMsg&&
              <Box ref={errRef} sx={{display:'flex',backgroundColor:'black',justifyContent:'center'}} aria-live="assertive"><Typography 
              color='error.dark' variant='body2'>{errMsg}</Typography></Box>
              }
              <Grid container spacing={12}>
                <Grid item xs>
                  <Link href="#" variant="body" color='primary.dark'>
                  <Typography variant='body2' color="primary.dark">
                  Forgot password?
                  </Typography>  
                  </Link>
                </Grid>
                <Grid item xs sx={{fontSize:'body2'}}>
                {/* <Typography variant='body2'> */}
                Don't have an account? 
                    <Link href="register" display='inline-block' color='primary.dark'>
                        <Typography variant='body2' color="primary.dark">
                        Sign Up
                        </Typography>
                  </Link>
                  {/* </Typography> */}
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
            // <section>
            //     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            //     <h1>Sign In</h1>
            //     <form onSubmit={handleSubmit}>
            //         <label htmlFor="username">Username:</label>
            //         <input
            //             type="text"
            //             id="username"
            //             ref={userRef}
            //             autoComplete="off"
            //             {...userAttribs}
            //             required
            //         />

            //         <label htmlFor="password">Password:</label>
            //         <input
            //             type="password"
            //             id="password"
            //             onChange={(e) => setPwd(e.target.value)}
            //             value={pwd}
            //             required
            //         />
            //         <button>Sign In</button>
            //         <div className='persistCheck'>
            //             <input
            //             type="checkbox"
            //             id='persist'
            //             onChange={toggleCheck}
            //             checked = {check}
            //             />
            //             <label htmlFor='persist'>Trust This Device</label>
            //         </div>
            //     </form>
            //     <p>
            //         Need an Account?<br />
            //         <span className="line">
            //             {/*put router link here*/}
            //             <a href="register">Sign Up</a>
            //         </span>
            //     </p>
            // </section>
    )
  )
}

export default Login

