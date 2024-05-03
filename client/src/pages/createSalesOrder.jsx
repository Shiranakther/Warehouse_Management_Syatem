import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CreateSalesOrder() {
  const [Outlet, setOutlet] = useState('');
  const [OrderID, setOrderID] = useState('');
  const [ItemCode, setItemCode] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [AllItems, setAllItems] = useState([]);
 
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/Item/getitem', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(AllItems)
      });
      const itemData = await response.json();
      setAllItems(itemData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSelect = () => {
    return (
      <select
        value={ItemCode}
        onChange={(e) => setItemCode(e.target.value)}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value=''>Select Item Code</option>
        {AllItems.map((item) => (
          <option key={item.ItemID} value={item.ItemID}>
            {item.ItemID}
          </option>
        ))}
      </select>
    );
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrder = { Outlet, OrderID, ItemCode, Quantity };
      await axios.post('http://localhost:3000/api/order/createOrder', newOrder);
      alert('Order Created');

      // Add the new order item to the orderItems state
      setOrderItems([...orderItems, newOrder]);

      // Clear input fields after submitting
      setOutlet('');
      setOrderID('');
      setItemCode('');
      setQuantity('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOrder = async () => {
    setOutlet('');
    setOrderID('');
    setItemCode('');
    setQuantity('');
    setOrderItems([]);
  }
  return (
    <div className="absolute flex h-screen justify-center w-9/12 ml-80 mt-14 bg-gray-300 z-0 pt-10">
      <div className="w-full max-w-3xl">
        <h1 className="absolute top-0 left-0 ml-10 mt-10">Create Sales Orders</h1>
        

        <form className="bg-gray-300 pt-10" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="outlet" className="block text-sm font-medium text-gray-700">Select Outlet</label>
            <select id="outlet" name="outlet" className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => setOutlet(e.target.value)}>
              <option value="">Select Outlet</option>
              <option value="outlet1">Outlet 1(Horana)</option>
              <option value="outlet2">Outlet 2(Kaduwela)</option>
              <option value="outlet3">Outlet 3(Mathugama)</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input type="text" id="orderId" name="orderId" className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Order ID" onChange={(e) => setOrderID(e.target.value)} value={OrderID} />
          </div>

          <div className="mb-6">
            <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700">Enter Item Code</label>
            {renderSelect()}
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Enter Quantity</label>
            <input type="number" id="quantity" name="quantity" className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} value={Quantity} />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600 mr-4">Add Item</button>
          </div>
        </form>

        <table className="w-full mt-8 mb-8">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-200">NO</th>
              <th className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-200">Item Code</th>
              <th className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-200">Item Name</th>
              <th className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-200">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((order, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">{order.ItemCode}</td>
                <td className="px-4 py-2 border border-gray-300">Item Name</td>
                <td className="px-4 py-2 border border-gray-300">{order.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between">
          <button 
          type="button" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600 mr-4"
          onClick={handleCreateOrder}
          >Create Order</button>
        </div>
      </div>
    </div>
  );
}


