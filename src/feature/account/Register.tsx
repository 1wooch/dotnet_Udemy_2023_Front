import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.
export default function Register() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{ errors},setError} = useForm(
        {
            mode: 'all'
        }
    );

    function handleApiErrors(errors:string[]){
        if(errors){
            errors.forEach(error=>{
                if(error.includes('Password')){
                    setError('password', {message: error});
                }
                else if(error.includes('Username')){
                    setError('username', {message: error});
                }
                else if(error.includes('Email')){
                    setError('email', {message: error});
                }
            })
        }
    }

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
                .then(()=>{
                    toast.success('Registration Successful');
                    navigate('/login');
                })
                .catch(error=>{handleApiErrors(error)})})} noValidate sx={{ mt: 1 }}>
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
                {...register('email', {required: 'Email is required'
                ,
                pattern:{
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Not a Valid Email Address'
                }
                })} 
                error={!!errors.email}
                helperText={errors?.email?.message as string}
                />
                <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register('password', {
                    required: 'Password is required',
                    pattern:{
                        value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                        message: 'Not a Valid Password'
                    }})}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
                />
                
                
            
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
