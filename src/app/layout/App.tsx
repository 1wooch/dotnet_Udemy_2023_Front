import { useState } from "react";
import Header from "./Heder";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
        <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
        <CssBaseline/> 
            <Header darkMode={darkMode} handleThemeChange={onChange} />
            <Container>
            <Outlet/>
        </Container>
      </ThemeProvider>
      
      
    </div>
  )
}

export default App
