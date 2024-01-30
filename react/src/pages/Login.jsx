import {Link} from 'react-router-dom';
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import axiosClient from "../axios-client";
import {authActions} from "../store/auth-slice";
import {uiActions} from "../store/ui-slice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors,setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();


    const submitFormHandler= (event)=>{
        event.preventDefault();
        const userData = {
            'email' : emailRef.current.value ,
            'password' : passwordRef.current.value ,
        };
        setErrors({});
        setLoading(true);
        axiosClient.post('/login',userData).then(({data}) => {
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
                if (response.data.errors)
                    setErrors(response.data.errors);
                else if (response.data)
                    setErrors(response.data);
            }
            setLoading(false);
        });
    };

    return (
        <>
            <form onSubmit={submitFormHandler}>
                <div className="mb-6">
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className={"border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none " +(errors.email?'border-red-500':'')}
                    />
                    {errors.message && <p className='text-red-500 text-left'>{errors.message}</p>}
                    {errors.email && <p className='text-red-500 text-left'>{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className={"border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none " +(errors.password?'border-red-500':'')}
                    />
                    {errors.password && <p className='text-red-500 text-left'>{errors.password}</p>}
                </div>
                <div className="mb-10">
                    {/* <input
                        type="submit"
                        value="Sign In"
                        className="bordder-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md "
                        disabled
                    /> */}
                    <button  
                    disabled={loading?'disabled':''}
                    type='submit' 
                    className={"bordder-primary w-full  rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md  space-x-2 items-center  "+(loading?'cursor-not-allowed':'cursor-pointer')}>
                        <span>
                            Sign In
                        </span>
                        {loading &&
                                <FontAwesomeIcon icon={faSpinner}  className="fa-spin" />   
                        }
                    </button>
                </div>
            </form>
            <p className="text-base text-[#adadad]">
                Not a member yet?
                <Link to="/signup" className="text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </>
    );
}