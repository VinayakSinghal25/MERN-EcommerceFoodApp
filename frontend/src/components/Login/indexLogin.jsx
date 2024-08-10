import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/loginSlice.jsx";
import { useState } from "react";

export const Login = () =>{

    // const {loginDispatch ,email, password} = useLogin();

    // const navigate = useNavigate();

    // const onFormSubmit = async (e) =>{
    //     e.preventDefault();//when press on login,it'll actually reload the page, and page reload,so data gone. This stops it.
    //     const data = await userLogin(email, password);
    //     if(Object.keys(data)?.length > 0){ // here data is an object, .length only works on array, so object.keys return an array of keys.
    //         localStorage.setItem('token',data.access_token);//setItem take a key, and its value
    //     }
    //     console.log({data});
    //     loginDispatch({
    //         type: 'TOKEN',
    //         payload: {
    //             token: data
    //         }
    //     })
    //     if(data.access_token){
    //         navigate('/');
    //     }
    // }
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {loading , error} = useSelector((state)=>state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginEvent=(e)=>{
        e.preventDefault();
        let userCredentials = {
            email,password
        }
        dispatch(loginUser(userCredentials)).then((result)=>{
            console.log(result);
            // if(Object.keys(result.payload)?.length > 0){ // here data is an object, .length only works on array, so object.keys return an array of keys.
            //             localStorage.setItem('token',result.payload.token);//setItem take a key, and its value
            //         }
            if(result.payload){
                setEmail('');
                setPassword('');
                navigate('/');
            }
        })
    }
    const onSignupClick = () =>{
        navigate('/signUp')
    }
    

    // const onEmailChange =(e) =>{
    //     loginDispatch({
    //         type : 'EMAIL',
    //         payload:{
    //             value: e.target.value
    //         }
    //     })
    // }
    // const onPasswordChange =(e) =>{
    //     loginDispatch({
    //         type : 'PASSWORD',
    //         payload:{
    //             value: e.target.value
    //         }
    //     })
    // }
    

    return (
        <form onSubmit={handleLoginEvent} className="bg-white shadow-md w-[400px] p-10">
            {error && (
                <div className="alert alert-danger" role='alert'>
                    {error}
                </div>
                
            )}
            <h2 className="flex justify-center text-3xl">Login</h2>
            <br></br>
            {/* <div className="flex flex-col gap-2">
                <span>Email *</span>
                <input className="border-b-2" onChange={(e) =>setEmail(e.target.value)} type="email" required placeholder= "xyz@mailProvider.com" />
            </div>
            <div className="flex flex-col gap-2">
                <span>Password *</span>
                <input className="border-b-2" onChange={(e) =>setPassword(e.target.value)} type="password" required placeholder= "enter password here" />
            </div> */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" onChange={(e) =>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email}/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" onChange={(e) =>setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password}/>
            </div>
            <div className="mx-4">
                <button className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
                    Login
                </button>
            </div>
            
            <br></br>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Create new account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={onSignupClick}>Signup</a>
                            </p>
        </form>
    )
}