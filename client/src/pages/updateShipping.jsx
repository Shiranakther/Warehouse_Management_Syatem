import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function updateShipping() {
  const [formData, setFormData] = useState({
    userName: '',
    userMobile: '',
    userAddress: '',
    vehicle: '',
    status: 'In Progress'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { shippingId } = useParams();

  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const response = await axios.get(`/api/shippingRoutes/${shippingId}`);
        if (response.data) {
          setFormData(response.data); // Update formData with shipping details
        } else {
          console.error('Empty response data');
        }
      } catch (error) {
        console.error('Error fetching shipping details:', error);
        setError(error.message || 'Error fetching shipping details');
      }
    };
  
    fetchShippingDetails();
  }, [shippingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/api/shippingRoutes/${shippingId}`, formData);
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error('Error updating shipping:', error);
      setError(error.message || 'Error updating shipping');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  return (
    <div className='flex'>
      <div className='p-3 max-w-lg mx-auto mt-10 mr-96 w-3/5'>
        <h1 className='text-3xl text-center font-semibold my-7 mb-11 text-slate-500'>Update Shipping</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-5'>
          <input type="text" placeholder='User Name' id='userName' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.userName} onChange={handleChange} required />
          <input type="text" placeholder='User Mobile' id='userMobile' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.userMobile} onChange={handleChange} required />
          <input type="text" placeholder='User Address' id='userAddress' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.userAddress} onChange={handleChange} required />
          <input type="text" placeholder='Vehicle' id='vehicle' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.vehicle} onChange={handleChange} required />
          <input type="text" placeholder='Status' id='status' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.status} onChange={handleChange} required />
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        {error && <p className="text-red-700 mt-5">{error}</p>}
      </div>
    </div>
  );
}
