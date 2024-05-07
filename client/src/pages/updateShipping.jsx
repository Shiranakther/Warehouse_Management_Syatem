import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateShipping() {
  const { shippingId } = useParams(); // Extracting shippingId from URL params
  const [formData, setFormData] = useState({
    shippingId: '', 
    orderId: '', 
    userName: '',
    userMobile: '',
    userAddress: '',
    vehicle: '', 
    status: 'In Progress',
  });
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const res = await axios.get(`/api/shippingRoutes/${shippingId}`);
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching shipping:', error);
        toast.error('Error fetching shipping');
      }
    };
    fetchShipping();

    const fetchVehicles = async () => {
      try {
        const res = await axios.get('/api/vehicleRoutes/');
        setVehicles(res.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Error fetching vehicles');
      }
    };
    fetchVehicles();

    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/order/getAllOrders');
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders');
      }
    };
    fetchOrders();
  }, [shippingId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/shippingRoutes/${shippingId}`, formData);
      console.log(res);
      const data = res.data;
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='flex'>
      <div className='p-3 max-w-lg mx-auto mt-16 mr-96 w-3/5'>
        <h1 className="text-3xl font-bold mb-10 text-center text-slate-500">Update Shipping</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
  type="text"
  placeholder='Shipping ID'
  id='shippingId'
  className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.shippingId ? 'cursor-not-allowed opacity-50' : ''}`}
  value={formData.shippingId}
  onChange={handleChange}
  autoComplete="current-shippingId"
  required
  disabled={formData.shippingId}
/>

<select
  id='orderId'
  className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.orderId ? 'cursor-not-allowed opacity-50' : ''}`}
  value={formData.orderId}
  onChange={handleChange}
  autoComplete="current-orderId"
  required
  disabled={formData.orderId}
>
  <option value="" disabled>Select Order</option>
  {orders[0]?.orders.map((order) => (
    <option key={order._id} value={order._id}>{order.OrderID}</option>
  ))}
</select>

<input
            type="text"
            placeholder='User Name'
            id='userName'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.userName}
            onChange={handleChange}
            autoComplete="current-userName"
            required
          />

          <input
            type="text"
            placeholder='User Mobile'
            id='userMobile'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.userMobile}
            onChange={handleChange}
            autoComplete="current-userMobile"
            required
          />

<input
  type="text"
  placeholder='User Address'
  id='userAddress'
  className={`bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 ${formData.userAddress ? 'cursor-not-allowed opacity-50' : ''}`}
  value={formData.userAddress}
  onChange={handleChange}
  autoComplete="current-userAddress"
  required
  disabled={formData.userAddress}
/>


          <select
            id='vehicle'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.vehicle}
            onChange={handleChange}
            autoComplete="current-vehicle"
            required
          >
            <option value="" disabled>Select Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>{vehicle.model}</option>
            ))}
          </select>

          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            {loading ? 'Loading...' : 'Update Shipping'}
          </button>
        </form>

        {error && <p className="text-red-700 mt-5">{error}</p>}

        <Link to='/ShippingList'>
          <div className="bg-slate-600 text-white p-1 rounded-lg uppercase hover:opacity-95 text-center mt-5 w-32 ml-0.5">Shipping List</div>
        </Link>
      </div>
    </div>
  );
}
