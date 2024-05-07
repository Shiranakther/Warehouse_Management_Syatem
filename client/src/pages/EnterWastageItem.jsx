// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const EnterWastageItem = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     itemCode: '',
//     quantity: '',
//     companyName: '',
//     supplierId: '',
//     // damageOrExpired: 'damage', // Default value
//     reason: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/api/wastes/createWaste', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       navigate('/ViewWastageItem');
//       const data = await response.json();
//       if (response.status === 200) {
        
//       } else {
//         console.log(data);
//       }
//     } catch (err) {
//       console.log(err);
//     }





//     const handleSearch = () => {
//       const filteredItems = returnItems.filter(item => {
//         // Check if any property of the item includes the search query
//         return Object.values(item).some(val =>
//           val.toString().toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       });
//       setReturnItems(filteredItems);
//     };
  
//     const handleClearSearch = async () => {
//       setSearchQuery('');
    
//       // Restore all items by fetching them again from the API
//       try {
//         const response = await fetch('http://localhost:3000/api/returns/getAllReturns');
//         const data = await response.json();
//         setReturnItems(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };




    
//   };


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const EnterWastageItem = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     itemCode: '',
//     quantity: '',
//     companyName: '',
//     supplierId: '',
//     reason: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation checks
//     if (!formData.name || !formData.itemCode || !formData.quantity || !formData.companyName || !formData.supplierId || !formData.reason) {
//       console.log("Please fill out all fields.");
//       return;
//     }
//     if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
//       console.log("Quantity must be a positive number.");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3000/api/wastes/createWaste', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       navigate('/ViewWastageItem');
//       const data = await response.json();
//       if (response.status === 200) {
//         // Handle success if needed
//       } else {
//         console.log(data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   return (
//     <div className="mx-auto w-2/4 px-4 me-64 pt-20">
//     <div className="text-gray-700 font-roboto text-4xl mb-8 ">
//     Enter Wastage Items
//     </div>

//       <form className="mb-80 mt-20 pb-4 pt-5" onSubmit={handleSubmit}>


// <div className="flex items-center mb-6">
//           <label htmlFor="name" className="text-red-500 w-48">Item Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
//             required
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>





//           <div className="flex items-center mb-6">
//           <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
//           <input
//             type="text"
//             id="itemCode"
//             name="itemCode"
//             className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
//             required
//             value={formData.itemCode}
//             onChange={handleChange}
//           />
//         </div>




// <div className="flex items-center mb-6">
//           <label htmlFor="quantity" className="text-red-500 w-48">Quantity</label>
//           <input
//             type="text"
//             id="quantity"
//             name="quantity"
//             className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
//             required
//             value={formData.quantity}
//             onChange={handleChange}
//           />
//         </div>


        


// <div className="flex items-center mb-6">
//           <label htmlFor="companyName" className="text-red-500 w-48">Company Name</label>
//           <input
//             type="text"
//             id="companyName"
//             name="companyName"
//             className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
//             required
//             value={formData.companyName}
//             onChange={handleChange}
//           />
//         </div>
      
      
      

//          <div className="flex items-center mb-6">
//           <label htmlFor="supplierId" className="text-red-500 w-48">Supplier Id</label>
//           <input
//             type="text"
//             id="supplierId"
//             name="supplierId"
//             className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
//             required
//             value={formData.supplierId}
//             onChange={handleChange}
//           />
//         </div>


  

      
      

//          <div className="flex items-center mb-6">
//           <label htmlFor="reason" className="text-red-500 w-48">Reason</label>
//           <input
//             type="text"
//             id="reason"
//             name="reason"
//             className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
//             required
//             value={formData.reason}
//             onChange={handleChange}
//           />
//         </div>

       
       

// <div className="flex justify-between ml-64 mt-4">
//           <button
//             type="submit"
//             className="w-48 h-12 rounded-md bg-red-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-red-700 focus:outline-none"
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
    
   
    
//   );
// };

// export default EnterWastageItem;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterWastageItem = () => {
  const navigate = useNavigate();
  const [AllItems, getAllItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    itemCode: '',
    quantity: '',
    companyName: '',
    supplierId: '',
    reason: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/Item/getitem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(AllItems)
      });

      const itemData = await response.json();
      getAllItems(itemData);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    const selectedItem = AllItems.find(item => item.ItemID === formData.itemCode);
    if (selectedItem) {
      setFormData(prevFormData => ({
        ...prevFormData,
        name: selectedItem.ItemType
      }));
    }
  }, [formData.itemCode, AllItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!formData.name || !formData.itemCode || !formData.quantity || !formData.companyName || !formData.supplierId || !formData.reason) {
      console.log("Please fill out all fields.");
      return;
    }
    if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      console.log("Quantity must be a positive number.");
      return;
    }

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
      <div className="text-gray-700 font-roboto text-4xl mb-8">
        Enter Wastage Items
      </div>
      <form className="mb-80 mt-20 pb-4 pt-5" onSubmit={handleSubmit}>
        <div className="flex items-center mb-6">
          <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
          <select
            id="itemCode"
            name="itemCode"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.itemCode}
            onChange={handleChange}
          >
            <option value=''>Select Item Code</option>
            {AllItems.map((item) => (
              <option key={item.ItemID} value={item.ItemID}>
                {item.ItemID}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="name" className="text-red-500 w-48">Item Name</label>
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
          <label htmlFor="quantity" className="text-red-500 w-48">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="companyName" className="text-red-500 w-48">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="supplierId" className="text-red-500 w-48">Supplier Id</label>
          <input
            type="text"
            id="supplierId"
            name="supplierId"
            className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
            required
            value={formData.supplierId}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="reason" className="text-red-500 w-48">Reason</label>
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

export default EnterWastageItem;
