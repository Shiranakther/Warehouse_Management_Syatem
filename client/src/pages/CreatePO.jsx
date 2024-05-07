import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function CreatePO() {
  const [AllItems, getAllItems] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
      fetchItems();
    }, []);

    const fetchItems = async () => {
      try {
        setError(false);
        setLoading(true);
  
        const response = await fetch('/api/Item/getitem', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(AllItems)
        });
  
        const itemData = await response.json();
        getAllItems(itemData);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    
   
    const renderSelect = () => {
      return (
        <div className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-blue-100">
          <select
            value={formData.itemCode}
            onChange={handleChange2}
            className="w-full h-12   text-gray-700 font-roboto text-lg bg-transparent"
            required
          >
            <option value='' >Select Item</option>
            {AllItems.map((item) => (
              <option key={item.ItemID} value={item.ItemID} data-itemtype={item.ItemType}>
                {item.ItemID}
              </option>
            ))}
          </select>
          
        </div>
      );
    };
    
    // const handleChange2 = (e) => {
    //   const selectedOption = e.target.options[e.target.selectedIndex];
    //   const itemType = selectedOption.getAttribute('data-itemtype');
      
    //   setFormData({
    //     ...formData,
    //     itemCode: e.target.value,
    //     itemType: itemType
    //   });
    // };

    // const handleChange2 = (e) => {
    //   const selectedOption = e.target.options[e.target.selectedIndex];
    //   const itemName = selectedOption.text; // Get the item name from the selected option
    //   const itemType = selectedOption.getAttribute('data-itemtype');
    //   const supplierName = selectedOption.getAttribute('data-suppliername'); // Get the supplier name from the selected option
      
    //   setFormData({
    //     ...formData,
    //     itemCode: e.target.value,
    //     itemName: itemName, // Update itemName in formData with the selected item name
    //     supplierName: supplierName, // Update supplierName in formData with the selected supplier name
    //     itemType: itemType
    //   });
    // };
    
    const handleChange2 = (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const itemType = selectedOption.getAttribute('data-itemtype');
    
      // Get the selected item details
      const selectedItemId = e.target.value;
      const selectedItem = AllItems.find(item => item.ItemID === selectedItemId);
    
      // Update the formData state with the selected item details
      setFormData({
        ...formData,
        itemCode: selectedItemId,
        itemName: selectedItem ? selectedItem.ItemType : '',
        supplierName: selectedItem ? selectedItem.supplierName : '',
        orderQuentity: 1, // Assuming default order quantity is 1, change as needed
      });
    };
    
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  
     supplierName: '',
     itemCode: '',
     itemName: '',
     orderQuentity: 1,
   
  });
 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  

  const handleChange = (e) => {
     {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/update-po/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="mx-auto w-2/4 px-4 me-64 pt-20">
      <div className="text-gray-700 font-roboto text-4xl mb-8">
        New Purchase Order
        <div >
          {/* Render the select input */}
          
          
        </div>
      </div>
      {/* <form onSubmit={handleSubmit} className="flex flex-col">
        
       
        <div className="flex items-center mb-6">
          <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
          
          {renderSelect()}
        </div>

        <div className="flex items-center mb-6">
          <label htmlFor="itemname" className="text-red-500 w-48">Item Name</label>
          <input  type="text" id="itemName" name="itemName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.itemName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="supplierName" className="text-red-500 w-48" >Supplier Name</label>
          <input  type="text" id="supplierName" name="supplierName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          required
          
          onChange={handleChange}
          value={formData.supplierName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="orderQuentity" className="text-red-500 w-48">Order Quentity</label>
          <input  min='1' max='1000' type="Number" id="orderQuentity" name="orderQuentity" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          required
          
          onChange={handleChange}
          value={formData.orderQuentity}
          />
        </div>
       

        <div className="flex justify-between ml-64 mt-4">
          <button className="w-48 h-12 rounded-md bg-red-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-red-700 focus:outline-none">Save as Draft</button>
          <button className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"> {loading ? 'Creating...' : 'Create PO'}</button>
        </div>
      </form> */}
      <form onSubmit={handleSubmit} className="flex flex-col">
  <div className="flex items-center mb-6">
    <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
    {renderSelect()}
  </div>

  <div className="flex items-center mb-6">
    <label htmlFor="itemName" className="text-red-500 w-48">Item Name</label>
    <input 
      type="text" 
      id="itemName" 
      name="itemName" 
      className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
      required
      onChange={handleChange}
      value={formData.itemName} // Display the item name from the formData state
    />
  </div>

  <div className="flex items-center mb-6">
    <label htmlFor="supplierName" className="text-red-500 w-48">Supplier Name</label>
    <input 
      type="text" 
      id="supplierName" 
      name="supplierName" 
      className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
      required
      onChange={handleChange}
      value={formData.supplierName} // Display the supplier name from the formData state
    />
  </div>

  <div className="flex items-center mb-6">
    <label htmlFor="orderQuentity" className="text-red-500 w-48">Order Quantity</label>
    <input 
      min='1' 
      max='1000' 
      type="number" 
      id="orderQuentity" 
      name="orderQuentity" 
      className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
      required
      onChange={handleChange}
      value={formData.orderQuentity} // Display the order quantity from the formData state
    />
  </div>

  <div className="flex justify-between ml-64 mt-4">
    <button className="w-48 h-12 rounded-md bg-red-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-red-700 focus:outline-none">Save as Draft</button>
    <button className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"> {loading ? 'Creating...' : 'Create PO'}</button>
  </div>
</form>


      {/* Check Current Stock Section */}
     
    </div>
  );
}