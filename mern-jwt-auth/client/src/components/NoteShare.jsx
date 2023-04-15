import { ThemeProvider } from "@emotion/react"
import { useSelector } from "react-redux"
import { selectColorMode } from "../features/ToggleColorModeSlice"
import {IconButton,Button} from "@mui/material"
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import BaseTheme from "./themes/BaseTheme"
import { Avatar, createTheme,Grid,Box,CssBaseline } from "@mui/material"

const NoteShare = () => {
    const colorMode = useSelector(selectColorMode)
    const theme = createTheme({...BaseTheme(colorMode)})
    const handleSubmit = ()=>{
    }
  return (
    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh',alignItems:'center',justifyItems:'center'}}>
      <CssBaseline />
      <Grid item xs={12} md={12} lg={12} xl={12}  sx={{alignItems:"center",justifyContent:'center'}} >
      <Box component="form"
      onSubmit={handleSubmit}
      margin="auto"
          sx={{
            mx: 2,
            display: 'flex',
            flexDirection: 'row',
            // alignItems: 'center',
            // alignContent:'center',
          }}
        >
            <IconButton
                variant="contained"
                sx={{mx:1, width:32.25,height:32.25,borderRadius:1,
                 color:"primary", backgroundColor:'primary.dark',":hover":{backgroundColor:'primary.light'}}} component="label">
            <FileUploadOutlined />
            <input
              styles={{display:"none"}}
              type="file"
              name="[licenseFile]"
            />
          </IconButton>
          <Button sx={{backgroundColor:'primary.dark',fontSize:12,":hover":{backgroundColor:'primary.light'}}} >Cancel</Button>
          <Button sx={{backgroundColor:'primary.dark',fontSize:12,":hover":{backgroundColor:'primary.light'}}} >Save</Button>
        </Box> 
        </Grid>
      </Grid>
    </ThemeProvider>

  )
}

export default NoteShare