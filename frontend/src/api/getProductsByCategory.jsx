export const getProductsByCategory =(products,cat) =>{
    return cat.toLowerCase()==='all' ? products : products?.length > 0 && products.filter(product => product.category.toLowerCase() === cat.toLowerCase());
}