import { useEffect, useState } from "react";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

export default function BasketPage(){

    const [loading, setLoading] = useState(true);
    const [basket,setBasket] = useState<Basket|null>(null); 

    useEffect(
        ()=>{
            agent.Basket.get()
            .then(basket=>setBasket(basket))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
        },[])
    if(loading) return <LoadingComponent message="Loading Basket..."/>

    if(!basket) return <Typography variant='h3'>Your Baket is Empty</Typography>

    return(
        <h1>Buyer Id = {basket.buyerId}</h1>
    )
}

/*
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/Basket";


export default function BasketPage(){

    const [loading, setLoading] = useState(true);
    const [basket,setBasket] = useState<Basket|null>(null); 

    useEffect(
        ()=>{
            agent.Basket.get()
            .then(basket=>setBasket(basket))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
        },[])
    if(loading) return <LoadingComponent message="Loading Basket..."/>

    if(!basket) return <Typography variant='h3'>Your Baket is Empty</Typography>

    return(
        <h1>hello</h1>        /*
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Product (100g serving)</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map(item => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="right">{(item.price/100).toFixed(2)}$</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{((item.price/100)*item.quantity).toFixed(2)}$</TableCell>
                        <TableCell align="right">
                            <IconButton color='error'>
                                <Delete/>
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    
        )
    }
*/