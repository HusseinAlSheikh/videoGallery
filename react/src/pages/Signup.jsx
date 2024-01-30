import {Link,redirect} from "react-router-dom";
import {useRef,useState} from 'react';
import axiosClient from "../axios-client";
import {useDispatch} from 'react-redux';
import {uiActions} from '../store/ui-slice';
import {authActions} from '../store/auth-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors,setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();


    const submitFormHandler= (event)=>{
        event.preventDefault();
        const userData = {
            'name' : nameRef.current.value ,
            'email' : emailRef.current.value ,
            'password' : passwordRef.current.value ,
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
            <form onSubmit={submitFormHandler}>
                <div className="mb-6">
                    <input
                        ref={nameRef}
                        type="name"
                        placeholder="name"
                        className={"border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none " +(errors.name?'border-red-500':'')}
                    />
                    {errors.name && <p className='text-red-500 text-left'>{errors.name}</p>}
                </div>
                <div className="mb-6">
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className={"border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none "+(errors.email?'border-red-500':'')}
                    />
                    {errors.email && <p className='text-red-500 text-left'>{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className={"border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none transition focus:border-primary focus-visible:shadow-none "+(errors.password?'border-red-500':'')}
                    />
                    {errors.password && <p className='text-red-500 text-left'>{errors.password}</p>}
                </div>
                <div className="mb-10">

                    {/* <input
                        type="submit"
                        value="Sign Up"
                        className="border-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md "
                    /> */}
                    <button  
                    disabled={loading?'disabled':''}
                    type='submit' 
                    className={"bordder-primary w-full  rounded-md border bg-primary py-3 px-5 text-base text-white transition duration-300 ease-in-out hover:shadow-md  space-x-2 items-center  "+(loading?'cursor-not-allowed':'cursor-pointer')}>
                        <span>
                            Sign Up
                        </span>
                        {loading &&
                                <FontAwesomeIcon icon={faSpinner}  className="fa-spin" />   
                        }
                    </button>
                </div>
            </form>
            <p className="text-base text-[#adadad]">
                Have an Account ?
                <Link to="/login" className="text-primary hover:underline">
                     Login
                </Link>
            </p>
        </>
    );
}