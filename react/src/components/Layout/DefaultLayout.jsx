import {Outlet,Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import Notification from "../UI/Notification";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function DefaultLayout(){
    const token= useSelector(state => state.auth.token);
    if (!token){
        return <Navigate to="/login"/>
    }


    // const logoutHandler = (event) =>{
    //     event.preventDefault();
    //
    //     axiosClient.post('/logout')
    //         .then(()=>{
    //             setUser({});
    //             setToken(null);
    //         });
    // }

    // useEffect(()=>{
    //
    //     axiosClient.get('/user')
    //         .then(({data})=>{
    //             setUser(data);
    //         }).catch(err => {
    //         console.error(err);
    //     });
    //     console.log('effect process');
    // },[]);



    return (
        <>
        <Notification/>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0.5} className='h-screen'>
                <Grid item xs={2} className="bg-blue-300">
                    <span>xs=2 side bar </span>
                </Grid>
                <Grid item xs={10}  >
                    <Grid item xs={12} className="bg-red-300" >
                        <span>xs=12 header </span>
                    </Grid>
                    <Grid item xs={12} className="bg-green-300" >
                         <Outlet/>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};