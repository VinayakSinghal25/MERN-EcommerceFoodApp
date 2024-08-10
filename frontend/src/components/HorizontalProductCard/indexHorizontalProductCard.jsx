import { useCart } from "../../context/cart-context"


export const HorizontalProductCard = ({product})=>{

    const {cartDispatch} = useCart();
    const onRemoveClick = (product) =>{
        let items = JSON.parse(localStorage.getItem("cart"));
        let filteredData = items.filter(pro => pro.id!== product.id);
        localStorage.setItem("cart"  , JSON.stringify(filteredData))
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            payload : {id: product.id}
        })
    }
    const updateQuantity = (product, quantity) => {
        if (product.quantity === 1 && quantity === -1) {
            // If the quantity is 1 and decrement is clicked, remove the item
            onRemoveClick(product);
        } else {
            let items = JSON.parse(localStorage.getItem("cart"));
            items = items.map(pro => {
                if (pro.id === product.id) {
                    return { ...pro, quantity: pro.quantity + quantity }
                }
                return pro;
            });
            localStorage.setItem("cart", JSON.stringify(items));
            cartDispatch({
                type: 'UPDATE_QUANTITY',
                payload: { id: product.id, quantity }
            });
        }
    }

    return (

        <div className="card-horizontal d-flex shadow">
     <div className="card-hori-image-container relative">
          <img className="card-image" src={product.img} alt="shoes" />
     </div>
     <div className="card-details d-flex direction-column">
          <div className="card-des">{product.name}</div>
          <div className="card-description">
               <p className="card-price">Rs. {product.price}</p>
          </div>
          <div className="quantity-container d-flex gap">
                    <p className="q-title">Quantity: </p>
                    <div className="count-container d-flex align-center gap">
                        <button 
                            className="count" 
                            onClick={() => updateQuantity(product, -1)}
                        >-</button>
                        <span className="count-value">{product.quantity}</span>
                        <button 
                            className="count" 
                            onClick={() => updateQuantity(product, 1)}
                        >+</button>
                    </div>
                </div>
          <div className="cta-btn d-flex gap">
               <div className="cta-btn">
                   <button onClick={() => onRemoveClick(product)} className="button hori-btn btn-primary btn-icon d-flex align-center 
                   justify-center gap cursor btn-margin"> Remove From Cart</button>
               </div>
               {/* <div className="cta-btn">
                   <button className="button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                   Move to Wishlist</button>
                </div> */}
          </div>
     </div>
</div>
    )
}