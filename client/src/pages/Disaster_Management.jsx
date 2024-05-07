import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterDisaster_Management = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    telephoneno: '',
    whatapp: '',
    email: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation for all fields
    if (!formData.name || !formData.telephoneno || !formData.whatapp || !formData.email || !formData.reason ) {
      console.log("Please fill out all fields.");
      
      return;
    }
    // Additional validation for telephone
    if (isNaN(formData.telephoneno) || parseInt(formData.telephoneno) <= 0) {
      console.log("Telephone No must be a positive number.");
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/returns/createReturn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      navigate('/ViewreturnItemsDetails');
      alert('Add Return Item Successfully');
      const data = await response.json();
      if (response.status === 200) {
        // Handle success if needed
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto w-2/4 px-4 me-64 pt-20">
      <div className="text-gray-700 font-roboto text-4xl mb-8 ">
        Disaster Management
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex items-center mb-6">
          <label htmlFor="name" className="text-red-500 w-48">please of name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="telephoneno" className="text-red-500 w-48">Telephone No</label>
          <input
            type="text"
            id="telephoneno"
            name="telephoneno"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.telephoneno}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="whatapp" className="text-red-500 w-48">What App</label>
          <input
            type="text"
            id="whatapp"
            name="whatapp"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.whatapp}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="email" className="text-red-500 w-48">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="reason" className="text-red-500 w-48">Reason </label>
          <input
            type="text"
            id="reason"
            name="reason"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.reason}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-between ml-64 mt-4">
          <button
            type="submit"
            className="w-48 h-12 rounded-md bg-red-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-red-700 focus:outline-none"
          >
            Submit
          </button>
          <button
            type="button"
            className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Disaster_Management;
