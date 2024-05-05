import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchItemId, setSearchItemId] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/lostItem/lost_item_list');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/lostItem/delete_lost_item/${id}`, {
        method: 'DELETE'
      });
      const response = await fetch('/api/lostItem/lost_item_list');
      const data = await response.json();
      setItems(data);
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

 

const handleGenerateReport = async () => {
  try {
    const itemsToInclude = filteredItems.map(item => {
      const { _id,__v, createdDate, updatedAt, createdAt, ...itemWithoutMeta } = item;
      return itemWithoutMeta;
    });

    const currentDate = new Date();
    const fileName = `lost_item_list_${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${currentDate.getDate()}`;

    if (window.confirm('Do you want to generate a PDF report? Click "Cancel" for CSV.')) {
      // Generate PDF report
      const doc = new jsPDF();
      doc.autoTable({
        head: [Object.keys(itemsToInclude[0])],
        body: itemsToInclude.map(item => Object.values(item)),
      });
      doc.save(`${fileName}.pdf`);
    } else {
      // Generate CSV report
      const columnWidths = {
        itemId: 55,
        itemName: 60,
        itemType:55,
        physicalQuantity:55,
        variance :55,
        description:55
      };

      const columnNames = Object.keys(itemsToInclude[0]).map(column => {
        const width = columnWidths[column] || column.length;
        return column.padEnd(width);
      }).join(',');

      const csvContent = itemsToInclude.map(item => {
        return Object.values(item).map((value, index) => {
          const column = Object.keys(item)[index];
          const width = columnWidths[column] || column.length;
          return String(value).padEnd(width);
        }).join(',');
      }).join('\n');

      const fullCsvContent = `${columnNames}\n${csvContent}`;

      const blob = new Blob([fullCsvContent], { type: 'text/csv;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error generating report:', error);
  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const filteredItems = items.filter(item => {
    const itemDate = new Date(item.createdDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    }

    return true;
  });

  const handleSearchByItemId = () => {
    if (searchItemId.trim() === '') {
      setItems(items);
    } else {
      const searchedItems = items.filter(item => item.itemId === searchItemId);
      setItems(searchedItems);
    }
  };

  const handleClearSearch = async () => {
    setSearchItemId('');

    try {
      const response = await fetch('/api/lostItem/lost_item_list');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className="p-8 w-3/4 mx-auto me-0 pt-4">
      <div className=" p-7 rounded-lg mt-44">
        <div className="flex flex-row justify-between"> 
          <div className="w-1/4">
            <h1 className="text-3xl font-bold mb-6">All lost Items</h1>
          </div>
          <div className="w-2/4 ">
            <input type="text" value={searchItemId} onChange={(e) => setSearchItemId(e.target.value)} placeholder="Search by Item ID" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 mr-1" />
            <button onClick={handleSearchByItemId} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
            <button onClick={handleClearSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1">
              Clear
            </button>
          </div>
          <div className="w-2/4 flex  mb-4">
            <div className="mr-2 ">
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ml-1" />
            </div>
            <div className="mr-2">
              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ml-1" />
            </div>
          </div>
        </div>
        <table className="w-3/4">
          <thead>
            <tr>
              <th className="border border-blue-500 px-4 py-2">Item ID</th>
              <th className="border border-blue-500 px-4 py-2">Item Name</th>
              <th className="border border-blue-500 px-4 py-2">Item Type</th>
              <th className="border border-blue-500 px-4 py-2">Physical Quantity</th>
              <th className="border border-blue-500 px-4 py-2">System Quantity</th>
              <th className="border border-blue-500 px-4 py-2">Variance</th>
              <th className="border border-blue-500 px-4 py-2">Description</th>
              <th className="border border-blue-500 px-4 py-2">Created Date</th>
              <th className="border border-blue-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td className="border border-blue-500 px-4 py-2">{item.itemId}</td>
                <td className="border border-blue-500 px-4 py-2">{item.itemName}</td>
                <td className="border border-blue-500 px-4 py-2">{item.itemType}</td>
                <td className="border border-blue-500 px-4 py-2">{item.physicalQuantity}</td>
                <td className="border border-blue-500 px-4 py-2">{item.systemQuantity}</td>
                <td className={`border border-blue-500 px-4 py-2 ${item.variance >= 0 ? 'text-green-500' : 'text-red-500'}`}>{item.variance}</td>
                <td className="border border-blue-500 px-4 py-2">{item.description}</td>
                <td className="border border-blue-500 px-4 py-2">{formatDate(item.createdDate)}</td>
                <td className="border border-blue-500 px-4 py-2 ">
                  <div className=' flex flex-row justify-between'>
                    <Link to={`/edit_lost_item/${item._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                      Update
                    </Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-start mt-5">
          <Link to="/add_lost_item" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Add item
          </Link>
          <button onClick={handleGenerateReport} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;