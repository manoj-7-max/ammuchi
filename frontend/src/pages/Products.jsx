import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import useCartStore from '../store/cartStore';

// Mock data for initial development
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Karuppu Ulundhu Health Mix',
    tamilName: 'கருப்பு உளுந்து கஞ்சி மிக்ஸ்',
    price: 250,
    category: 'Health Mixes',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    description: 'Traditional health mix with 20 grains.'
  },
  {
    _id: '2',
    name: 'Mappillai Samba Rice',
    tamilName: 'மாப்பிள்ளை சம்பா அரிசி',
    price: 180,
    category: 'Traditional Rice',
    image: 'https://images.unsplash.com/photo-1586201327693-d2899f84bc41?auto=format&fit=crop&w=400&q=80',
    description: 'Strengthening traditional rice variety.'
  },
  {
    _id: '3',
    name: 'Pearl Millet (Kambu)',
    tamilName: 'கம்பு',
    price: 90,
    category: 'Millets',
    image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=400&q=80',
    description: 'High protein millet for energy.'
  }
];

const Products = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const addToCart = useCartStore((state) => state.addToCart);

  const categories = ['All', 'Health Mixes', 'Millets', 'Traditional Rice', 'Pulses'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.tamilName.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-3xl font-bold text-amuchi-darkbrown">Our Products</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amuchi-green transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-full px-6 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-amuchi-green cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <Link to={`/product/${product._id}`}>
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amuchi-green text-white px-3 py-1 rounded-full text-xs font-bold">
                    Organic
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-amuchi-darkbrown">{product.name}</h3>
                    <p className="text-amuchi-brown font-tamil text-sm">{product.tamilName}</p>
                  </div>
                  <span className="text-xl font-bold text-amuchi-darkgreen">₹{product.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-amuchi-green hover:bg-amuchi-darkgreen text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
