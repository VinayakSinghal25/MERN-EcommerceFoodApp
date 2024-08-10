import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import "../ProductCard/productCard.css"
export const Navbar =() => {

    const navigate = useNavigate();
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    //this token should come from store
    //const {token ,loginDispatch} = useLogin();
    const {loading , error,user} = useSelector((state)=>state.user);
    const {cart} = useCart();
    const dispatch = useDispatch();

    const onLoginClick = () =>{
        //console.log(user?.token);
        if(!user?.token) {
            navigate('/auth/login')
        }else{
            dispatch(logout());
            navigate('/auth/login')
        }
    }
    const onSignUpClick = ()=>{
        navigate('/signUp')
    }

    return(
        <header className="flex bg-rose-600 py-4 px-8 text-slate-50">
            <div>
                <h1 onClick={() => navigate('/')} className="text-5xl hover: cursor-pointer">FoodApp</h1>
            </div>
            <nav className="ml-auto flex gap-8">
               
              
                <div className="cart-container">
                    <span className="cart-count">{cart.length}</span>
                    <span onClick={() => navigate('/cart')} className="material-symbols-outlined text-3xl hover:cursor-pointer">
                        shopping_cart
                    </span>
                </div>
                <div className="relative">
                    <span onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)} className="material-symbols-outlined text-3xl hover:cursor-pointer">
                        account_circle
                    </span>
                    {
                        isAccountDropdownOpen && (<div className="absolute bg-rose-400">
                        <button onClick={onLoginClick}>
                        {
                            user?.token ? 'Logout' : 'Login'
                        }
                        </button>
                        <button onClick={onSignUpClick}>
                        {
                            user?.token ? '' :'SignUp'
                        }

                        </button>

                        </div>
                     )}
                    {

                    }
                </div>
                
            </nav>
        </header>
    );
}

export default Navbar