import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default function Catalog(){

    const [products, setProducts] = useState<Product[]>(
        []
      );
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
      agent.Catalog.list().then(products=>{
        setProducts(products)
      }).catch(error=>console.log(error)).finally(()=>setLoading(false));  
    },[]) //dependency array = run only once
      
    if(loading) return <LoadingComponent message="Loading Products"/>;
     
    return(
        <React.Fragment>
            <ProductList products={products}/>
        </React.Fragment>
    )
}