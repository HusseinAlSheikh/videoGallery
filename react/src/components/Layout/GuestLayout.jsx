import { Outlet , Navigate  } from "react-router-dom";
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


export default function GuestLayout(){
    const token = useSelector(state => state.auth.token);
    if (token){
        return <Navigate to="/dashboard"/>
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                {/*<CssBaseline />*/}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                  <Outlet/>
                </Box>
            </Container>
        </>
    );
};