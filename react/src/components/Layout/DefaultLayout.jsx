import {Link,Outlet,Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

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
        <div>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div >
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        user
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};