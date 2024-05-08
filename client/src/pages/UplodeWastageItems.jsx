import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UplodeWastageItems = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    itemCode: '',
    quantity: '',
    companyName: '',
    supplierId: '',
    reason: '',
  });

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    axios.get(`http://localhost:3000/api/wastes/getWaste/${id}`)
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
      const response = await fetch(`http://localhost:3000/api/wastes/updateWaste/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        navigate('/ViewWastageItem');
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
    Uplode Wastage Items
    <div >
     {/* Render the select input */}
     
     
  </div>
 </div>




      <form className="mb-80 mt-0 pb-4 pt-5" onSubmit={handleSubmit}>


      <div className="flex items-center mb-6">
       <label htmlFor="name" className="text-red-500 w-48" >Item Name</label>
        <input  type="text" id="name" name="name" 
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
        required
        
        value={formData.name}
        onChange={handleChange}
         />
       </div>




       <div className="flex items-center mb-6">
       <label htmlFor="itemCode" className="text-red-500 w-48" >Item Code</label>
        <input  type="text" id="itemCode" name="itemCode" 
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
        required
        
        value={formData.itemCode}
        onChange={handleChange}
         />
       </div>



       <div className="flex items-center mb-6">
       <label htmlFor="quantity" className="text-red-500 w-48" >Quantity</label>
        <input  type="text" id="quantity" name="quantity" 
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
        required
        
        value={formData.quantity}
        onChange={handleChange}
         />
       </div>


    

       <div className="flex items-center mb-6">
       <label htmlFor="companyName" className="text-red-500 w-48" >Company Name</label>
        <input  type="text" id="companyName" name="companyName" 
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
        required
        
        value={formData.companyName}
        onChange={handleChange}
         />
       </div>


    

      <div className="flex items-center mb-6">
       <label htmlFor="supplierId" className="text-red-500 w-48" >Supplier Id:</label>
        <input  type="text" id="supplierId" name="supplierId" 
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
        required
        
        value={formData.supplierId}
        onChange={handleChange}
         />
       </div>



        <div className="flex items-center mb-6">
       <label htmlFor="supplierId" className="text-red-500 w-48" >Reason:</label>
        <input  type="text" id="reason" name="reason" 
        className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
        required
        
        value={formData.reason}
        onChange={handleChange}
         />
       </div>



          <div className="flex justify-between ml-64 mt-4">
          <button type="submit" className="w-48 h-12 rounded-md bg-red-600 text-white font-roboto font-semibold text-lg cursor-pointer
          hover:bg-red-700 focus:outline-none">
            Submit
          </button>
          <button type="button" className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer
          hover:bg-green-700 focus:outline-none ml-5">
            Cancel  
          </button>
        </div>


      </form>
    </div>
 
  );
};

export default UplodeWastageItems;
