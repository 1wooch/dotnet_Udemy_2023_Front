import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../feature/catalog/Catalog";
import Header from "./Heder";
import { Container, CssBaseline } from "@mui/material";


function App() {
  const [products, setProducts] = useState<Product[]>(
    []
  );

  useEffect(()=>{
    fetch('http://localhost:5198/api/products')
    .then(response => response.json())
    .then(data=>setProducts(data))

  },[]) //dependency array = run only once
  

  function addProduct() {
    setProducts(prevState=>[...prevState,
      {
        id:prevState.length+101,
        name:'Product'+(prevState.length+1),
        price:(prevState.length+1)*100.00,
        brand:"random brand",
        description:"random description",
        pictureUrl:"http://picsum.photos/200",
       
      }]);
  }

  return (
    <div>
      <CssBaseline/> 

      <Header/>
      <Container>
        <Catalog
          products={products}
          addProduct={addProduct} 
        />
      </Container>
      
      
    </div>
  )
}

export default App
