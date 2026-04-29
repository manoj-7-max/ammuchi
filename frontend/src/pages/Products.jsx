import { useEffect, useMemo, useState } from 'react';
import { Filter, Heart, Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { categories, getProductImage } from '../data/products';
import useCartStore from '../store/cartStore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isWishlisted = useCartStore((state) => state.isWishlisted);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = `${product.name} ${product.tamilName || ''}`.toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = Number(product.price) <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, maxPrice]);

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 font-bold uppercase tracking-[0.2em] text-[#315c35]">Shop traditional nutrition</p>
          <h1 className="text-4xl font-black text-[#3b2a1f]">Products</h1>
        </div>

        <div className="mb-8 grid gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search health mix, millets, rice..."
              className="w-full rounded-lg border border-stone-200 py-3 pl-10 pr-4 outline-none focus:border-[#315c35]"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border border-stone-200 bg-white px-4 py-3 pr-10 outline-none focus:border-[#315c35] lg:w-56"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <Filter className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-stone-200 px-4 py-2">
            <span className="whitespace-nowrap text-sm font-bold text-stone-600">Up to ₹{maxPrice}</span>
            <input type="range" min="80" max="600" step="10" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <motion.article
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:shadow-xl"
            >
              <Link to={`/product/${product._id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={getProductImage(product)} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#315c35] px-3 py-1 text-xs font-bold text-white">{product.category}</span>
                </div>
              </Link>
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-[#3b2a1f]">{product.name}</h3>
                    <p className="font-tamil text-sm text-[#765239]">{product.tamilName}</p>
                  </div>
                  <button onClick={() => toggleWishlist(product)} className={`rounded-full p-2 ${isWishlisted(product._id) ? 'bg-red-50 text-red-500' : 'bg-stone-100 text-stone-500'}`} title="Wishlist">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <p className="mb-4 line-clamp-2 min-h-10 text-sm text-stone-600">{product.description}</p>
                <div className="mb-4 flex items-end justify-between">
                  <span className="text-2xl font-black text-[#315c35]">₹{product.price}</span>
                  <span className="text-sm font-semibold text-stone-500">{product.weight}</span>
                </div>
                <button onClick={() => addToCart(product)} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#315c35] py-3 font-bold text-white transition hover:bg-[#254729]">
                  <ShoppingBag className="h-5 w-5" /> Add to Cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-lg bg-white p-12 text-center text-stone-500 shadow-sm">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Products;
