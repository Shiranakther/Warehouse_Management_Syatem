
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

// Register Chart.js components
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

  // State for data
  const [items, setItems] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on mount
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
          ), // Replace 'currentUserId' with actual ID logic
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

  // Chart Data
  const stockChartData = {
    labels: items.slice(0, 5).map((item) => item.ItemID), // Top 5 items
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
        data: lostItems.map(() => 1), // Count per date
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;

  return (
    <div className='flex'>
      <div className="p-8 w-full ml-72">
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold text-center">Chaminda WMS Dashboard</h1>
        <p className="text-center mt-2">No 125, Mapatana, Horana | TP: 075 - 6175658</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Items</h2>
          <p className="text-3xl font-bold text-blue-600">{totalItems}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Stock in Hand</h2>
          <p className="text-3xl font-bold text-blue-600">{totalStock} Units</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Workers</h2>
          <p className="text-3xl font-bold text-blue-600">{totalWorkers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Vehicles</h2>
          <p className="text-3xl font-bold text-blue-600">{totalVehicles}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Lost Items</h2>
          <p className="text-3xl font-bold text-red-600">{totalLostItems}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Purchase Orders</h2>
          <p className="text-3xl font-bold text-blue-600">{totalPOs}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Levels Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock Levels (Top 5 Items)</h2>
          <Bar
            data={stockChartData}
            options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Stock Levels' } } }}
          />
        </div>

        {/* Shipping Status Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Status</h2>
          <Pie
            data={shippingChartData}
            options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Shipping Status' } } }}
          />
        </div>

        {/* Lost Items Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lost Items Over Time</h2>
          <Line
            data={lostItemsChartData}
            options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Lost Items Trend' } } }}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/Item_main" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Items
          </Link>
          <Link to="/Workerlist" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Workers
          </Link>
          <Link to="/vehicleList" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Vehicles
          </Link>
          <Link to="/shippingList" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Shipping
          </Link>
          <Link to="/lost_item_list" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Lost Items
          </Link>
          <Link to="/display" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Purchase Orders
          </Link>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
