import { Outlet , Navigate  } from "react-router-dom";
import {useSelector} from 'react-redux';
export default function GuestLayout(){
    const token = useSelector(state => state.auth.token);
    if (token){
        return <Navigate to="/dashboard"/>
    }

    return (
        // <section className="bg-[#F4F7FF] py-14 lg:py-20">
        //     <div className="container">
        //         <div className="-mx-4 flex flex-wrap">
        //             <div className="w-full px-4">
        //                 <div
        //                     className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-14 px-8 text-center sm:px-12 md:px-[60px]"
        //                     data-wow-delay=".15s"
        //                 >
        //                     <div className="mb-10 text-center">
        //                         <img src="assets/images/logo/logo.svg" alt="logo"/>
        //                     </div>
                            <Outlet/>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};