import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
export default function Register() {
    const [validationErrors, setValidationErrors] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {register,handleSubmit,formState:{isSubmitting, errors, isValid}} = useForm(
        {
            mode: 'onTouched'
        }
    );

    return (
        <Container component={Paper} maxWidth="sm" 
        sx={{display: 'flex',flexDirection:'column',alignItems:'center',p:4}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit(data =>
                {agent.Account.register(data)
                .catch(error=>{setValidationErrors(error)})})} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                fullWidth
                label="Username"
                {...register('username', {required: 'Username is required'})} 
                error={!!errors.username}
                helperText={errors?.username?.message as string}
                />
                <TextField
                margin="normal"
                fullWidth
                label="Email"
                {...register('email', {required: 'Email is required'})} 
                error={!!errors.email}
                helperText={errors?.email?.message as string}
                />
                <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register('password', {required: 'Password is required'})}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
                />
                
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
            
                <Button
                //disable={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
                <Grid container>
                <Grid item>
                    <Link to='/login'>
                    {"Already have an account? Sign Ub"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
