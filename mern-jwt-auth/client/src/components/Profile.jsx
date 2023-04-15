import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { CssBaseline, Grid, Hidden, TextField, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@emotion/react';
import BaseTheme from './themes/BaseTheme';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { selectUser } from '../features/auth/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { selectColorMode } from '../features/ToggleColorModeSlice';
import Paper from '@mui/material/Paper';
import { selectBio,selectName, selectPicture, setProfilePicture } from '../features/profile/profileSlice';
import { setProfileData } from '../features/profile/profileSlice';
import { useSetProfileMutation } from '../features/profile/profileApiSlice';
import { useGetProfileMutation,useDeleteDpMutation } from '../features/profile/profileApiSlice';
const Profile = () => {
  const dispatch = useDispatch()
  const [setProfile,{isLoading}] = useSetProfileMutation()
  const [getProfile] = useGetProfileMutation()
  const [deleteDp] = useDeleteDpMutation()
    const colorMode = useSelector(selectColorMode)
    const DP = useSelector(selectPicture)
    const user = useSelector(selectUser)
    const theme = createTheme({...BaseTheme(colorMode)})
    const Bio = useSelector(selectBio)
    const Name = useSelector(selectName)
    const [anchorElDp, setAnchorElDp] = useState(null)
    const [openDpDialog, setOpenDpDialog] = useState(null)
    const [name,setName] = useState('')
    const [bio,setBio] = useState ('')
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const dpOptions = ['Upload profile picture','delete profile picture']
    // useEffect(()=>{
    //   localStorage.setItem('profile',JSON.stringify({bio:Bio,name:Name})) 
    // },[Bio,Name])
    useEffect(()=>{
      const getData = async()=>{
        const profileData = await getProfile({user}).unwrap()
        // console.log(profileData)
        dispatch(setProfileData({bio:profileData.bio,name:profileData.name}))
        dispatch(setProfilePicture({picture:profileData.picture}))
        setBio(profileData.bio)
        setName(profileData.name)
        setImgData(profileData.picture)
        // console.log(imgData)
        // console.log(profileData.name)
      }
      // Bio==null||Name==null&&
      getData()
    },[])
    const handleOpenDpMenu = (e) => {
      setAnchorElDp(e.currentTarget);
      };
      const handleCloseDpMenu = () => {
      setAnchorElDp(null);
      };
    const handleOpenDpDialog = (e) => {
      setOpenDpDialog(e.currentTarget);
      };
      const handleCloseDpDialog= () => {
      // if (action=='Cancel')
      // setImgData(null)
      // console.log(action)
      setOpenDpDialog(null);
      };
      const onCancelUpload =()=>{
        setImgData(null)
        setOpenDpDialog(null)
      }
      const handleDeleteDp = async ()=>{
        dispatch(setProfilePicture({profile:null}))
        try{
          await deleteDp({user:user})
        }catch(err){
          console.error(err)
        }
      }

    const handleSubmit = async (e) =>{
      e.preventDefault()
      try{
        await setProfile({user,bio,name,picture:imgData}).unwrap()
      }catch(err){
        console.error(err)
      }
      try{
        const profileData = await getProfile({user}).unwrap()
        // console.log(profileData)
        dispatch(setProfileData({bio:profileData.bio,name:profileData.name}))
        dispatch(setProfilePicture({picture:profileData.picture}))
        // console.log(profileData.picture)
      }catch(err){
        console.error(err)
      }
    }
    const onChangePicture = e => {
      if (e.target.files[0]) {
        // console.log("picture: ", e.target.files);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
        // dispatch(setPicture(reader.result))
        // console.log(reader.result)
        // console.log(imgData)
      }
    };
    // const convertToBase64 = async(file)=>{
    //   try{
    //   const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //   }catch(error){
    //     console.error(error)
    //   }}
    return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh'}}>
      <CssBaseline />
      <Hidden only='xs'>
      <Grid
        item
        xs={false}
        sm={8}
        md={9}
      >
       <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >My Profile
        </Box> 
        
      </Grid>
      </Hidden>
      <Grid item xs={12} sm={4} md={3} component={Paper} elevation={24} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Badge anchorOrigin={{horizontal: 'right', vertical:'bottom'}} badgeContent={<Tooltip title="change profile picture">
            <IconButton onClick={handleOpenDpMenu}><CameraAltIcon sx={{color:'primary',":hover":{color:'primary.light',cursor:'pointer'}}}/></IconButton>
          </Tooltip>}>
            <Menu id="menu-appbar"
              anchorEl={anchorElDp}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElDp)}
              onClose={handleCloseDpMenu}
              sx={{
                display:'block'
              }}>
                {dpOptions.map(option => 
                  <MenuItem key={option} onClick={handleCloseDpMenu}>
                    <Link sx={{textDecoration:'none', color:'primary.dark'}} onClick={option=='delete profile picture'&&DP?handleDeleteDp:handleOpenDpDialog}>
                    <Typography variant='body2' sx={{":hover":{color:'primary.light'}}}>
                      {option}
                    </Typography>
                    </Link>
                  </MenuItem>)}
              </Menu>
              <Dialog color = 'primary.dark' transformOrigin='fade' open={openDpDialog} onClose={handleCloseDpDialog}><DialogTitle><Typography sx={{color:'primary',
        }}>Upload Picture</Typography></DialogTitle>
        <DialogContent color='primary.dark'>
          {/* <DialogContentText color='primary.dark'>
            
          </DialogContentText> */}
          <Box
        component="img"
        sx={{
          height: 300,
          width: 500,
          maxHeight: 500,
          maxWidth: 500,
        }}
        alt="DP"
        src={imgData?imgData:DP}
      />

        </DialogContent>
        <DialogActions>
        <IconButton
                variant="contained"
                sx={{mx:1, width:32.25,height:32.25,borderRadius:1,
                 color:"primary", backgroundColor:'primary.dark',":hover":{backgroundColor:'primary.light'}}} component="label">
            <FileUploadOutlined />
            <input
              styles={{display:"none"}}
              type="file"
              hidden
              onChange={onChangePicture}
              name="[licenseFile]"
            />
          </IconButton>
          <Button sx={{backgroundColor:'primary.dark',fontSize:12,":hover":{backgroundColor:'primary.light'}}} onClick={onCancelUpload}>Cancel</Button>
          <Button sx={{backgroundColor:'primary.dark',fontSize:12,":hover":{backgroundColor:'primary.light'}}} onClick={handleCloseDpDialog}>Save</Button>
        </DialogActions>
      </Dialog>
      {DP?<Avatar sx={{width:'5rem',height:'5rem'}}src={DP}></Avatar>:<Avatar alt={`${user}`} src={`${user[0]}`} sx={{width:'5rem',height:'5rem', bgcolor: 'primary.dark',fontSize:'80px' }}>
          </Avatar>}
          
          </Badge>
          {Name&&<Typography sx={{mt:2}} variant='body1'>
            {Name}
          </Typography>}
          {Bio&&<Typography variant='body2'>
            <em>{Bio}</em>
            </Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              placeholder='Name...'
              helperText='enter your name'
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          <TextField
          sx={{mt:4}}
          id="outlined-multiline-flexible"
          // label='bio'
          multiline
          maxRows={4}
          placeholder='Bio...'
          helperText='write something about yourself'
          onChange={(e)=>setBio(e.target.value)}
          value={bio}
        />
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , color:"primary", backgroundColor:'primary.dark',":hover":{backgroundColor:'primary.light'}}}
              >
                update profile
              </Button>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
    
  )
}

export default Profile
