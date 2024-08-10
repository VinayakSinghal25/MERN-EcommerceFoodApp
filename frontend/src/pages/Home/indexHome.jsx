import { Navbar } from "../../components/Navbar"
import { useEffect, useState } from "react"
import { getAllProducts } from "../../api/getAllProducts"
import { ProductCard } from "../../components/ProductCard/productCard"
import { useCart } from "../../context/cart-context"
import { getProductsByCategory } from "../../api/getProductsByCategory"

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
                const productCategories = [
                    { id: '1a', name: 'All' },
                    { id: '1b', name: 'Food' },
                    { id: '1c', name: 'Beverages' }
                ];
                setCategories(productCategories);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const onCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    const filterByCategory = getProductsByCategory(products, selectedCategory);

    return (
        <>
            <Navbar />

            <main className="pt-8">
                {/* Category bar */}
                <div className="flex justify-center mb-2">
                    <div className="flex gap-4 p-2 bg-gray-100 rounded-lg shadow">
                        {categories?.length > 0 ? (
                            categories.map(category => (
                                <div
                                    key={category.id}
                                    className={`font-semibold rounded p-2 cursor-pointer 
                                                ${selectedCategory === category.name ? 'bg-rose-600 text-white' : 'bg-white text-rose-600'} 
                                                flex justify-center items-center w-32`}
                                    onClick={() => onCategoryClick(category.name)}
                                >
                                    {category.name}
                                </div>
                            ))
                        ) : (
                            <h2 className="text-5xl">Loading...</h2>
                        )}
                    </div>
                </div>

                {/* Product grid */}
                <div className="flex flex-wrap gap-8 justify-center">
                    {filterByCategory?.length > 0 ? (
                        filterByCategory.map(product => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <h2>Food items of this category not available, try some other category!</h2>
                    )}
                </div>
            </main>
        </>
    )
}

export default Home;
