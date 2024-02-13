import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage(){
    return(
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purpose</Typography>
            <ButtonGroup fullWidth>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get400}>Test 400 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get401}>Test 401 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get404}>Test 404 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get500}>Test 500 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.getValidationError}>Test getValidationError </Button>
            </ButtonGroup>
        </Container>
    )
    
}