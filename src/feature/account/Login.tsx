import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';

// TODO remove, this demo shouldn't need to reset the theme.
export default function Login() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {register,handleSubmit,formState:{isSubmitting}} = useForm();

    async function submitForm(data: FieldValues){
        await agent.Account.login(data);

    }

    return (
        <Container component={Paper} maxWidth="sm" 
        sx={{display: 'flex',flexDirection:'column',alignItems:'center',p:4}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                fullWidth
                label="Username"
                autoFocus
                {...register('username')} 
                />
                <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register('password')}
                />
            
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item>
                    <Link to='/register'>
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
