import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VehicleList() {
  const [vehicleList, setVehicleList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    setSearchResults(vehicleList); // Initialize searchResults with all vehicleList data
  }, [vehicleList]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('/api/vehicleRoutes');
      setVehicleList(response.data);
    } catch (error) {
      console.error('Error fetching vehicle list:', error);
      toast.error('Error fetching vehicles');
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
      if (confirmed) {
        await axios.delete(`/api/vehicleRoutes/${id}`);
        setVehicleList(vehicleList.filter((vehicle) => vehicle._id !== id));
        toast.success('Vehicle deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Error deleting vehicle');
    }
  };

  const handleSearch = () => {
    const results = vehicleList.filter((vehicle) => {
      // Check if the vehicle model or owner name contains the search term
      return (
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(vehicleList); // Reset searchResults to all vehicleList data
  };

  return (
    <div className='flex'>
      <div className="p-8 w-4/5 ml-72">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center mt-4 text-slate-500">Vehicle List</h1>
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Search by Model or Owner Name"
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
                <th className="py-2 px-4 border">Vehicle Number</th>
                <th className="py-2 px-4 border">Owner Name</th>
                <th className="py-2 px-4 border">Manufactured Year</th>
                <th className="py-2 px-4 border">Brand</th>
                <th className="py-2 px-4 border">Model</th>
                <th className="py-2 px-4 border">Mileage</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {searchResults.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">No data available</td>
                </tr>
              ) : (
                searchResults.map((vehicle, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="py-2 px-4 border">{vehicle.vehicleNumber}</td>
                    <td className="py-2 px-4 border">{vehicle.ownerName}</td>
                    <td className="py-2 px-4 border">{vehicle.manufacturedYear}</td>
                    <td className="py-2 px-4 border">{vehicle.brand}</td>
                    <td className="py-2 px-4 border">{vehicle.model}</td>
                    <td className="py-2 px-4 border">{vehicle.mileage}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex justify-between">
                        <Link to={`/updatevehicle/${vehicle._id}`}>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                        </Link>
                        <button className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDelete(vehicle._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Link to='/AddVehicles'>
            <div className="bg-slate-600 text-white p-1 rounded-lg uppercase hover:opacity-95 text-center mt-5 w-56 ml-0.5">Add A New Vehicle</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
