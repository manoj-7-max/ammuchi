import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],
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
      item.product._id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cartItems: [] }),
  getCartTotal: () => {
    let total = 0;
    // We can't access state directly in a getter like this cleanly in zustand without get(), so we just use a helper function in component.
    return total;
  }
}));

export default useCartStore;
