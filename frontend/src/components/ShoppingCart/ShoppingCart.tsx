import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeProduct } from "../../shoppingCartSlice";
import HorizontalLine from "../../images/horizontal-image.svg";
import LeaveProductCart from '../../images/leave-product-cart.svg';
import DeleteProduct from '../../images/view-product-details.svg';
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

type ShoppingCartProps = {
    setShowShoppingCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ShoppingCart({ setShowShoppingCart }: ShoppingCartProps): JSX.Element {
    const { products } = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch();

    const handleRemoveProduct = (sku: string) => {
        dispatch(removeProduct(sku));
    };
    
    return (
        <div className="z-50 fixed right-0 top-0 w-screen h-screen bg-gray-400 bg-opacity-50 flex justify-end">
            <div className="absolute inset-0 bg-gray-400 bg-opacity-50 pointer-events-none" />
            <div className="relative flex flex-col h-[25rem] w-[20rem] md:h-[20rem] md:w-[28rem] lg:h-[30rem] lg:w-[27rem] bg-white z-30 p-4">
                <div className="flex items-center justify-between">
                    <p className="font-medium mb-6 ml-3 text-base md:font-semibold md:text-md lg:font-bold lg:text-lg">Shopping Cart</p>
                    <img
                        src={LeaveProductCart}
                        onClick={() => setShowShoppingCart(prev => !prev)}
                        className="mb-6 md:mr-11"
                        alt="Leave Shopping Cart"
                    />
                </div>
                <img className="ml-3 w-44 md:w-72" src={HorizontalLine} alt="Horizontal Line" />
                <div className="flex-1 overflow-y-auto">
                    {products.map(product => (
                        <div key={product.sku} className="flex items-center justify-center mt-4">
                            <img className="w-16 h-16 object-cover" src={product.image} alt={product.name} />
                            <div className="mx-9 flex flex-col items-start justify-center">
                                <p className="text-sm md:text-base lg:text-lg font-semibold">{product.name}</p>
                                <p className="text-xs md:text-sm lg:text-base font-light">
                                    {product.quantity} X <span className="text-[#b88e2f]">{formatPrice(product.price)}</span>
                                </p>
                            </div>
                            <div className="flex items-center w-1/12 justify-center">
                                <img
                                    className="w-2 h-2 md:w-5 md:h-5 cursor-pointer"
                                    onClick={() => handleRemoveProduct(product.sku)}
                                    src={DeleteProduct}
                                    alt="Delete Product"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex w-full justify-around p-4">
                    <Link className="bg-white border-2 text-center border-black w-20 h-8 md:w-28 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-md transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2" to="/cart">
                        Cart
                    </Link>
                    <Link className="bg-white border-2 text-center border-black w-20 h-8 md:w-28 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-md transition-colors  hover:bg-gray-200 focus:outline-none focus:ring-2" to="/checkout">
                        Checkout
                    </Link>
                    <Link className="bg-white border-2 text-center border-black w-20 md:w-32 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-md transition-colors  hover:bg-gray-200 focus:outline-none focus:ring-2" to="/comparasion">
                        Comparison
                    </Link>
                </div>

            </div>
        </div>
    );
}
