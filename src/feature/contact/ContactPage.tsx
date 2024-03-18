import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){
    const dispatch = useAppDispatch();

    const data = useAppSelector(state=>state.counter.data)
    const title = useAppSelector(state=>state.counter.title)

    return(
        <React.Fragment>
            <Typography variant="h2">
                {title}
            </Typography>  
            <Typography variant="h2">
                This Data is: {data}
            </Typography>   
            <ButtonGroup>
                <Button onClick={()=>{dispatch(decrement(1))}} variant="contained" color="error">
                    Decrement
                </Button>
                <Button onClick={()=>{dispatch(increment(1))}} variant="contained" color="primary">
                    Increment
                </Button>
                <Button onClick={()=>{dispatch(increment(5))}} variant="contained" color="secondary">
                    Increment by 5
                </Button>
            </ButtonGroup>
        </React.Fragment>

    )
    
}