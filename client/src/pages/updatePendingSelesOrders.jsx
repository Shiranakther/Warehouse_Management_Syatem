import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdatePendingSalesOrders() {
  const { id } = useParams();

  const [orderData, setOrderData] = useState(null);
  const [outlet, setOutlet] = useState('');
  const [orderId, setOrderId] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/order/getOrder/${id}`);
        setOrderData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (orderData) {
      setOutlet(orderData.Outlet || '');
      setOrderId(orderData.OrderID || '');
      setItemCode(orderData.ItemCode || '');
      setQuantity(orderData.Quantity || '');
    }
  }, [orderData]);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/order/updateOrder/${id}`, {
        Outlet: outlet,
        OrderID: orderId,
        ItemCode: itemCode,
        Quantity: quantity,
      });
      window.location.href = '/sales-orders';
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="">
      {error && <div>Error fetching data: {error.message}</div>}
      {orderData && (
        <div className="absolute flex h-screen justify-center w-9/12 ml-80 mt-14 bg-gray-300 z-0 pt-10">
          <div className="w-full max-w-3xl">
            <h1 className="absolute top-0 left-0 ml-10 mt-10">Update Pending Sales Orders</h1>

            <form className="bg-gray-300 pt-10" onSubmit={handleUpdateOrder}>
              <div className="mb-6">
                <label htmlFor="outlet" className="block text-sm font-medium text-gray-700">Select Outlet</label>
                <select
                  id="outlet"
                  name="outlet"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setOutlet(e.target.value)}
                  value={outlet}
                >
                  <option value="">Select Outlet</option>
                  <option value="outlet1">Outlet 1</option>
                  <option value="outlet2">Outlet 2</option>
                  <option value="outlet3">Outlet 3</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Order ID"
                  onChange={(e) => setOrderId(e.target.value)}
                  value={orderId}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700">Item Code</label>
                <input
                  type="text"
                  id="itemCode"
                  name="itemCode"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Item Code"
                  onChange={(e) => setItemCode(e.target.value)}
                  value={itemCode}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </div>

              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
