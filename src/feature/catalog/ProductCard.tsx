import {   Avatar, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, Button } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";

interface Props{
    product:Product;
}


export default function ProductCard({product}:Props){
    const {status} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();

    
    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={
                    {
                        sx:{fontWeight: "bold", color:'secondary.main'}
                    }
                }
            />
            <CardMedia
                sx={{ height: 140,backgroundSize:"contain" ,bgcolor:'primary.light'}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand}/{product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={()=>dispatch(addBasketItemAsync({productId:product.id,quantity:1}))}>ADD</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )   
}
// since we don't use the MUI lab it is commented out and replaced into normal button 
//                <LoadingButton loading={loading} onClick={()=>handleAddItem(product.id)}></LoadingButton>

