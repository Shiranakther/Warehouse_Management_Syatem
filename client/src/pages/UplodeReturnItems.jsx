import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UplodeReturnItems = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    itemCode: '',
    quantity: '',
    companyName: '',
    supplierId: '',
    damageOrExpired: '', // Default value
    reason: '',
  });

  useEffect(() => {
    const Id = window.location.pathname.split('/')[2];
    axios.get(`http://localhost:8000/api/returns/getReturn/${Id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/returns/updateReturn/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        navigate('/ViewreturnItemsDetails');
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
   
    <div className="p-3 w-3/4 mx-auto me-0 pt-14">
       <div className="border border-blue-500 p-8 rounded-lg mt-4">


            <h1 className="text-3xl font-bold mb-6">Uplode Return Items.</h1>

           <div className="flex flex-row justify-center "> 
         <form className="mb-20 ml-40 mt-20 pb-4 pt-5" onSubmit={handleSubmit}>
         <label htmlFor="name" className="block mb-2">
         <b>Item name:</b> 
         </label>
         <input
          type="text"
          id="name"
          name="name"
          className="block mb-4 px-16 py-4 border border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="itemCode" className="block mb-2">
         <b>Item Code:</b> 
        </label>
        <input
          type="text"
          id="itemCode"
          name="itemCode"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
          value={formData.itemCode}
          onChange={handleChange}
        />

        <label htmlFor="quantity" className="block mb-2">
         <b>Quantity:</b> 
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          className="block mb-4 px-16 py-4 border border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
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
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
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
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
          value={formData.supplierId}
          onChange={handleChange}
        />

        <label htmlFor="damageOrExpired" className="block mb-2">
          <b>Select Damage Or Expired:</b>
        </label>
        <select
          id="damageOrExpired"
          name="damageOrExpired"
          className="block mb-4 px-16 py-4 border  border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
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
          className="block mb-3 px-16 py-10 border  border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
          value={formData.reason}
          onChange={handleChange}
        />

        <div className="">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md  focus:bg-blue-600 ml-0">
            Submit
          </button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md  focus:bg-red-600 ml-6">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
     //</div>
  );
};

export default UplodeReturnItems;




