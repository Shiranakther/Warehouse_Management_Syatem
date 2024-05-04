import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function UpdateVehicle() {
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

  const { vehicleId } = useParams();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`/api/vehicleRoutes/${vehicleId}`);
        if (response.data) {
          setFormData(response.data); // Update formData with vehicle details
        } else {
          console.error('Empty response data');
        }
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
        setError(error.message || 'Error fetching vehicle details');
      }
    };
  
    fetchVehicleDetails();
  }, [vehicleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/api/vehicleRoutes/${vehicleId}`, formData);
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      setError(error.message || 'Error updating vehicle');
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
        <h1 className='text-3xl text-center font-semibold my-7 mb-11 text-slate-500'>Update Vehicle</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-5'>
          <input type="text" placeholder='Vehicle Number' id='vehicleNumber' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.vehicleNumber} onChange={handleChange} required />
          <input type="text" placeholder='Owner Name' id='ownerName' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.ownerName} onChange={handleChange} required />
          <input type="text" placeholder='Manufactured Year' id='manufacturedYear' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.manufacturedYear} onChange={handleChange} required />
          <input type="text" placeholder='Brand' id='brand' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.brand} onChange={handleChange} required />
          <input type="text" placeholder='Model' id='model' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.model} onChange={handleChange} required />
          <input type="text" placeholder='Mileage' id='mileage' className='bg-slate-100 p-3 rounded-lg border-2 border-zinc-400' value={formData.mileage} onChange={handleChange} required />
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        {error && <p className="text-red-700 mt-5">{error}</p>}
      </div>
    </div>
  );
}
