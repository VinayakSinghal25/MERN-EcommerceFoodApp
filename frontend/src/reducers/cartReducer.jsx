export const cartReducer=(state, {type,payload})=>{
    switch(type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [
                    ...state.cart,
                    { ...payload.product, quantity: 1 }
                ]
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(product => product.id !== payload.id)
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === payload.id 
                        ? { ...item, quantity: item.quantity + payload.quantity }
                        : item
                )
            };   
        default:
            return state;    
    };
}
