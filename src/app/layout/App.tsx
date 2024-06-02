import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../feature/basket/basketSlice";
import { fetchCurrentUser } from "../../feature/account/accountSlice";


function App() {
  const dispatch = useAppDispatch();

  const [loading,setLoading]=useState(true);

  const initApp = useCallback(async()=>{
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }catch(error){
      console.log(error);
    }
  },[dispatch]);

  useEffect(()=>{
    initApp().then(()=>setLoading(false));
  },[initApp]);

  


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
  if(loading) return <LoadingComponent message="Initialising App ..."/>;
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
