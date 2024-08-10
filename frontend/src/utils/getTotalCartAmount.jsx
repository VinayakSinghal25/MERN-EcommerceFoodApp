//export const getTotalCartAmount = (cart) => cart?.length > 0 && cart.reduce((acc,curr)=> acc + curr.price , 0)
export const getTotalCartAmount = (cart) => {
    const totalAmount = cart?.length > 0 
        ? cart.reduce((acc, curr) => {
            const quantity = curr.quantity || 1;  // Default quantity to 1 if undefined
            return acc + (curr.price * quantity);
        }, 0) 
        : 0;
    return totalAmount.toFixed(2);
};