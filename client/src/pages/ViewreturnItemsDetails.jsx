
import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

  const ViewreturnItemsDetails = () => {
  const [returnItems, setReturnItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

    const formatDate = (date) => {
    const createdAtDate = new Date(date);
    const formattedDate = createdAtDate.toLocaleDateString();
   return formattedDate;
  };

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
      
      // Add header and footer




      // Add header border
      doc.setDrawColor(0); // Set border color to black
      doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, 40); // Draw header border with increased height
  
      // Add header content
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 255); // Set color to blue
      doc.text('Chaminda Stores', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Reset color to black
      doc.setFontSize(10);
      doc.setTextColor(130,130,130); // Set color to blue
      doc.text('No 125, Mapatana, Horana', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
      doc.setFontSize(10);
      doc.text('TP : 075 - 6175658', doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });
  
      // Add current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
      const formattedTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });
      const dateTimeText = 'Date: ' + formattedDate + ' Time: ' + formattedTime;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Set color to black
      doc.text(dateTimeText, 104, 40, { align: 'center' }); // Adjust the position as needed
  
      // Add document border
      doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10); // Draw document border

      // Add title with underline
     doc.setFontSize(16);
     doc.setDrawColor(0); // Set140,140 underline color to black

     doc.textWithLink('Return Item Report', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center', url: 'javascript:void(0)', underline: true }); // Adjust the vertical position

        // Add footer
        doc.setFontSize(10);
        doc.setTextColor(255, 0, 0); // Set color to red
        doc.text('Keep this report Confidential', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

      
      doc.autoTable({
        startY: 70,
        head: [["Item name", "Item code", "Quantity", "Company name", "Supplier ID", "Damage or expired", "Reason", "Created Date", "Updated Date"]],
        body: returnItems.map(item => [item.name, item.itemCode, item.quantity, item.companyName, item.supplierId, item.damageOrExpired, item.reason, formatDate(item.createdAt), formatDate(item.updatedAt)]),
      });
      doc.save("return_items_report.pdf");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    const filteredItems = returnItems.filter(item => {
      return Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setReturnItems(filteredItems);
  };

  const handleClearSearch = async () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
  
    try {
      const response = await fetch('http://localhost:3000/api/returns/getAllReturns');
      const data = await response.json();
      setReturnItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterByDate = () => {
    const filteredItems = returnItems.filter(item => {
      const itemDate = new Date(item.createdAt); // Change to updatedAt if needed
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return itemDate >= start && itemDate <= end;
      } else if (start) {
        return itemDate >= start;
      } else if (end) {
        return itemDate <= end;
      } else {
        return true;
      }
    });

    setReturnItems(filteredItems);
  };

  return (
    
    <div className="mx-auto w-3/4 px-4 me-10 pt-20">
      <div className="text-gray-700 font-roboto text-4xl mb-8">
        View Return Items
          <div >
            {/* Render the select input */}
                      
              </div>       
          
        </div>
      

            
         <div className="flex gap-4 mb-4 " >
              
            </div> 
             <input
            type="text"
            placeholder="Search by details"
            value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
            className="border border-blue-400 py-2 px-4 rounded-md "
          />
          <button onClick={handleSearch} className="text-white uppercase bg-blue-500 px-2 hover:bg-blue-700 rounded-md  ml-1 mr-1 m-10 text-sm h-11">
            Search By Details
          </button>


          <button 
               
               onClick={handleClearSearch} 
              className="text-white uppercase bg-blue-500 px-2 rounded-md  hover:bg-blue-700 ml-1 mr-20 m-10 text-sm h-11"
            >
                  Clear
            </button>

            <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-blue-400 py-2 px-4 rounded-md mr-5"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-blue-400 py-2 px-4 rounded-md"
      />
      <button 
        onClick={handleFilterByDate} 
        className="text-white uppercase bg-blue-500 px-2 rounded-md  hover:bg-blue-700 ml-1 mr-20 m-10 text-sm h-11"
      >
        Filter By Date
      </button>
         
         




   

   
            

 

        {/* <h1 className="absolute top-0 left-0 ml-10 mt-10">Return items details</h1> */}
        <table className="mt-20 ">
          <thead>
          <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-400 py-2 px-4">Item name</th>
              <th className="border border-gray-400 py-2 px-4">Item Id</th>
              <th className="border border-gray-400 py-2 px-4">Quantity</th>
              <th className="border border-gray-400 py-2 px-4">Company name</th>
              <th className="border border-gray-400 py-2 px-4">Supplier ID</th>
              <th className="border border-gray-400 py-2 px-4">Damage or expired</th>
              <th className="border border-gray-400 py-2 px-4">Reason</th>
              <th className="border border-gray-400 py-2 px-4">Createed Date</th>
            <th className="border border-gray-400 py-2 px-4">Updated Date</th>
            <th className="border border-gray-400 py-2 px-4 ">Action</th>
            </tr>
          </thead>

      

          <tbody>
            {returnItems.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-400 py-2 px-4">{item.name}</td>
                <td className="border border-gray-400 py-2 px-4 text-blue-500 underline">{item.itemCode}</td>
                <td className="border border-gray-400 py-2 px-4">{item.quantity}</td>
                <td className="border border-gray-400 py-2 px-4 ">{item.companyName}</td>
                <td className="border border-gray-400 py-2 px-4 text-green-500 underline">{item.supplierId}</td>
                <td className="border border-gray-400 py-2  px-4">{item.damageOrExpired}</td>
                <td className="border border-gray-400 py-2  px-4">{item.reason}</td>
                <td className="border border-blue-500 px-4 py-2">{formatDate(item.createdAt)}</td>
              <td className="border border-blue-500 px-4 py-2">{formatDate(item.updatedAt)}</td>
                <td className="border border-blue-500 px-7 py-2 w-60">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded w-20 "
                    onClick={() => {
                      window.location.href = `/UplodeReturnItems/${item._id}`;
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 w-20"
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
     // </div>
  );
};

export default ViewreturnItemsDetails;















































