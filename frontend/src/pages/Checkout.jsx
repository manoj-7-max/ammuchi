import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, User, MapPin, Phone } from 'lucide-react';
import useCartStore from '../store/cartStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'COD'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, send to backend API
    console.log('Order submitted:', { ...formData, products: cartItems, totalAmount: total });
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 5000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full"
        >
          <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-amuchi-darkbrown mb-4">Order Successful!</h2>
          <p className="text-gray-500 mb-8 font-tamil text-lg">நன்றி! உங்கள் ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது.</p>
          <p className="text-sm text-gray-400 mb-6 italic">You will be redirected to home in 5 seconds...</p>
          <button 
            onClick={() => { clearCart(); navigate('/'); }}
            className="w-full bg-amuchi-green text-white py-3 rounded-xl font-bold"
          >
            Go Home Now
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-amuchi-darkbrown mb-12 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <h2 className="text-xl font-bold text-amuchi-darkbrown mb-8 flex items-center gap-2">
              <Truck className="h-6 w-6 text-amuchi-green" />
              Delivery Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  required
                  placeholder="Full Name" 
                  className="pl-10 w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amuchi-green"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="tel" 
                  required
                  placeholder="Phone Number" 
                  className="pl-10 w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amuchi-green"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-4 text-gray-400 h-5 w-5" />
                <textarea 
                  required
                  placeholder="Full Address" 
                  className="pl-10 w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amuchi-green h-32"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-amuchi-darkbrown mb-4 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-amuchi-green" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'COD' ? 'border-amuchi-green bg-green-50' : 'border-gray-100 hover:bg-gray-50'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'COD'})}
                  >
                    <span className="font-bold text-amuchi-darkbrown">Cash on Delivery</span>
                    <span className="text-xs text-gray-400 uppercase">COD</span>
                  </button>
                  <button 
                    type="button"
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'UPI' ? 'border-amuchi-green bg-green-50' : 'border-gray-100 hover:bg-gray-50'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'UPI'})}
                  >
                    <span className="font-bold text-amuchi-darkbrown">UPI Payment</span>
                    <span className="text-xs text-gray-400 uppercase">Instant</span>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-amuchi-green text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-amuchi-darkgreen transition-all transform hover:scale-[1.02] active:scale-95"
              >
                Place Order (₹{total})
              </button>
            </form>
          </motion.div>

          {/* Order Summary Recap */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-amuchi-darkbrown mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{item.quantity}x</span>
                      <span className="text-gray-600 truncate max-w-[200px]">{item.product.name}</span>
                    </div>
                    <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-amuchi-darkgreen pt-2">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <div className="bg-amuchi-darkbrown p-6 rounded-3xl text-amuchi-beige">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amuchi-green" />
                Trusted Traditonal Quality
              </h3>
              <p className="text-xs opacity-70 italic font-tamil">
                நமது அனைத்து தயாரிப்புகளும் எந்தவித கலப்படமுமின்றி பாரம்பரிய முறையில் தயாரிக்கப்பட்டவை.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
);

export default Checkout;
