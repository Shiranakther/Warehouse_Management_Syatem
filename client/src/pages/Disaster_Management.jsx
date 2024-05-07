


import React, { useState } from 'react';

const Disaster_Management = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephoneNo: '',
    whatsapp: '',
    gmail: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/disaster/createdisaster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success if needed
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (




    <div className="mx-auto w-2/4 px-4 me-64 pt-20">
       <div className="text-gray-700 font-roboto text-4xl  mb-8  ">
       
        Disaster Management
      </div>
    
      
      <form className="flex flex-col" onSubmit={handleSubmit}>

      <div className="flex items-center mb-6">
           <label htmlFor="name" className="text-red-500 w-48">Name:</label>
           <input
            type="text"
            id="name"             name="name"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.name}
             onChange={handleChange}
         />
        </div>


        <div className="flex items-center mb-6">
           <label htmlFor="name" className="text-red-500 w-48">Telephone Number:</label>
           <input
            type="text"
            id="telephoneNo"             name="telephoneNo"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.telephoneNo} 
            onChange={handleChange}
         />
        </div>

        <div className="flex items-center mb-6">
           <label htmlFor="name" className="text-red-500 w-48">WhatsApp:</label>
           <input
            type="text"
            id="whatsapp"             name="whatsapp"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.whatsapp} 
            onChange={handleChange}
         />
        </div>

        <div className="flex items-center mb-6">
           <label htmlFor="name" className="text-red-500 w-48">Gmail:</label>
           <input
            type="text"
            id="gmail"             name="gmail"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.gmail}
             onChange={handleChange}
         />
        </div>

        <div className="flex items-center mb-6">
           <label htmlFor="name" className="text-red-500 w-48">Reason:</label>
           <input
            type="text"
            id="reason"             name="reason"
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
}

export default Disaster_Management;

