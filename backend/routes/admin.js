const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Admin auth middleware check
const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied. Admin only.' });
  next();
};

// Add product
router.post('/products', auth, adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders
router.get('/orders', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.put('/orders/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Dashboard Analytics
router.get('/analytics', auth, adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('products.product');

    res.json({
      totalOrders,
      totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
