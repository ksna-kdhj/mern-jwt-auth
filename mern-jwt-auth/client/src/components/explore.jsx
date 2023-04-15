

const explore = () => {
    const colorMode = useSelector(selectColorMode)
    const theme = createTheme({...BaseTheme(colorMode)})
  return (
    <div>explore</div>
  )
}

export default explore