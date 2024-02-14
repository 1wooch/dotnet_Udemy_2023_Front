import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();

    function handleClick() {
    navigate("/catalog");
    }
    return (
        <Container component={Paper} sx={{height:400}}>
            <Typography variant="h3" gutterBottom>
                Not Found - What you are looking :0
            </Typography>
            <Divider/>
            <Button fullWidth onClick={handleClick}>Go Back to Shop</Button>           
        </Container>
    )   
}