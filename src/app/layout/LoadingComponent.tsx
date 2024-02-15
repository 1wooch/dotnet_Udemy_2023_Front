import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props{
    message?:String;
}



export default function LoadingComponent({message='Loading...'}:Props) {
  return (
    <Backdrop open={true} invisible={true}>
        {/* <Box display='flex' justifyContent='center' alignsItems='center' height='100vh'> */}
        <Box>
            <CircularProgress color='secondary' size={100}/>
            <Typography variant='h4' sx={{justifyContent:'center',position:'fixed',top:'60%'}}>{message}</Typography>
        </Box>
    </Backdrop>
  );
}