import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';  
import 'react-toastify/dist/ReactToastify.css';

export default function SupplierItemsList() {
  const [suppliers, setSuppliers] = useState([]);
  const [sitems, setSItems] = useState([]);
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const aboutContentRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSuppliers();
    fetchSItems();
  }, []); 

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    try {
      if (searchTerm.trim() === '') {
        fetchSuppliers();
        fetchSItems();
      } else {
        console.log("Searching for:", searchTerm);
        const filteredSuppliers = suppliers.filter((supplier) =>
          supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredSItems = sitems.filter((sitem) =>
          sitem.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuppliers(filteredSuppliers);
        setSItems(filteredSItems);
      }
    } catch (error) {
      console.error("Error occurred while filtering:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/api/supplier/');
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchSItems = async () => {
    try {
      const response = await axios.get('/api/supplier/sitems');
      setSItems(response.data.sitems);
    } catch (error) {
      console.error('Error fetching SItems:', error);
    }
  };
  
function downloadAsPdf() {
    const doc = new jsPDF();

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
    doc.setFontSize(16);
    // Calculate space needed for date and time text
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
    const formattedTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });
    const dateTimeText = 'Date: ' + formattedDate + ' Time: ' + formattedTime;
    const textWidth = doc.getStringUnitWidth(dateTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const availableWidth = doc.internal.pageSize.getWidth() - 20; // Subtracting 20 to provide padding
    const xPos = 104;
    const yPos = 40; // Adjust as needed

    // Add current date and time
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Set color to black
    doc.text(dateTimeText, xPos, yPos, { align: 'center' }); // Adjust the position as needed

    // Add document border
    doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10); // Draw document border

    // Add title with underline
    doc.setFontSize(16);
    doc.setDrawColor(0); // Set140,140 underline color to black

    doc.textWithLink('Purchase Order Report', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center', url: 'javascript:void(0)', underline: true }); // Adjust the vertical position

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(255, 0, 0); // Set color to red
    doc.text('Keep this report Confidential', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

    // Capture and add the table
    html2canvas(document.querySelector("#tableToPrint")).then((canvas) => { // Capture only the table
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = doc.internal.pageSize.getWidth() - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add table image
        doc.addImage(imgData, 'PNG', 10, 70, imgWidth, imgHeight); // Adjust the vertical position

        // Save PDF
        doc.save('purchase_orders.pdf');
    });
}
  return (
    <div className='flex w-3/5 ml-96'>
      <div className="container mx-auto mt-20">
        {/* Search Input */}
        <div className="flex justify-center mb-4">
          <input 
            type="text" 
            placeholder="Search by supplier name or item name..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="border border-gray-400 rounded-md px-4 py-2 w-80"
          />
        </div>
        <div className="container mx-auto mt-6">
          {/* Table for Suppliers */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Suppliers</h1>
            <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border">Supplier Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Phone Number</th>
                  <th className="py-2 px-4 border">Company Name</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="py-2 px-4 border">{supplier.supplierName}</td>
                    <td className="py-2 px-4 border">{supplier.email}</td>
                    <td className="py-2 px-4 border">{supplier.phoneNumber}</td>
                    <td className="py-2 px-4 border">{supplier.companyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table for SItems */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Supplier Item List</h1>
            <table id="tableToPrint" className="w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border">Supplier Name</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Item Name</th>
                  <th className="py-2 px-4 border">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {sitems.map((sitem, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="py-2 px-4 border">{sitem.supplierName}</td>
                    <td className="py-2 px-4 border">{sitem.category}</td>
                    <td className="py-2 px-4 border">{sitem.itemName}</td>
                    <td className="py-2 px-4 border">{sitem.unitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button onClick={downloadAsPdf} className="uppercase text-white bg-green-500 rounded-md w-44 h-12 mt-20 ml-auto">
              Download As PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
