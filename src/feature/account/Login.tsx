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
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signInUser } from './accountSlice';

// TODO remove, this demo shouldn't need to reset the theme.
export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {register,handleSubmit,formState:{ errors}} = useForm(
        {
            mode: 'onTouched'
        }
    );

    async function submitForm(data: FieldValues){
        await dispatch(signInUser(data));
        navigate('/catalog'); //go to catalog page after login

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
                {...register('username', {required: 'Username is required'})} 
                error={!!errors.username}
                helperText={errors?.username?.message as string}
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
            
                <Button
                //disable={!isValid}
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
