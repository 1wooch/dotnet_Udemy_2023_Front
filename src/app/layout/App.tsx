import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../feature/basket/basketSlice";
import { fetchCurrentUser } from "../../feature/account/accountSlice";


function App() {
  const dispatch = useAppDispatch();

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    dispatch(fetchCurrentUser());
    if(buyerId){
      agent.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>{
        setLoading(false);
      })
    }else{
      setLoading(false);
    }
  },[dispatch]);



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
