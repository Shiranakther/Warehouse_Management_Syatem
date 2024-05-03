import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;

export default function SalesOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/order/getAllOrders');
      const data = await response.json();
      setOrders(data); // Update state with fetched orders
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getOrders(); // Fetch orders when the component mounts
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await fetch(`http://localhost:3000/api/order/deleteOrder/${orderId}`, {
        method: 'DELETE',
      });
      // Refresh orders after delete
      getOrders();
    } catch (err) {
      console.error(err);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const generatePDFReport = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the columns for the PDF table
    const columns = ['Order ID', 'Outlet', 'Date', 'Status'];

    // Extract the data from the orders state and format the date
    const rows = orders.flatMap(orderGroup =>
      orderGroup.orders.map(order => [
        order.OrderID,
        order.Outlet,
        formatDate(order.createdAt), // Format the date here
        order.Status,
      ])
    );

    // Add the table to the PDF document using jspdf-autotable
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the PDF with a filename
    doc.save('sales_orders_report.pdf');
  }

  // Filter orders based on search query
  const filteredOrders = orders.filter(orderGroup =>
    orderGroup.orders.some(order =>
      order.OrderID.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search Order ID"
            className="border border-gray-300 px-4 py-2 rounded mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={generatePDFReport}
          >
            Generate Report
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Outlet</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(orderGroup => (
              orderGroup.orders.map((order, index) => (
                <tr key={order._id}>
                  {index === 0 && (
                    <td className="border border-gray-300 px-4 py-2" rowSpan={orderGroup.orders.length}>
                      {order.OrderID}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2">{order.Outlet}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDate(order.createdAt)}</td> {/* Format the date here */}
                  <td className="border border-gray-300 px-4 py-2">{order.Status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => window.location.href = `/update-pending-orders/${order._id}`}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
