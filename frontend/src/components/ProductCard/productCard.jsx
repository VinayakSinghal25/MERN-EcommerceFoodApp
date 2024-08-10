import {useCart} from "../../context/cart-context"
import { findProductInCart } from "../../utils/findProductInCart";
import { useNavigate } from "react-router-dom";


export const ProductCard = ({product}) =>{
   

     const {cart, cartDispatch} = useCart();//cart is a global state we have defined

     const navigate = useNavigate();


     const isProductInCart = findProductInCart(cart, product.id)

     const onCartClick = (product) =>{
          if(!isProductInCart){
               const productWithQuantity = { ...product, quantity: 1 }; // Set quantity to 1
               localStorage.setItem('cart', JSON.stringify([...cart, productWithQuantity])); // Add product with quantity to local storage
               cartDispatch({
                    type: 'ADD_TO_CART',
                    payload : {product}
               })
          }
          else{
               navigate('/cart')
          } 

          
     }
     const fallbackImageUrl = "https://via.placeholder.com/150";

   
    let url = product.img || fallbackImageUrl;
    



    return(
        <div className="card card-vertical d-flex direction-column relative shadow">
     <div className="card-image-container">
          <img className="card-image" src={url} alt="shoes" />
     </div>
     <div className="card-details">
          <div className="card-des">{product.name}</div>
          <div className="card-description">
               
               <p className="card-price">
                  Rs. {product.price}
               </p>
          </div>
          <div className="cta-btn">
                
               <button onClick={()=>onCartClick(product)} className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
               <span className="material-symbols-outlined">
                    {
                         isProductInCart ? 'shopping_cart_checkout' : 'shopping_cart'
                    }
                  
                </span>
                    {
                         isProductInCart ? 'Go to cart' : 'Add To Cart'
                    }
                 
               </button>
          </div>
     </div>
</div>
    )
}

export default ProductCard