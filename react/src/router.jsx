import {Navigate, createBrowserRouter} from 'react-router-dom';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import DefaultLayout from './components/Layout/DefaultLayout';
import GuestLayout from './components/Layout/GuestLayout';
import Dashboard from './pages/Dashboard';
// import Home from './pages/Home';
import UserVideos from './pages/User-Videos';
import ModernLogin from './pages/ModernLogin';


const router = createBrowserRouter([
    {
        path:'/' , 
        element:<DefaultLayout/>,
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
                element:<Dashboard/>
            }
        ]
    },
    {
        path:'/' , 
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<ModernLogin key='login' isLogin={true} />
            },
            {
                path:'/signup',
                element:<ModernLogin key='signup' isLogin={false}  />
            }
        ]
    },

    {
        path:'*',
        element:<NotFound/>
    },
]);


export default router;