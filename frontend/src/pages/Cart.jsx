import { ArrowLeft, ChevronRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductImage } from '../data/products';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 rounded-full bg-[#f6edda] p-8">
          <ShoppingBag className="h-16 w-16 text-[#315c35]" />
        </div>
        <h2 className="mb-3 text-3xl font-black text-[#3b2a1f]">Your cart is empty</h2>
        <p className="mb-8 text-stone-500">Add a traditional health mix and start your order.</p>
        <Link to="/products" className="rounded-full bg-[#315c35] px-8 py-3 font-bold text-white">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-black text-[#3b2a1f]"><ShoppingBag /> Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {cartItems.map((item) => (
              <motion.div key={item.product._id} layout className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:grid-cols-[96px_1fr_auto_auto] sm:items-center">
                <img src={getProductImage(item.product)} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
                <div>
                  <h3 className="font-black text-[#3b2a1f]">{item.product.name}</h3>
                  <p className="font-tamil text-sm text-[#765239]">{item.product.tamilName}</p>
                  <p className="font-bold text-[#315c35]">₹{item.product.price}</p>
                </div>
                <div className="flex w-36 items-center justify-between rounded-lg border border-stone-200 px-3 py-2">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                  <span className="font-black">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <p className="text-lg font-black text-[#3b2a1f]">₹{item.product.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.product._id)} className="rounded-full p-2 text-red-500 hover:bg-red-50" title="Remove">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
            <Link to="/products" className="inline-flex items-center gap-2 font-bold text-[#315c35]">
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>
          </div>

          <aside className="h-fit rounded-lg border border-stone-200 bg-white p-6 shadow-lg lg:sticky lg:top-24">
            <h2 className="mb-6 text-xl font-black text-[#3b2a1f]">Order Summary</h2>
            <div className="mb-6 space-y-3 text-stone-600">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="border-t border-stone-200 pt-4 flex justify-between text-xl font-black text-[#315c35]"><span>Total</span><span>₹{total}</span></div>
            </div>
            <Link to="/checkout" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#315c35] py-4 font-black text-white hover:bg-[#254729]">
              Checkout <ChevronRight className="h-5 w-5" />
            </Link>
            <a href={`https://wa.me/919655493675?text=${encodeURIComponent(`I want to order from AMUCHI ORGANIC. Cart total: ₹${total}`)}`} className="mt-3 block rounded-lg border border-[#315c35] py-3 text-center font-bold text-[#315c35]">
              Order on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
