import { useEffect, useState } from "react";
import Header from "./Heder";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";


function App() {
  const {setBasket}=useStoreContext();
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId){
      agent.Basket.get().then(basket=>{
        setBasket(basket);
        setLoading(false);
      }).catch(error=>console.log(error))
      .finally(()=>{
        setLoading(false);
      })
    }
  },[setBasket]);



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
