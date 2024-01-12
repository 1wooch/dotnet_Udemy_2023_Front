import {Button } from "@mui/material";
import React from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

interface Props{
    products:Product[],
    addProduct:()=>void

}

export default function Catalog({products,addProduct}:Props){

    return(
        <React.Fragment>
            <ProductList products={products}/>
            <Button variant='contained' onClick={addProduct}>Add Product</Button>
        </React.Fragment>
    )
}