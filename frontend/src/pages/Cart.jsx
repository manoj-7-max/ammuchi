import { Link } from 'react-router-dom';
import { Trash2, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-amuchi-beige p-8 rounded-full mb-6 inline-block">
            <ShoppingBag className="h-16 w-16 text-amuchi-green" />
          </div>
          <h2 className="text-3xl font-bold text-amuchi-darkbrown mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any of our healthy traditional mixes yet.</p>
          <Link to="/products" className="bg-amuchi-green text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-amuchi-darkgreen transition-colors inline-block">
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-amuchi-darkbrown mb-8 flex items-center gap-4">
          <ShoppingBag className="h-8 w-8" />
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                key={item.product._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 items-center border border-gray-100"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-amuchi-darkbrown">{item.product.name}</h3>
                  <p className="text-amuchi-brown font-tamil text-sm mb-2">{item.product.tamilName}</p>
                  <p className="text-amuchi-darkgreen font-bold">₹{item.product.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-50 transition-colors"
                    >-</button>
                    <span className="px-4 font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-50 transition-colors"
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="w-24 text-right hidden sm:block">
                  <p className="font-bold text-lg text-amuchi-darkbrown">₹{item.product.price * item.quantity}</p>
                </div>
              </motion.div>
            ))}
            
            <Link to="/products" className="inline-flex items-center text-amuchi-green font-semibold hover:gap-2 transition-all">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-amuchi-darkbrown mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amuchi-brown italic">Free shipping on orders above ₹500</p>
                )}
                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-xl text-amuchi-darkbrown">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-amuchi-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-amuchi-darkgreen transition-all"
              >
                Proceed to Checkout
                <ChevronRight className="h-5 w-5" />
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">COD Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
