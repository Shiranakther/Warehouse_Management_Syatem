import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterWastageItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    itemCode: '',
    quantity: '',
    companyName: '',
    supplierId: '',
    damageOrExpired: 'damage', // Default value
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/wastes/createWaste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      navigate('/ViewWastageItem');
      const data = await response.json();
      if (response.status === 200) {
        
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 w-3/4 mx-auto me-0 pt-4">
       <div className="border border-blue-500 p-7 rounded-lg mt-44">
<h1 className="text-3xl font-bold mb-6">Enter Wastage Items</h1>
<div className="flex flex-row justify-center"> 
   <div className="w-2/4">
     
      <form className="mb-80 mt-20 pb-4 pt-5" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2">
         <b>Item name:</b> 
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="itemCode" className="block mb-2">
          <b>Items Code:</b>
        </label>
        <input
          type="text"
          id="itemCode"
          name="itemCode"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.itemCode}
          onChange={handleChange}
        />

        <label htmlFor="quantity" className="block mb-2">
         <b> Quantity:</b>
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.quantity}
          onChange={handleChange}
        />

        <label htmlFor="companyName" className="block mb-2">
          <b>Company Name:</b>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.companyName}
          onChange={handleChange}
        />

        <label htmlFor="supplierId" className="block mb-2">
          <b>Supplier Id:</b>
        </label>
        <input
          type="text"
          id="supplierId"
          name="supplierId"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.supplierId}
          onChange={handleChange}
        />

        <label htmlFor="damageOrExpired" className="block mb-2">
         <b>Select Damage Or Expired:</b> 
        </label>
        <select
          id="damageOrExpired"
          name="damageOrExpired"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.damageOrExpired}
          onChange={handleChange}
        >
          <option value="damage">Damage</option>
          <option value="expired">Expired</option>
        </select>

        <label htmlFor="reason" className="block mb-2">
          <b>Reason:</b>
        </label>
        <input
          type="text"
          id="reason"
          name="reason"
          className="block mb-3 px-14 py-10 border border-blue-500 rounded-md focus:outline-none focus:border-gray-300"
          value={formData.reason}
          onChange={handleChange}
        />

        <div className="">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-0 rounded-md focus:outline-none focus:bg-blue-600">
            Submit
          </button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 ml-8  rounded-md focus:outline-none focus:bg-red-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EnterWastageItem;
