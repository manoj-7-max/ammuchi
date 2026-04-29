import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(persist((set, get) => ({
  cartItems: [],
  wishlist: [],
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cartItems.find(item => item.product._id === product._id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    }
    return { cartItems: [...state.cartItems, { product, quantity }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.product._id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.product._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ).filter(item => item.quantity > 0)
  })),
  clearCart: () => set({ cartItems: [] }),
  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.some(item => item._id === product._id);
    return { wishlist: exists ? state.wishlist.filter(item => item._id !== product._id) : [...state.wishlist, product] };
  }),
  isWishlisted: (productId) => get().wishlist.some(item => item._id === productId),
  getCartTotal: () => get().cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
}), { name: 'amuchi-cart' }));

export default useCartStore;
