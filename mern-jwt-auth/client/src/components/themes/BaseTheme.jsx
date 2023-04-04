import { createTheme } from "@mui/system"
import { blue } from "@mui/material/colors"
import { lightBlue } from '@mui/material/colors'
import { useEffect } from "react"
const BaseTheme = (colorMode) => {
  useEffect(()=>{
    localStorage.setItem('colormode',JSON.stringify(colorMode))
  },[colorMode])
    let theme = createTheme({
        palette:{
          mode: colorMode,
          primary: {
            main:"#FFF",
            light:blue[300],
            dark: blue[800]
          },
      //     active: lightBlue[200],
      // activeOpacity: 1,
      // hover: lightBlue[100],
      // hoverOpacity: 0.7,
      // focus: lightBlue[600],
      // focusOpacity: 1,
      // selected: lightBlue[300],
      // selectedOpacity: 1
        },
      components: {
        MuiLink: {
          styleOverrides: {
            root: ({ theme, ownerState }) => ({
              ...(ownerState.color === 'primary') && {
                color: theme.palette.text.tertiary
              }
            })
          }
        }
        },
      })
  return (
    theme
  )
}

export default BaseTheme