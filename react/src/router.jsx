import {Navigate, createBrowserRouter} from 'react-router-dom';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import DefaultLayout from './components/Layout/DefaultLayout';
import GuestLayout from './components/Layout/GuestLayout';
import Dashboard from './pages/Dashboard';
import UserVideos from './pages/User-Videos';
import Login from './pages/Login';
import Register from './pages/Register';
import Train from './pages/Train';


const router = createBrowserRouter([
    {
        path:'/' , 
        element:<DefaultLayout />,
        children:[
            {
                path:'/',
                element:<Navigate to="/dashboard"/>
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
                element:<Dashboard />
            }
        ]
    },
    {
        path:'/' , 
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            },
            {
                path:'/train',
                element:<Train />
            }
        ]
    },

    {
        path:'*',
        element:<NotFound/>
    },
]);


export default router;