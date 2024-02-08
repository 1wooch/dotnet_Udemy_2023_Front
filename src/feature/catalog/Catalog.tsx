import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";


export default function Catalog(){

    const [products, setProducts] = useState<Product[]>(
        []
      );
    
      useEffect(()=>{
        agent.Catalog.list().then(products=>{
          setProducts(products)
        })
    
      },[]) //dependency array = run only once
      
    
     
    return(
        <React.Fragment>
            <ProductList products={products}/>
        </React.Fragment>
    )
}