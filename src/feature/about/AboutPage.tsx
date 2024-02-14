import { Alert, AlertTitle, Button, ButtonGroup, Container, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){
    const [validationErrors,setValidationErrors]=useState<string[]>([]);

    function getValidationError(){
        agent.TestErrors.getValidationError().then(()=>console.log('should not get here')).catch(error=>setValidationErrors(error));
    }

    return(
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purpose</Typography>
            <ButtonGroup fullWidth>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get400().catch(error=>console.log(error))}>Test 400 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get401().catch(error=>console.log(error))}>Test 401 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get404().catch(error=>console.log(error))}>Test 404 Error</Button>
                <Button variant ='contained' onClick={()=> agent.TestErrors.get500().catch(error=>console.log(error))}>Test 500 Error</Button>
                <Button variant ='contained' onClick={getValidationError}>Test getValidationError </Button>
            </ButtonGroup>
            {validationErrors.length>0 && 
                <Alert severity='error'>
                    <AlertTitle>Validation Error</AlertTitle>
                    <ul>
                        {validationErrors.map((error)=>(
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>    
                            </ListItem>    
                        ))}
                    </ul>
                </Alert>
            }
        </Container>
    )
    
}