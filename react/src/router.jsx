import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import DefaultLayout from './components/Layout/DefaultLayout';
import GuestLayout from './components/Layout/GuestLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UserVideos from './pages/User-Videos';


const router = createBrowserRouter([
    {
        path:'/' , 
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to="/Home"/>
            },
            {
                path:'/users',
                element:<Users/>
            },
            {
                path:'/myVideos',
                element:<UserVideos />
            },{
                path:'/dashboard',
                element:<Dashboard/>
            },{
                path:'/home',
                element:<Home/>
            }
        ]
    },
    {
        path:'/' , 
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            }
        ]
    },

    {
        path:'*',
        element:<NotFound/>
    },
]);


export default router;