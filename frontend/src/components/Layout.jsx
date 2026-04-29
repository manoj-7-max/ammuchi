import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useCartStore from '../store/cartStore';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-amuchi-green text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold font-tamil tracking-wide">
              அமுச்சி Organic
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="hover:text-amuchi-beige transition-colors">Home</Link>
              <Link to="/products" className="hover:text-amuchi-beige transition-colors">Products</Link>
              <Link to="/about" className="hover:text-amuchi-beige transition-colors">About</Link>
              <Link to="/contact" className="hover:text-amuchi-beige transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-amuchi-darkgreen px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-amuchi-green">Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-amuchi-green">Products</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-amuchi-green">About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-amuchi-green">Contact</Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-amuchi-darkbrown text-amuchi-beige py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold font-tamil mb-4">அமுச்சி Organic</h3>
            <p className="text-sm">Bringing back traditional healthy mixes and authentic tastes to your home. No chemicals, 100% natural.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Phone: 9655493675 / 9047484721</p>
            <p className="text-sm">FSSAI: 22425296000143</p>
          </div>
        </div>
        <div className="text-center text-sm mt-8 pt-8 border-t border-gray-600">
          &copy; {new Date().getFullYear()} Amuchi Organic. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
