import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewreturnItemsDetails = () => {
  const [returnItems, setReturnItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getReturnItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/returns/getAllReturns');
        const data = await response.json();
        setReturnItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    getReturnItems();
  }, []);

  const deleteReturnItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/returns/deleteReturn/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.status === 200) {
        setReturnItems(returnItems.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleGenerateReport = async () => {
    try {
      const doc = new jsPDF();
      doc.autoTable({
        head: [["Item name", "Item code", "Quantity", "Company name", "Supplier ID", "Damage or expired", "Reason"]],
        body: returnItems.map(item => [item.name, item.itemCode, item.quantity, item.companyName, item.supplierId, item.damageOrExpired, item.reason]),
      });
      doc.save("return_items_report.pdf");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    const filteredItems = returnItems.filter(item => {
      // Check if any property of the item includes the search query
      return Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setReturnItems(filteredItems);
  };

  const handleClearSearch = async () => {
    setSearchQuery('');
  
    // Restore all items by fetching them again from the API
    try {
      const response = await fetch('http://localhost:3000/api/returns/getAllReturns');
      const data = await response.json();
      setReturnItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="p-8 w-3/4 mx-auto me-0 pt-4">
      <div className="border border-blue-500 p-7 rounded-lg mt-44">
        <div className="flex flex-row justify-between"> 
          <div className="w-1/4">
            <h1 className="text-3xl font-bold mb-6">View Return Items</h1>
          </div>
          <div className="w-2/4">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search items" 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" 
            />
            <button 
              onClick={handleSearch} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-0 rounded ml-1"
            >
              Search
            </button>
            
          </div>
        </div>
        <button 
               
               onClick={handleClearSearch} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-0 rounded ml-1"
            >
              Clear
            </button>
        <h1 className="absolute top-0 left-0 ml-10 mt-10">Return items details</h1>
        <table className="mt-20">
          <thead>
            <tr>
              <th className="border px-4 py-2">Item name</th>
              <th className="border px-4 py-2">Item code</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Company name</th>
              <th className="border px-4 py-2">Supplier ID</th>
              <th className="border px-4 py-2">Damage or expired</th>
              <th className="border px-4 py-2">Reason</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {returnItems.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.itemCode}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.companyName}</td>
                <td className="border px-4 py-2">{item.supplierId}</td>
                <td className="border px-4 py-2">{item.damageOrExpired}</td>
                <td className="border px-4 py-2">{item.reason}</td>
                <td className="border px-4 py-2 w-60">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      window.location.href = `/UplodeReturnItems/${item._id}`;
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => deleteReturnItem(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6"
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ViewreturnItemsDetails;
