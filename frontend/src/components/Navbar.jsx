
const Navbar = ({ totalAmount }) => {

    return (
        <nav className="bg-blue-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                <h1 className="text-2xl font-bold">Mini E-commerce</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-lg">Cart: {totalAmount} items</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;