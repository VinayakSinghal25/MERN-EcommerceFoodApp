import Navbar from "../../components/Navbar"
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import React,{useState} from "react";
import { registerUser } from "../../slices/loginSlice";
import TermsAlertModal from "../TermsAlertModal/TermsAlertModal";

export const SignUp = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State for terms acceptance
    const [showAlert, setShowAlert] = useState(false); // State for showing alert
    const {loading , error} = useSelector((state)=>state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignupEvent=(e)=>{
        e.preventDefault();
        if (!isTermsAccepted) {
            // Show alert or popup
            setShowAlert(true);
            return;
        }
        let userCredentials = {
            name,email,password
        }
        dispatch(registerUser(userCredentials)).then((result)=>{
            // if(Object.keys(result)?.length > 0){ // here data is an object, .length only works on array, so object.keys return an array of keys.
            //     localStorage.setItem('token',result.payload.token);//setItem take a key, and its value
            // }
            //console.log(result.payload);
            if(result.payload && result.payload.token ){
                setEmail('');
                setPassword('');
                setName('');
                navigate('/');
            }
            // if(result.payload.token){
            //     navigate('/');
            // }
        })
    }
    const onLoginClick = () =>{
        navigate('/auth/login')
    }

    return (
        <>
        <Navbar/>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
               
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    {error && (
                                <div className="alert alert-danger text-center mx-auto" role="alert">
                                    {error}
                                </div>
                            )}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form onSubmit={handleSignupEvent} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input type="name" onChange={(e) =>setName(e.target.value)}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" required=""  value={name}/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" onChange={(e) =>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email}/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" onChange={(e) =>setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password}/>
                            </div>
                            {/* <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div> */}
                           <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" onChange={(e) => setIsTermsAccepted(e.target.checked)} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                            <button type="submit" className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={onLoginClick}>Login here</a>
                            </p>
                            {showAlert && <TermsAlertModal onClose={() => setShowAlert(false)} />} {/* Show the modal if showAlert is true */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

