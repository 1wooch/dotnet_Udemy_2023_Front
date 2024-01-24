import { useState } from "react";
import Catalog from "../../feature/catalog/Catalog";
import Header from "./Heder";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";


function App() {
  const [darkMode,setDarkMode] = useState(false);
  const palletType = darkMode ? "dark" : "light";

  
  const theme = createTheme({
    palette: {
      mode: palletType,
      background:{
        default:palletType==='light'? '#eaeaea':'#121212'
      }
    }
  });
  function onChange(){
    setDarkMode(!darkMode);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/> 
            <Header darkMode={darkMode} handleThemeChange={onChange} />
            <Container>
            <Catalog/>
        </Container>
      </ThemeProvider>
      
      
    </div>
  )
}

export default App
