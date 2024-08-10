

export const findProductInCart = (cart,id) => cart?.length > 0 && cart.some(product =>product.id === id);


//some basically checks if the ement of array satisfies the given condition or not, and returns true or false
//if the id matches, then this thing is inside the cart.