import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage(){
    return(
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purpose</Typography>
            <ButtonGroup fullWidth>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get400().catch(error=>console.log(error))}>Test 400 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get401().catch(error=>console.log(error))}>Test 401 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get404().catch(error=>console.log(error))}>Test 404 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get500().catch(error=>console.log(error))}>Test 500 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.getValidationError().catch(error=>console.log(error))}>Test getValidationError </Button>
            </ButtonGroup>
        </Container>
    )
    
}