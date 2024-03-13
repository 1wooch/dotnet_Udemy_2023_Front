import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";
import React from "react";

export default function ContactPage(){
    const {data,title} = useSelector((state:CounterState) => state);
    return(
        <React.Fragment>
            <Typography variant="h2">
                {title}
            </Typography>  
            <Typography variant="h2">
                This Data is: {data}
            </Typography>   
        </React.Fragment>

    )
    
}