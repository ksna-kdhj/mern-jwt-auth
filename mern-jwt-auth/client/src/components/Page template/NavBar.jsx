import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { toggle, selectColorMode } from '../../features/ToggleColorModeSlice'; 
import { useDispatch,useSelector } from 'react-redux';
import { blue, red } from '@mui/material/colors';
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { ThemeProvider } from '@emotion/react';
import BaseTheme from '../themes/BaseTheme';
import styled from '@emotion/styled';
import { selectToken, selectUser } from '../../features/auth/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { clearCredentials } from '../../features/auth/authSlice';
import { selectPicture } from '../../features/profile/profileSlice';
import { useGetProfileMutation } from '../../features/profile/profileApiSlice';
import { useEffect } from 'react';
import { setProfilePicture } from '../../features/profile/profileSlice';

function NavBar() {
  const [getProfile] = useGetProfileMutation()
  const logout = useLogout()
  const navigate = useNavigate()
  const token = useSelector(selectToken)
  // console.log(token)
  const usr = useSelector(selectUser)
  // console.log(usr)
  const user = token?usr:null
  const [imgData, setImgData] = useState(null);
  // console.log(user)
  const picture = useSelector(selectPicture)
  // console.log(picture)
  const pages = ['About', 'Blog','Home'];
const settings = ['Profile', 'MyTracker','MyCollegeTracker', `${user?'Logout':'Login'}`];
  const colorMode = useSelector(selectColorMode)
  // const theme = useTheme(navTheme)
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] =useState (null);
  const navTheme = createTheme({...BaseTheme(colorMode)})
  const myTypography = styled(Typography)({
    variant:"h6",
    noWrap:true,
    component:"a",
    href:"/",
    color:'Primary.dark',
    sx:{
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    textDecoration: 'none',
  }})
//   const signOut = async () => {
//     
// }
  const handleLinkClick = async (setting)=>{
    // console.log(setting)
    if (`${setting}`=='Logout'){
      // console.log('im here')
      dispatch(clearCredentials())
      dispatch(setProfilePicture({picture:null}))
      await logout()
      navigate('/linkpage',{replace:true})
    }
    else{
      if(`${setting}`=='Home'){
        const destination = '/'
        navigate(destination)
      }else{
    const destination = `${'/'.concat(`${setting}`.toLowerCase())}`
    // console.log(destination)
    navigate(destination)
      }
  }
}
  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
  setAnchorElUser(null);
  };
  
  const handleToggleColorMode = () =>{
    dispatch(toggle())
  }
  let c = 0
  useEffect(()=>{
    const getData = async()=>{
      const profileData = await getProfile({user:user}).unwrap()
      // console.log(profileData)
      dispatch(setProfilePicture({picture:profileData.picture}))
      setImgData(profileData.picture)
      // console.log(profileData)
      // console.log(imgData)
      // console.log(profileData.name)
    }
    // Bio==null||Name==null&&
    c = c+1
    console.log(c)
    if(c==1)
     user && getData()
  },[token])
  const content = 
  // {/* <ToggleColorMode theme={theme}/> */}
  <ThemeProvider theme={navTheme}>
    <AppBar position="sticky" sx={{color:'primary.dark'}}>
      <Container maxWidth="xl" sx={{color:'primary.dark'}}>
        <Toolbar disableGutters>
          {/* <Link href='/'> */}
            {/* <IconButton> */}
          <SchoolTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* </IconButton> */}
          {/* </Link> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                
                  {/* <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary.dark', display: 'block' }}
              > */}
                <Link onClick={()=>handleLinkClick(page)} sx={{textDecoration: 'none'}}color='primary.dark'>
                {page}
                </Link>
              {/* </Button> */}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SchoolTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary.dark', display: 'block' }}
              >
                <Link 
              // href={`${'/'.concat(setting.toLowerCase())}`}
              onClick={()=>handleLinkClick(page)}
               sx={{textDecoration: 'none'}}color='inherit'>
                {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box>
            <IconButton
            
            
             onClick={handleToggleColorMode}>
            { useSelector(selectColorMode)=== 'dark' ? <Brightness7Icon sx={{color:'white'}}/> : <Brightness4Icon sx={{color:'black'}}/>}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user?(picture?<Avatar src={imgData?imgData:picture}></Avatar>:<Avatar alt={`${user}`} src={`${user[0]}`} sx={{ bgcolor: 'primary.dark' }}>
          </Avatar>):<LoginIcon label='login'/>}
        
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} name={setting} onClick={handleCloseUserMenu}>
                   {/* <Button
                key={setting}
                onClick={handleCloseUserMenu}
                sx={{ my: 2, color: 'primary.dark', display: 'block' }}
              >
                <Link 
              // href={`${'/'.concat(setting.toLowerCase())}`}
              onClick={()=>handleLinkClick(setting)}
               sx={{textDecoration: 'none'}}color='primary.dark'>
                {setting}
                </Link>
              </Button> */}
                  <Link 
                  // href={`${'/'.concat(setting.toLowerCase())}`}
                  onClick={()=>handleLinkClick(setting)}
                   sx={{textDecoration: 'none'}}color='inherit'>
                    <Typography textAlign="center" color='primary.dark'>
                    {setting}
                    </Typography>
                    </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  return (
    content
  )
}
export default NavBar;