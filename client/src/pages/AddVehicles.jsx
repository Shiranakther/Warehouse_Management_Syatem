import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    ownerName: '',
    manufacturedYear: '',
    brand: '',
    model: '',
    mileage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/vehicleRoutes/add', formData); // Adjust API endpoint as needed
      const data = res.data;
      toast.success(data.message);
      setFormData({
        vehicleNumber: '',
        ownerName: '',
        manufacturedYear: '',
        brand: '',
        model: '',
        mileage: ''
      });
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
        <h1 className="text-3xl font-bold mb-10 text-center text-slate-500">Add Vehicle</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder='Vehicle Number'
            id='vehicleNumber'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.vehicleNumber}
            onChange={handleChange}
            autoComplete="current-vehicleNumber"
            required
          />

          <input
            type="text"
            placeholder='Owner Name'
            id='ownerName'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.ownerName}
            onChange={handleChange}
            autoComplete="current-ownerName"
            required
          />

          <input
            type="number"
            placeholder='Manufactured Year'
            id='manufacturedYear'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.manufacturedYear}
            onChange={handleChange}
            autoComplete="current-manufacturedYear"
            required
          />

          <input
            type="text"
            placeholder='Brand'
            id='brand'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.brand}
            onChange={handleChange}
            autoComplete="current-brand"
            required
          />

          <input
            type="text"
            placeholder='Model'
            id='model'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.model}
            onChange={handleChange}
            autoComplete="current-model"
            required
          />

          <input
            type="number"
            placeholder='Mileage'
            id='mileage'
            className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400 mb-3'
            value={formData.mileage}
            onChange={handleChange}
            autoComplete="current-mileage"
            required
          />

          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            {loading ? 'Loading...' : 'Add Vehicle'}
          </button>
        </form>
        {error && <p className="text-red-700 mt-5">{error}</p>}

        <Link to='/VehicleList'>
          <div className="bg-slate-600 text-white p-1 rounded-lg uppercase hover:opacity-95 text-center mt-5 w-32 ml-0.5">Vehicle List</div>
        </Link>
      </div>
    </div>
  );
}
