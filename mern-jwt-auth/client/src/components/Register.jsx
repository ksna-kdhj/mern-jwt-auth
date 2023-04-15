import {useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRegisterMutation } from '../features/auth/authApiSlice'
import '../index.css'
import { useSelector } from 'react-redux';
import BaseTheme from './themes/BaseTheme';
import { selectColorMode } from '../features/ToggleColorModeSlice';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';

const USER_REGEX = /.*@[a-z0-9.-]*/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const register_url = '/register' 
 const Register = () => {
    const [register,{isLoading}] = useRegisterMutation()
    const colorMode = useSelector(selectColorMode)
    const theme = createTheme({...BaseTheme(colorMode)})
    const [refresh] = useRegisterMutation()
    const errRef = useRef();
    const navigate = useNavigate();
    const[user,setUser]=useState('')
    const[firstname,setFirstName]=useState('')
    const[lastname,setLastName]=useState('')
    const[validName,setValidName]=useState(false)
    const[userFocus,setUserFocus]=useState(false)

    const[pwd,setPwd]=useState('')
    const[validPwd,setValidPwd]=useState(false)
    const[pwdFocus,setPwdFocus]=useState(false)

    const[matchPwd,setMatchPwd]=useState('')
    const[validMatch,setValidMatch]=useState(false)
    const[matchFocus,setMatchFocus]=useState(false)

    const[errMsg, setErrMsg]=useState('')
    const[success,setSuccess]=useState(false)

    // useEffect(()=>{
    //     userRef.current.focus()
    // },[])

    useEffect(()=>{
        const result = USER_REGEX.test(user)
        setValidName(result)
    },[user])
    useEffect(()=>{
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd===matchPwd
        setValidMatch(match)
    },[pwd,matchPwd])

    useEffect(()=>{
        setErrMsg('')
    },[user,pwd,matchPwd])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //the following 5 lines are for extra security for validation check
        const v1= USER_REGEX.test(user)
        const v2= PWD_REGEX.test(pwd)
        if(!v1||!v2){
            setErrMsg('invalid Entry')
            return
        }
        
        try{
            console.log(user,pwd)
                const response = await register({user,pwd}).unwrap() 
                console.log(response.data)
                setSuccess(true)
                navigate('/login')

        }catch(err){
            console.log(err?.originalStatus)
            if(!err?.originalStatus){
                setErrMsg('No server response');
            }else if (err.originalStatus === 409){
                setErrMsg('Username taken')
            }else if (err.originalStatus === 400){
                setErrMsg('Username and password required')
            }
            else if (err.originalStatus === 403){
                setErrMsg('invalid roles sepcified')
            }
            else{
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
        
    }
   return (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="firstname"
                        name="firstname"
                        required
                        fullWidth
                        id="firstname"
                        autoFocus
                        placeholder='firstname...'
                        onChange={(e)=>{setFirstName(e.target.value)}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="lastname"
                        name="lastname"
                        required
                        fullWidth
                        id="lastname"
                        placeholder='lastname...'
                        onChange={(e)=>{setLastName(e.target.value)}}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <span className={validName?'valid':'hide'}>
                    <FontAwesomeIcon icon={faCheck}/>          
                    </span>
                    <span className={validName||!user?'hide':'invalid'}>
                    <FontAwesomeIcon icon={faTimes}/>
                        </span>
                      <TextField
                        required
                        fullWidth
                        placeholder='email...'
                        id="username"
                        name="username"
                        autoComplete="off"
                        onChange={(e)=>{setUser(e.target.value)}}
                        onFocus = {()=>setUserFocus(true)}
                        onBlur = {()=>setUserFocus(false)}
                      />
                      <p id='uidnote' className={userFocus&& user&&
                !validName?'instructions':'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    please enter valid email<br/>
                </p>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                    <span className={validPwd?'valid':'hide'}>
                     <FontAwesomeIcon icon={faCheck}/>
                 </span>
                 <span className={validPwd||!pwd?'hide':'invalid'}>
                     <FontAwesomeIcon icon={faTimes}/>  
                     </span>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        type="password"
                        onChange = {(e)=>{setPwd(e.target.value)}}
                        id="password"
                        autoComplete="off"
                        placeholder='password...'
                        onFocus = {()=>setPwdFocus(true)}
                        onBlur = {()=>setPwdFocus(false)}
                      />
                      <p id='pwdnote' className={pwdFocus&& !validPwd&&
                !validPwd?'instructions':'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters,
                    a number and a special character<br/>
                    Allowed special characters:
                     <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>
                       <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                         <span aria-label="percent">%</span>
                    </p>
                    </Grid>
                    <Grid item xs={12}>
                    <span className={validMatch&&matchPwd?'valid':'hide'}>
                     <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validMatch||!matchPwd?'hide':'invalid'}>
                     <FontAwesomeIcon icon={faTimes}/>
                    </span>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        type="password"
                        onChange = {(e)=>{setMatchPwd(e.target.value)}}
                        id="confirm_pwd"
                        autoComplete="off"
                        placeholder='confirm password...'
                        onFocus = {()=>setMatchFocus(true)}
                        onBlur = {()=>setMatchFocus(false)}
                      />
                    <p id='confirmnote' className={matchFocus&&!validMatch?'instructions':'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                   passwords do not match
                    </p>
                      </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" sx={{color:'primary','&.Mui-checked': {
                            color: 'primary.dark',
                            ":hover":{
                                color:'primary.light'
                            }
                          },}} />}
                        label="receive promotional emails"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , color:"primary", backgroundColor:'primary.dark',":hover":{backgroundColor:'primary.light'}}}
                    disabled={!validName||!validPwd||!validMatch?true:false}
                  >
                    Sign Up
                  </Button>
                  {errMsg&&
              <Box ref={errRef} sx={{display:'flex',backgroundColor:'black',justifyContent:'center'}} aria-live="assertive"><Typography 
              color='error.dark' variant='body2'>{errMsg}</Typography></Box>
              }
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                        Already have an account? 
                        <Link href="login" display='inline-block' color='primary.dark'>
                        <Typography variant='body2' color="primary.dark">
                        Sign In
                        </Typography>
                  </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
          </ThemeProvider>
        );
 }
 
 export default Register