import { useEffect, useState } from 'react';
import { ArrowLeft, Leaf, Minus, Plus, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { getProductImage } from '../data/products';
import useCartStore from '../store/cartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    api.getProduct(id).then((data) => {
      setProduct(data);
      setActiveImage(getProductImage(data));
    });
  }, [id]);

  if (!product) return <div className="min-h-screen bg-stone-50 p-10 text-center">Loading product...</div>;

  const images = product.images?.length ? product.images : [getProductImage(product)];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 font-bold text-stone-500 transition hover:text-[#315c35]">
          <ArrowLeft className="h-5 w-5" /> Back to products
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-100 shadow-xl">
              <img src={activeImage} alt={product.name} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image) => (
                <button key={image} onClick={() => setActiveImage(image)} className={`overflow-hidden rounded-lg border-2 ${activeImage === image ? 'border-[#315c35]' : 'border-transparent'}`}>
                  <img src={image} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <div>
            <span className="mb-4 inline-flex rounded-full bg-[#f6edda] px-4 py-2 text-sm font-bold text-[#315c35]">{product.category}</span>
            <h1 className="mb-2 text-4xl font-black text-[#3b2a1f]">{product.name}</h1>
            <p className="mb-4 font-tamil text-2xl font-bold text-[#765239]">{product.tamilName}</p>
            <p className="mb-8 text-4xl font-black text-[#315c35]">₹{product.price}</p>

            <div className="mb-8 space-y-4 text-stone-700">
              <p className="leading-relaxed">{product.description}</p>
              <p className="border-l-4 border-[#315c35] bg-[#fffaf0] p-4 font-tamil text-lg leading-relaxed">
                {product.tamilDescription}
              </p>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-stone-200 p-5">
                <h3 className="mb-4 flex items-center gap-2 font-black text-[#3b2a1f]"><ShieldCheck className="h-5 w-5 text-[#315c35]" /> Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits?.map((benefit) => <li key={benefit} className="text-sm text-stone-600">✓ {benefit}</li>)}
                </ul>
              </div>
              <div className="rounded-lg border border-stone-200 p-5">
                <h3 className="mb-4 flex items-center gap-2 font-black text-[#3b2a1f]"><Leaf className="h-5 w-5 text-[#315c35]" /> Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients?.map((ingredient) => <span key={ingredient} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{ingredient}</span>)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row">
              <div className="flex items-center justify-between rounded-lg border border-stone-300 px-4 py-3 sm:w-40">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-5 w-5" /></button>
                <span className="text-lg font-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus className="h-5 w-5" /></button>
              </div>
              <button onClick={handleAddToCart} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#315c35] py-4 font-black text-white shadow-lg transition hover:bg-[#254729]">
                <ShoppingCart className="h-6 w-6" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
