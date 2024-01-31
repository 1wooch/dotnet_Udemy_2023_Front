import {   Avatar, Card, CardActions, CardContent, CardMedia, Typography, CardHeader, Button } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";

interface Props{
    product:Product;
}


export default function ProductCard({product}:Props){
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
                    ${(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand}/{product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )   
}