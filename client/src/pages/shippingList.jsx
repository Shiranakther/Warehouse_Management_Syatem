import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShippingList() {
  const [shippingList, setShippingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchShippings();
  }, []);

  useEffect(() => {
    setSearchResults(shippingList); // Initialize searchResults with all shippingList data
  }, [shippingList]);

  const fetchShippings = async () => {
    try {
      const response = await axios.get('/api/shippingRoutes');
      setShippingList(response.data);
      // Extract order object ids from shippingList and fetch corresponding OrderIDs
      const orderIds = response.data.map(shipping => shipping.orderId);
      fetchOrders(orderIds);
    } catch (error) {
      console.error('Error fetching shipping list:', error);
      toast.error('Error fetching shippings');
    }
  };

  const fetchOrders = async (orderIds) => {
    try {
      const response = await axios.get('/api/order/getAllOrders', {
        params: { orderIds }
      });
      // Extract all orders from the response data
      const allOrders = response.data.map(item => item.orders).flat();
      setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this shipping?');
      if (confirmed) {
        await axios.delete(`/api/shippingRoutes/${id}`);
        setShippingList(shippingList.filter((shipping) => shipping._id !== id));
        toast.success('Shipping deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting shipping:', error);
      toast.error('Error deleting shipping');
    }
  };

  const handleSearch = () => {
    const results = shippingList.filter((shipping) => {
      // Check if the user name contains the search term
      return shipping.userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(shippingList); // Reset searchResults to all shippingList data
  };

  return (
    <div className='flex'>
      <div className="p-8 w-4/5 ml-72">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center mt-4 text-slate-500">Shipping List</h1>
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Search by User Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded-lg border-2 border-gray-300 mr-2 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
            <button onClick={clearSearch} className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Clear</button>
          </div>
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="bg-gray-200">
                
                <th className="py-2 px-4 border">Shipping ID</th>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">User Name</th>
                <th className="py-2 px-4 border">User Mobile</th>
                <th className="py-2 px-4 border">User Address</th>
                <th className="py-2 px-4 border">Vehicle</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {searchResults.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">No data available</td>
                </tr>
              ) : (
                searchResults.map((shipping, index) => {
                  const order = orders.find(order => order._id === shipping.orderId);
                  const orderId = order ? order.OrderID : '-';
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      
                      
                      <td className="py-2 px-4 border">{shipping.shippingId}</td>
                      <td className="py-2 px-4 border">{orderId}</td>
                      <td className="py-2 px-4 border">{shipping.userName}</td>
                      <td className="py-2 px-4 border">{shipping.userMobile}</td>
                      <td className="py-2 px-4 border">{shipping.userAddress}</td>
                      <td className="py-2 px-4 border">{shipping.vehicle ? shipping.vehicle.model : '-'}</td>
                      <td className="py-2 px-4 border">{shipping.status}</td>
                      <td className="py-2 px-4 border">
                        <div className="flex justify-between">
                          <Link to={`/updateShipping/${shipping._id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                          </Link>
                          <button className="bg-red-500 text-white px-3 py-1 rounded  hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDelete(shipping._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Link to='/AddShipping'>
            <div className="bg-slate-600 text-white p-1 rounded-lg uppercase hover:opacity-95 text-center mt-5 w-56 ml-0.5">Add A New Shipping</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
