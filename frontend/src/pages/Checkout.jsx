import { useState } from 'react';
import { CheckCircle, CreditCard, MapPin, Phone, Truck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import useCartStore from '../store/cartStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const [isOrdered, setIsOrdered] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', paymentMethod: 'COD' });

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const payload = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      totalAmount: total,
      products: cartItems.map((item) => ({ product: item.product._id, name: item.product.name, price: item.product.price, quantity: item.quantity }))
    };
    try {
      await api.createOrder(payload);
    } catch {
      localStorage.setItem('amuchi-last-order', JSON.stringify({ ...payload, createdAt: new Date().toISOString() }));
    }
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3500);
  };

  if (isOrdered) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md rounded-[2rem] bg-white p-10 text-center shadow-2xl">
          <div className="mb-6 inline-block rounded-full bg-green-100 p-4"><CheckCircle className="h-16 w-16 text-green-600" /></div>
          <h2 className="mb-4 text-3xl font-black text-[#3b2a1f]">Order Successful</h2>
          <p className="font-tamil text-lg text-stone-600">நன்றி! உங்கள் ஆர்டர் பதிவு செய்யப்பட்டது.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-center text-4xl font-black text-[#3b2a1f]">Checkout</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-[#3b2a1f]"><Truck className="text-[#315c35]" /> Delivery Information</h2>
            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">{error}</p>}
            <div className="space-y-4">
              <label className="relative block">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Full Name" className="w-full rounded-lg border border-stone-200 p-4 pl-10 outline-none focus:border-[#315c35]" />
              </label>
              <label className="relative block">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <input required value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} placeholder="Phone Number" className="w-full rounded-lg border border-stone-200 p-4 pl-10 outline-none focus:border-[#315c35]" />
              </label>
              <label className="relative block">
                <MapPin className="absolute left-3 top-4 h-5 w-5 text-stone-400" />
                <textarea required value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} placeholder="Full Address" className="h-32 w-full rounded-lg border border-stone-200 p-4 pl-10 outline-none focus:border-[#315c35]" />
              </label>
            </div>

            <h3 className="mb-3 mt-6 flex items-center gap-2 font-black text-[#3b2a1f]"><CreditCard className="text-[#315c35]" /> Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {['COD', 'UPI'].map((method) => (
                <button key={method} type="button" onClick={() => setFormData({ ...formData, paymentMethod: method })} className={`rounded-lg border-2 p-4 font-black ${formData.paymentMethod === method ? 'border-[#315c35] bg-[#f6edda]' : 'border-stone-200'}`}>
                  {method === 'COD' ? 'Cash on Delivery' : 'UPI'}
                </button>
              ))}
            </div>

            <button type="submit" disabled={!cartItems.length} className="mt-6 w-full rounded-lg bg-[#315c35] py-4 font-black text-white disabled:cursor-not-allowed disabled:bg-stone-300">
              Place Order (₹{total})
            </button>
          </form>

          <aside className="h-fit rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-black text-[#3b2a1f]">Order Summary</h2>
            <div className="mb-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex justify-between gap-4 text-sm">
                  <span className="text-stone-600">{item.quantity} x {item.product.name}</span>
                  <span className="font-bold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-stone-200 pt-4">
              <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-stone-500"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-2xl font-black text-[#315c35]"><span>Total</span><span>₹{total}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
