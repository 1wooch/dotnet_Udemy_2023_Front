import { Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketPage(){
    const {basket}=useStoreContext();

    if(!basket) return <Typography variant='h3'>Your Baket is Empty</Typography>

    return(
        <div>
            <h1>Buyer Id = {basket.buyerId}</h1>

            <div>
            <table style={{ minWidth: 650 }} aria-label="simple table">
                <thead>
                    <tr>
                        <th>Product (100g serving)</th>
                        <th style={{ textAlign: 'right' }}>Price</th>
                        <th style={{ textAlign: 'right' }}>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Subtotal</th>
                        <th style={{ textAlign: 'right' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {basket.items.map(item => (
                        <tr key={item.productId}>
                            <td>{item.name}</td>
                            <td style={{ textAlign: 'right' }}>{(item.price / 100).toFixed(2)}$</td>
                            <td style={{ textAlign: 'right' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'right' }}>{((item.price / 100) * item.quantity).toFixed(2)}$</td>
                            <td style={{ textAlign: 'right' }}>
                                <button style={{ color: 'red' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
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