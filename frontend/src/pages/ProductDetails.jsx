import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, ShieldCheck, Zap, Leaf } from 'lucide-react';
import useCartStore from '../store/cartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  // Mock product data (In real app, fetch from API using ID)
  const product = {
    _id: id,
    name: 'Karuppu Ulundhu Health Mix',
    tamilName: 'கருப்பு உளுந்து கஞ்சி மிக்ஸ்',
    price: 250,
    category: 'Health Mixes',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Our flagship Karuppu Ulundhu (Black Gram) Health Mix is a powerhouse of nutrition. Crafted using age-old traditional recipes, this mix combines the goodness of 20 different natural ingredients including sprouted pulses and traditional rice varieties.',
    tamilDescription: 'மாப்பிள்ளை சம்பா, கருப்பு கவுனி, பார்லி, சீரக சம்பா போன்ற 20 வகையான தானியங்களை கொண்டு பாரம்பரிய முறையில் தயாரிக்கப்பட்டது.',
    ingredients: [
      'Black Gram (Karuppu Ulundhu)',
      'Mappillai Samba Rice',
      'Karuppu Kavuni Rice',
      'Barley',
      'Seeraga Samba',
      'Green Gram',
      'Roasted Gram',
      'Cardamom',
      'Dry Ginger'
    ],
    benefits: [
      'High in Protein and Fiber',
      'Strengthens bones and muscles',
      'Natural energy booster',
      'Easy to digest',
      'Suitable for all ages'
    ]
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-amuchi-green mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="bg-amuchi-beige text-amuchi-darkbrown px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-amuchi-darkbrown mb-2">{product.name}</h1>
              <p className="text-2xl font-tamil text-amuchi-brown mb-4">{product.tamilName}</p>
              <p className="text-3xl font-bold text-amuchi-darkgreen">₹{product.price}</p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-700 font-tamil leading-relaxed italic border-l-4 border-amuchi-green pl-4">
                  "{product.tamilDescription}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-amuchi-green" />
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-amuchi-green font-bold">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-amuchi-green" />
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 flex items-center gap-6">
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-2xl text-gray-500"
                >-</button>
                <span className="px-6 font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-2xl text-gray-500"
                >+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-amuchi-green hover:bg-amuchi-darkgreen text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <ShoppingCart className="h-6 w-6" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
