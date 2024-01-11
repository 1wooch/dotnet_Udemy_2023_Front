import React from "react";

interface Props{
    products:any[],
    addProduct:()=>void

}

export default function Catalog({products,addProduct}:Props){

    return(
        <React.Fragment>
            <ul>
                {products.map(product => (
                <li key={product.id}>
                    {product.name} - ${product.price}
                </li>
                ))}        
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </React.Fragment>
    )
}