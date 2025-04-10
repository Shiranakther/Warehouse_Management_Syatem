import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Truck, Package, Users, AlertTriangle, ShoppingCart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Home({ userType }) {
  console.log("Home User type selected:", userType);

  // State declarations (ensure all are present)
  const [items, setItems] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Ensure this is defined
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          itemsRes,
          workersRes,
          vehiclesRes,
          shippingsRes,
          lostItemsRes,
          poRes,
        ] = await Promise.all([
          fetch('/api/Item/getitem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          }).then((res) => res.json()),
          axios.get('/api/staff/all').then((res) => res.data),
          axios.get('/api/vehicleRoutes').then((res) => res.data),
          axios.get('/api/shippingRoutes').then((res) => res.data),
          fetch('/api/lostItem/lost_item_list').then((res) => res.json()),
          fetch(`/api/user/listings/${userType === 'user' ? 'currentUserId' : ''}`).then((res) =>
            res.json()
          ),
        ]);

        setItems(itemsRes);
        setWorkers(workersRes);
        setVehicles(vehiclesRes);
        setShippings(shippingsRes);
        setLostItems(lostItemsRes);
        setPurchaseOrders(poRes);
        setLoading(false);
      } catch (err) {
        setError('Failed to load warehouse data');
        setLoading(false);
        console.error(err);
      }
    };
    fetchData();
  }, [userType]);

  // Calculate key metrics
  const totalItems = items.length;
  const totalStock = items.reduce((sum, item) => sum + (item.ItemNoOfUints || 0), 0);
  const totalWorkers = workers.length;
  const totalVehicles = vehicles.length;
  const shippingStatus = {
    pending: shippings.filter((s) => s.status === 'Pending').length,
    completed: shippings.filter((s) => s.status === 'Completed').length,
  };
  const totalLostItems = lostItems.length;
  const totalPOs = purchaseOrders.length;

  // Chart Data (unchanged)
  const stockChartData = {
    labels: items.slice(0, 5).map((item) => item.ItemID),
    datasets: [
      {
        label: 'Stock Levels (Units)',
        data: items.slice(0, 5).map((item) => item.ItemNoOfUints),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const shippingChartData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [shippingStatus.pending, shippingStatus.completed],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lostItemsChartData = {
    labels: lostItems.map((item) => new Date(item.createdDate).toLocaleDateString()),
    datasets: [
      {
        label: 'Lost Items Over Time',
        data: lostItems.map(() => 1),
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14, family: 'Inter' } } },
      title: { display: true, font: { size: 18, family: 'Inter', weight: '600' } },
    },
    maintainAspectRatio: false,
  };

  // Conditional rendering
  if (loading) return <div className="text-center p-10 text-gray-600 text-xl">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10 text-xl">{error}</div>;

  // Main UI
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="p-8 w-full ml-72">
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8 transition-all duration-300">
          <h1 className="text-3xl font-semibold tracking-tight text-center md:text-4xl">Chaminda WMS Dashboard</h1>
          <p className="text-center mt-2 text-blue-100 text-sm md:text-base">No 125, Mapatana, Horana | TP: 075 - 6175658</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
            <Package className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Items</h2>
              <p className="text-2xl font-bold text-blue-700">{totalItems}</p>
            </div>
          </div>
          {/* Other cards remain unchanged, just ensure all use proper syntax */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
            <Package className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Stock in Hand</h2>
              <p className="text-2xl font-bold text-blue-700">{totalStock} Units</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Workers</h2>
              <p className="text-2xl font-bold text-blue-700">{totalWorkers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
            <Truck className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Vehicles</h2>
              <p className="text-2xl font-bold text-blue-700">{totalVehicles}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Lost Items</h2>
              <p className="text-2xl font-bold text-red-600">{totalLostItems}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Purchase Orders</h2>
              <p className="text-2xl font-bold text-blue-700">{totalPOs}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md h-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock Levels (Top 5 Items)</h2>
            <Bar
              data={stockChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Stock Levels' } } }}
              height={300}
            />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md h-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Status</h2>
            <Pie
              data={shippingChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Shipping Status' } } }}
              height={300}
            />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2 h-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Lost Items Over Time</h2>
            <Line
              data={lostItemsChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Lost Items Trend' } } }}
              height={300}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/Item_main" className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-semibold">
              Items
            </Link>
            <Link to="/Workerlist" className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-semibold">
              Workers
            </Link>
            <Link to="/vehicleList" className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-semibold">
              Vehicles
            </Link>
            <Link to="/shippingList" className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-semibold">
              Shipping
            </Link>
            <Link to="/lost_item_list" className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-semibold">
              Lost Items
            </Link>
            <Link to="/display" className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-semibold">
              Purchase Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}