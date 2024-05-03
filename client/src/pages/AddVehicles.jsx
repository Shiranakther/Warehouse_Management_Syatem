import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '../utils/Constants.js';

const AddVehicles = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        ownerName: '',
        manufacturedYear: '',
        brand: '',
        model: '',
        mileage: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const isLoggedin = await axios.post(`${apiUrl}/vehicle`, formData);
            if (isLoggedin) {
                toast.success('Vehicle Added Successfully!');
                navigate('/vehicles');
            }
        } catch (error) {
            if (error.message) {
                toast.error(error.message);
            }
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:max-w-md">
                <h1 className="text-3xl text-center mb-8">Add a Vehicle</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleNumber">
                            Vehicle Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="vehicleNumber"
                            name="vehicleNumber"
                            type="text"
                            placeholder="Vehicle Number"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerName">
                            Owner Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ownerName"
                            name="ownerName"
                            type="text"
                            placeholder="Owner Name"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturedYear">
                            Manufactured Year
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="manufacturedYear"
                            name="manufacturedYear"
                            type="text"
                            placeholder="Manufactured Year"
                            value={formData.manufacturedYear}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                            Brand
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="brand"
                            name="brand"
                            type="text"
                            placeholder="Brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                            Model
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="model"
                            name="model"
                            type="text"
                            placeholder="Model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
                            Mileage
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="mileage"
                            name="mileage"
                            type="text"
                            placeholder="Mileage"
                            value={formData.mileage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicles;
