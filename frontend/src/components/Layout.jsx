import { useState } from 'react';
import { Heart, Menu, Phone, ShoppingCart, X } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const navItems = [
  ['/', 'Home'],
  ['/products', 'Products'],
  ['/about', 'About'],
  ['/contact', 'Contact']
];

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const wishlist = useCartStore((state) => state.wishlist);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-[#315c35]/95 text-white shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f4dfad] text-lg font-black text-[#315c35]">A</span>
              <span>
                <span className="block text-lg font-black tracking-wide">AMUCHI ORGANIC</span>
                <span className="block font-tamil text-[11px] text-[#f4dfad]">அமுச்சி ஆர்கானிக்</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white text-[#315c35]' : 'text-white/85 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="https://wa.me/919655493675" className="hidden rounded-full bg-[#f4dfad] px-4 py-2 text-sm font-bold text-[#315c35] sm:inline-flex">
                WhatsApp Order
              </a>
              <Link to="/products" className="relative hidden sm:block" title="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#d97706] text-[10px]">{wishlist.length}</span>}
              </Link>
              <Link to="/cart" className="relative" title="Cart">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d97706] text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="space-y-1 bg-[#254729] px-4 py-4 md:hidden">
            {navItems.map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-3 py-3 font-semibold hover:bg-white/10">
                {label}
              </Link>
            ))}
            <a href="https://wa.me/919655493675" className="block rounded-lg px-3 py-3 font-semibold text-[#f4dfad]">
              WhatsApp Order
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#3b2a1f] py-12 text-[#f4dfad]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xl font-black">AMUCHI ORGANIC</h3>
            <p className="font-tamil text-sm">பாரம்பரிய சத்து உணவுகளை உங்கள் வீட்டுக்கு நேரடியாக கொண்டு வருகிறோம்.</p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <p className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> 9655493675 / 9047484721</p>
            <p className="mt-2 text-sm">FSSAI: 22425296000143</p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Admin</h4>
            <Link to="/admin" className="text-sm underline-offset-4 hover:underline">Dashboard Login</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-white/15 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Amuchi Organic. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
