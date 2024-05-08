import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdatePO() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
 
  const [formData, setFormData] = useState({
  
    
    supplierName: '',
     itemCode: '',
     itemName: '',
     orderQuentity: '',
    
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);



  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
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
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
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
      navigate(`/display`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto pt-24 w-2/4 px-4 me-64">
      <div className="text-gray-700 font-roboto text-4xl mb-14 ml-56">
        Update Purchase Order
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        
        <div className="flex items-center mb-6">
          <label htmlFor="supplierName" className="text-red-500 w-48" >Supplier Name</label>
          <input  type="text" id="supplierName" name="supplierName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          required
          
          onChange={handleChange}
          value={formData.supplierName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
          <input   type="text" id="itemCode" name="itemCode" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.itemCode}
          />
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
          <label htmlFor="orderQuentity" className="text-red-500 w-48">Order Quentity</label>
          <input  min='1' max='1000' type="Number" id="orderQuentity" name="orderQuentity" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          required
          
          onChange={handleChange}
          value={formData.orderQuentity}
          />
        </div>
       

        <div className="flex justify-between ml-64 mt-4">
          <button className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"> {loading ? 'Updating...' : 'Update PO'}</button>
        </div>
      </form>

      {/* Check Current Stock Section */}
     
    </div>
  );
}


