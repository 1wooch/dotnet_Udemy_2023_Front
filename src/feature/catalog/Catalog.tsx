import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";


export default function Catalog(){

    const [products, setProducts] = useState<Product[]>(
        []
      );
    
      useEffect(()=>{
        fetch('http://localhost:5198/api/products')
        .then(response => response.json())
        .then(data=>setProducts(data))
    
      },[]) //dependency array = run only once
      
    
     
    return(
        <React.Fragment>
            <ProductList products={products}/>
        </React.Fragment>
    )
}