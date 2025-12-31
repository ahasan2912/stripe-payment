import { useState } from 'react';
import Navbar from './Navbar';
import { products } from '../utils/products';
import axiosInstance from '../utils/axios';

const Products = () => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    }

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    const totalAmount = calculateTotal();

    const handlePayment = async () => {
        if (cart.length > 0) {
            const product = {
                name: "Cart Total",
                price: totalAmount,
            }
            const response = await axiosInstance.post('/create-checkout-session', { product: product });
            window.location.href = response.data.url;
        }
    }
    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            <Navbar totalAmount={totalAmount} />
            <div className='flex'>
                <div className="w-[80%] mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-500 mb-4">${product.price}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                <div disabled={`${cart?.length === 0}`}
                    onClick={handlePayment} className='w-[20%] mx-auto mt-6'>
                    <button
                        className={`px-6 py-2 text-white bg-blue-500 ${cart.length > 0 ? 'hover:bg-blue-700' : 'bg-gray-300'} rounded-md transition-all duration-300`}>
                        Payment Now {`(${totalAmount})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
