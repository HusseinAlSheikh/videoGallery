import * as React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useState} from "react";
import {useDispatch} from "react-redux";
import axiosClient from "../axios-client";
import {authActions} from "../store/auth-slice";
import {uiActions} from "../store/ui-slice";


export default function Register() {
    //-------
    const [errors,setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    //-------


    const formSubmitHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        };
        setErrors({});
        setLoading(true);
        axiosClient.post('/signup',userData).then(({data}) => {
            dispatch(authActions.setToken(data.token));
            dispatch(authActions.setUser(data.user));
            dispatch(uiActions.showNotification({
                status  : 'success',
                message : data.message ,
            }));
            setLoading(false);
            redirect('/dashboard');
        }).catch(err => {
            const response = err.response;
            if (response && response.status == 401){
                //--- validation error
                setErrors(response.data.errors);

            }
            setLoading(false);
        });
    };
    return (
        <>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" onSubmit={formSubmitHandler} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus

                />
                {errors.name && <span className='text-red-600 text-left text-sm'>{errors.name}</span>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"

                />
                {errors.email && <span className='text-red-600 text-left text-sm'>{errors.email}</span>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"

                    className=""
                />
                {errors.password && <span className='text-red-500 left-0'>{errors.password}</span>}
                <Button
                    disabled={loading?'disabled':''}
                    className='disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-800'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                    {loading &&
                        <span className=" px-2" > loading icon </span>
                    }
                </Button>
                <Grid container>
                    <Grid item>
                        <Link to="/login" className="text-blue-700">
                            {"Have an account? Log In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}