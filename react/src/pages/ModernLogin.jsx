import { useState,useRef } from 'react';
import './ModernStyle.css';
import { useDispatch } from 'react-redux';
import axiosClient from '../axios-client';
import { authActions } from '../store/auth-slice';
import { uiActions } from '../store/ui-slice';


const ModernLogin = (props) => {
    console.log(props);
    //---------------
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    //-------
    const signupEmailRef = useRef();
    const signupNameRef = useRef();
    const signupPasswordRef = useRef();
    //-------
    const [errors,setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();


    const submitLoginFormHandler= (event)=>{
        event.preventDefault();
        const userData = {
            'email' : loginEmailRef.current.value ,
            'password' : loginPasswordRef.current.value ,
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
    //---------------
    const submitSignUpFormHandler =(event) => {
        event.preventDefault();
        const userData = {
            'name' : signupNameRef.current.value ,
            'email' : signupEmailRef.current.value ,
            'password' : signupPasswordRef.current.value ,
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
    //---------------
    const [isLogin,setIsLogin] = useState(props.isLogin);
    const loginRouteButtonHandler = () => {
        setIsLogin(true);
    }
    const registerRouteButtonHandler = () => {
        setIsLogin(false);
    }
    return(
          <div className={"container "+(isLogin?'':'active')} id="container">
          <div className="form-container sign-up">
            <form  onSubmit={submitSignUpFormHandler}>
                <h1>Create Account</h1>
                <input ref={signupNameRef} type="text" placeholder="Name"/>
                {errors.name && <span className='text-red-600 text-left text-sm'>{errors.name}</span>}
                <input ref={signupEmailRef}  type="email" placeholder="Email"/>
                {errors.email && <span className='text-red-600 text-left text-sm'>{errors.email}</span>}
                <input ref={signupPasswordRef} type="password" placeholder="Password"/>
                {errors.password && <span className='text-red-500 left-0'>{errors.password}</span>}
                <button type='submit'>Sign Up</button>
            </form>
        </div>

        <div className="form-container sign-in">
            <form onSubmit={submitLoginFormHandler}>
                <h1>Sign In</h1>
                <input ref={loginEmailRef} type="email" placeholder="Email"/>
                {errors.message && <span className='text-red-600 text-left text-sm'>{errors.message}</span>}
                {errors.email && <span className='text-red-600 text-left text-sm'>{errors.email}</span>}
                <input ref={loginPasswordRef} type="password" placeholder="Password"/>
                {errors.password && <span className='text-red-500 left-0'>{errors.password}</span>}
                {/* <a href="#">Forget Your Password?</a> */}
                <button type='submit'>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className={isLogin?"hidden":''} id="login" onClick={loginRouteButtonHandler}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className={isLogin?"":'hidden'} id="register" onClick={registerRouteButtonHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ModernLogin;