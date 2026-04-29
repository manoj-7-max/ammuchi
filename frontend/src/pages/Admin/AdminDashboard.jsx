import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Edit, LayoutDashboard, LogOut, Package, Plus, Save, ShoppingBag, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { categories, sampleProducts } from '../../data/products';

const emptyProduct = {
  name: '',
  tamilName: '',
  price: 0,
  weight: '500g',
  category: 'Health Mixes',
  stock: 10,
  image: '',
  tamilDescription: '',
  description: '',
  ingredients: [],
  benefits: []
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState({ totalOrders: 0, totalSales: 0, recentOrders: [] });
  const [products, setProducts] = useState(sampleProducts);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(emptyProduct);
  const [message, setMessage] = useState('');

  const loadAdminData = async () => {
    try {
      const [analyticsData, productData, orderData, customerData] = await Promise.all([
        api.analytics(),
        api.adminProducts(),
        api.orders(),
        api.customers()
      ]);
      setAnalytics(analyticsData);
      setProducts(productData.length ? productData : sampleProducts);
      setOrders(orderData);
      setCustomers(customerData);
    } catch {
      setAnalytics({ totalOrders: 2, totalSales: 800, recentOrders: [] });
      setOrders([
        { _id: 'ORD001', customerName: 'Ravi Kumar', phone: '9999999999', totalAmount: 550, status: 'Pending', createdAt: '2026-04-28' },
        { _id: 'ORD002', customerName: 'Anitha S', phone: '8888888888', totalAmount: 250, status: 'Shipped', createdAt: '2026-04-29' }
      ]);
      setCustomers([{ name: 'Ravi Kumar', phone: '9999999999', orders: 1, totalSpent: 550 }]);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/admin');
      return undefined;
    }
    const timer = window.setTimeout(() => {
      loadAdminData();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  const stats = useMemo(() => [
    { label: 'Total Sales', value: `₹${analytics.totalSales || 0}`, icon: CheckCircle2 },
    { label: 'Orders', value: analytics.totalOrders || orders.length, icon: ShoppingBag },
    { label: 'Products', value: products.length, icon: Package },
    { label: 'Customers', value: customers.length, icon: Users }
  ], [analytics, orders.length, products.length, customers.length]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    const payload = {
      ...editing,
      images: editing.image ? [editing.image] : [],
      ingredients: Array.isArray(editing.ingredients) ? editing.ingredients : String(editing.ingredients).split(',').map((item) => item.trim()).filter(Boolean),
      benefits: Array.isArray(editing.benefits) ? editing.benefits : String(editing.benefits).split(',').map((item) => item.trim()).filter(Boolean)
    };
    try {
      await api.saveProduct(payload);
      setMessage('Product saved');
      setEditing(emptyProduct);
      loadAdminData();
    } catch {
      setProducts((current) => editing._id ? current.map((item) => item._id === editing._id ? { ...payload, _id: editing._id } : item) : [...current, { ...payload, _id: Date.now().toString() }]);
      setEditing(emptyProduct);
      setMessage('Product saved locally');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      loadAdminData();
    } catch {
      setProducts((current) => current.filter((product) => product._id !== id));
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status);
      loadAdminData();
    } catch {
      setOrders((current) => current.map((order) => order._id === id ? { ...order, status } : order));
    }
  };

  const tabs = [
    ['overview', LayoutDashboard, 'Overview'],
    ['products', Package, 'Products'],
    ['orders', ShoppingBag, 'Orders'],
    ['customers', Users, 'Customers']
  ];

  return (
    <div className="min-h-screen bg-stone-100 md:flex">
      <aside className="bg-[#3b2a1f] p-4 text-[#f4dfad] md:min-h-screen md:w-64">
        <h1 className="mb-8 px-3 text-xl font-black text-white">AMUCHI Admin</h1>
        <nav className="grid gap-2">
          {tabs.map(([id, Icon, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left font-bold ${activeTab === id ? 'bg-[#315c35] text-white' : 'hover:bg-white/10'}`}>
              <Icon className="h-5 w-5" /> {label}
            </button>
          ))}
          <button onClick={logout} className="mt-4 flex items-center gap-3 rounded-lg px-4 py-3 text-left font-bold text-red-200 hover:bg-white/10">
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-[#315c35]">Dashboard</p>
            <h2 className="text-3xl font-black capitalize text-[#3b2a1f]">{activeTab}</h2>
          </div>
          {message && <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">{message}</span>}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-lg bg-white p-5 shadow-sm">
                  <Icon className="mb-4 h-8 w-8 text-[#315c35]" />
                  <p className="text-sm font-bold text-stone-500">{label}</p>
                  <p className="text-3xl font-black text-[#3b2a1f]">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-black text-[#3b2a1f]">Recent Orders</h3>
              <OrderTable orders={orders.slice(0, 5)} updateStatus={updateStatus} />
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
            <form onSubmit={saveProduct} className="h-fit rounded-lg bg-white p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-[#3b2a1f]"><Plus /> {editing._id ? 'Edit Product' : 'Add Product'}</h3>
              <div className="grid gap-3">
                <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Product name" className="rounded-lg border p-3" />
                <input value={editing.tamilName} onChange={(e) => setEditing({ ...editing, tamilName: e.target.value })} placeholder="Tamil name" className="rounded-lg border p-3 font-tamil" />
                <div className="grid grid-cols-2 gap-3">
                  <input required type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} placeholder="Price" className="rounded-lg border p-3" />
                  <input value={editing.weight} onChange={(e) => setEditing({ ...editing, weight: e.target.value })} placeholder="Weight" className="rounded-lg border p-3" />
                </div>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="rounded-lg border p-3">
                  {categories.filter((category) => category !== 'All').map((category) => <option key={category}>{category}</option>)}
                </select>
                <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="Image URL" className="rounded-lg border p-3" />
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="English description" className="h-24 rounded-lg border p-3" />
                <textarea value={editing.tamilDescription} onChange={(e) => setEditing({ ...editing, tamilDescription: e.target.value })} placeholder="Tamil description" className="h-24 rounded-lg border p-3 font-tamil" />
                <input value={Array.isArray(editing.ingredients) ? editing.ingredients.join(', ') : editing.ingredients} onChange={(e) => setEditing({ ...editing, ingredients: e.target.value })} placeholder="Ingredients, comma separated" className="rounded-lg border p-3" />
                <input value={Array.isArray(editing.benefits) ? editing.benefits.join(', ') : editing.benefits} onChange={(e) => setEditing({ ...editing, benefits: e.target.value })} placeholder="Benefits, comma separated" className="rounded-lg border p-3" />
                <button className="flex items-center justify-center gap-2 rounded-lg bg-[#315c35] py-3 font-black text-white"><Save className="h-5 w-5" /> Save Product</button>
              </div>
            </form>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <ProductTable products={products} edit={setEditing} remove={deleteProduct} />
            </div>
          </div>
        )}

        {activeTab === 'orders' && <div className="rounded-lg bg-white p-5 shadow-sm"><OrderTable orders={orders} updateStatus={updateStatus} /></div>}

        {activeTab === 'customers' && (
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <table className="w-full min-w-[620px] text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-widest text-stone-500"><tr><th className="p-4">Name</th><th className="p-4">Phone</th><th className="p-4">Orders</th><th className="p-4">Total Spent</th></tr></thead>
              <tbody>{customers.map((customer) => <tr key={customer.phone} className="border-t"><td className="p-4 font-bold">{customer.name}</td><td className="p-4">{customer.phone}</td><td className="p-4">{customer.orders}</td><td className="p-4 font-bold text-[#315c35]">₹{customer.totalSpent}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

const ProductTable = ({ products, edit, remove }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] text-left">
      <thead className="bg-stone-50 text-xs uppercase tracking-widest text-stone-500"><tr><th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Actions</th></tr></thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="border-t">
            <td className="p-4"><p className="font-black text-[#3b2a1f]">{product.name}</p><p className="font-tamil text-sm text-stone-500">{product.tamilName}</p></td>
            <td className="p-4">{product.category}</td>
            <td className="p-4 font-bold text-[#315c35]">₹{product.price}</td>
            <td className="p-4">{product.stock || 0}</td>
            <td className="p-4"><button onClick={() => edit(product)} className="mr-2 rounded-lg bg-blue-50 p-2 text-blue-600"><Edit className="h-4 w-4" /></button><button onClick={() => remove(product._id)} className="rounded-lg bg-red-50 p-2 text-red-600"><Trash2 className="h-4 w-4" /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderTable = ({ orders, updateStatus }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] text-left">
      <thead className="bg-stone-50 text-xs uppercase tracking-widest text-stone-500"><tr><th className="p-4">Customer</th><th className="p-4">Phone</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Date</th></tr></thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-t">
            <td className="p-4 font-bold">{order.customerName || order.customer}</td>
            <td className="p-4">{order.phone || '-'}</td>
            <td className="p-4 font-bold text-[#315c35]">₹{order.totalAmount || order.total}</td>
            <td className="p-4"><select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="rounded-lg border p-2"><option>Pending</option><option>Shipped</option><option>Delivered</option></select></td>
            <td className="p-4">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
