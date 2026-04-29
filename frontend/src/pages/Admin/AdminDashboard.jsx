import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    { _id: '1', name: 'Karuppu Ulundhu Mix', price: 250, category: 'Health Mixes', stock: 45 },
    { _id: '2', name: 'Mappillai Samba Rice', price: 180, category: 'Rice', stock: 20 }
  ]);
  const [orders, setOrders] = useState([
    { _id: 'ORD001', customer: 'Ravi Kumar', total: 550, status: 'Pending', date: '2026-04-28' },
    { _id: 'ORD002', customer: 'Anitha S', total: 250, status: 'Shipped', date: '2026-04-29' }
  ]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-amuchi-darkbrown text-amuchi-beige hidden md:flex flex-col">
        <div className="p-8">
          <h1 className="text-xl font-bold font-tamil text-white">அமுச்சி Admin</h1>
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-amuchi-green text-white shadow-lg' : 'hover:bg-white/5'}`}
          >
            <LayoutDashboard className="h-5 w-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-amuchi-green text-white shadow-lg' : 'hover:bg-white/5'}`}
          >
            <Package className="h-5 w-5" /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-amuchi-green text-white shadow-lg' : 'hover:bg-white/5'}`}
          >
            <ShoppingBag className="h-5 w-5" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'customers' ? 'bg-amuchi-green text-white shadow-lg' : 'hover:bg-white/5'}`}
          >
            <Users className="h-5 w-5" /> Customers
          </button>
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white h-20 shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Global search..." className="bg-gray-50 border border-gray-100 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amuchi-green" />
            </div>
            <div className="w-10 h-10 bg-amuchi-green rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Sales', value: '₹45,200', icon: <TrendingUp />, color: 'bg-green-500' },
                  { label: 'Total Orders', value: '124', icon: <ShoppingBag />, color: 'bg-blue-500' },
                  { label: 'Products', value: '18', icon: <Package />, color: 'bg-purple-500' },
                  { label: 'New Customers', value: '32', icon: <Users />, color: 'bg-orange-500' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>{stat.icon}</div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-6">Recent Orders</h3>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{order.customer}</p>
                            <p className="text-xs text-gray-400">{order._id} • {order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amuchi-darkgreen">₹{order.total}</p>
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${order.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-6">Store Performance</h3>
                  <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <TrendingUp className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-sm">Real-time charts will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Product Management</h3>
                <button className="bg-amuchi-green text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-amuchi-darkgreen transition-all shadow-md">
                  <Plus className="h-4 w-4" /> Add Product
                </button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800">{p.name}</td>
                      <td className="px-6 py-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{p.category}</span></td>
                      <td className="px-6 py-4 text-amuchi-darkgreen font-semibold">₹{p.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${p.stock < 25 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          {p.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit className="h-4 w-4" /></button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(activeTab === 'orders' || activeTab === 'customers') && (
            <div className="bg-white p-20 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
               <div className="bg-gray-50 p-6 rounded-full mb-6">
                 <Settings className="h-12 w-12 text-gray-300 animate-spin-slow" />
               </div>
               <h3 className="text-xl font-bold text-gray-800">Advanced Management</h3>
               <p className="text-gray-500 mt-2">This feature is being connected to the MongoDB backend.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
