import { Remove, Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/Basket";

interface Props{
    items: BasketItem[];
    isBasket?: boolean;
}


export default function BasketTable({items,isBasket=true}:Props){

    const dispatch=useAppDispatch();
    const { basket, status } = useAppSelector(state => state.basket);

    return(
        <table style={{ minWidth: 650 }} aria-label="simple table">
                        <thead>
                            <tr>
                                <th>Product (100g serving)</th>
                                <th style={{ textAlign: 'right' }}>Price</th>
                                <th style={{ textAlign: 'center' }}>Quantity</th>
                                <th style={{ textAlign: 'right' }}>Subtotal</th>
                                {isBasket && 
                                <th style={{ textAlign: 'right' }}></th>}
                            </tr>
                        </thead> 
                        <tbody>
                            {items.map(item => (
                                <tr key={item.productId}>
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}/>
                                        <span>{item.name}</span>
                                    </Box>
                                    <td style={{ textAlign: 'right' }}>{(item.price / 100).toFixed(2)}$</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <IconButton color='error'/> {/*this part should be loading button */}
                                        <Remove onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:1,name:"Rem"}))}/>
                                        {item.quantity}
                                        <IconButton color='error'/>
                                        <Add onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))}/>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>{((item.price / 100) * item.quantity).toFixed(2)}$</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity,name:'del'}))} style={{ color: 'red' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}