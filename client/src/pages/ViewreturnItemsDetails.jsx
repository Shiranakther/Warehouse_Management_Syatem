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
            placeholder="Search by name"
            value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
            className="border border-blue-400 py-2 px-4 rounded-md "
          />
          <button onClick={handleSearch} className="text-white uppercase bg-blue-500 px-2 rounded-md  ml-1 mr-20 m-10 text-sm h-11">
            Search By Name
          </button>


          <input
            type="date"
           // value={startDate}
           // onChange={(e) => setStartDate(e.target.value)}
            className="border border-blue-400 py-2 px-4 rounded-md mr-5"
          />
           
          <input
            type="date"
            //value={endDate}
            //onChange={(e) => setEndDate(e.target.value)}
            className="border border-blue-400 py-2 px-4 rounded-md"
          /> 
         
         <button 
               
               onClick={handleClearSearch} 
              className="text-white uppercase bg-blue-500 px-2 rounded-md  ml-1 mr-20 m-10 text-sm h-11"
            >
                  Clear
            </button>





            

 

        <h1 className="absolute top-0 left-0 ml-10 mt-10">Return items details</h1>
        <table className="mt-20">
          <thead>
          <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-400 py-2 px-4">Item name</th>
              <th className="border border-gray-400 py-2 px-4">Item Id</th>
              <th className="border border-gray-400 py-2 px-4">Quantity</th>
              <th className="border border-gray-400 py-2 px-4">Company name</th>
              <th className="border border-gray-400 py-2 px-4">Supplier ID</th>
              <th className="border border-gray-400 py-2 px-4">Damage or expired</th>
              <th className="border border-gray-400 py-2 px-4">Reason</th>
              <th className="border border-gray-400 py-2 px-4">Action</th>
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
                <td className="border border-gray-400 py-2 px-4">{item.damageOrExpired}</td>
                <td className="border border-gray-400 py-2 px-4">{item.reason}</td>
                <td className="border border-gray-400 py-2 w-96 px-20">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded mr-9"
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
    //  </div>
  );
};

export default ViewreturnItemsDetails;















































