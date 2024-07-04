import {  Button, Grid, Typography } from "@mui/material";
import React from "react";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage(){
    const { basket } = useAppSelector(state => state.basket);
    //no need since we can't use loading button
    
    

    if(!basket) return <Typography variant='h3'>Your Baket is Empty</Typography>

    return(
        <React.Fragment>
            <BasketTable items={basket.items}/>
            <Grid container>
                <Grid item xs={6}/> 
                <Grid item xs={6}>
                    <BasketSummary/>
                    <Button
                        component={Link}
                        to='/checkout'
                        variant = 'contained'
                        size = 'large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../app/store/configureStore";
import BasketTable from "./basketTable";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//THis code or part commented out because material UI lab causing error so I changed

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