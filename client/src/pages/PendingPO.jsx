import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MdFormatUnderlined } from 'react-icons/md';

export default function PendingPO() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState(null); // Initialize with null
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const aboutContentRef = useRef(null);

  useEffect(() => {
    handleShowListings();
  }, []);

  const formatDate = (date) => {
    const createdAtDate = new Date(date);
    return createdAtDate.toLocaleDateString();
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) { // Handle fetch errors
        throw new Error(data.message || 'Failed to fetch data');
      }
      setUserListings(data);
    } catch (error) {
      console.log(error.message);
      setUserListings([]); // Set empty array or handle error state accordingly
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      handleShowListings(); // Reset to original listings
    } else {
      const filteredListings = userListings.filter((listing) =>
        listing.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserListings(filteredListings);
    }
  };

  const handleFilterByDate = () => {
    const filteredListings = userListings.filter((listing) => {
      const listingDate = new Date(listing.createdAt);
      return listingDate >= new Date(startDate) && listingDate <= new Date(endDate);
    });
    setUserListings(filteredListings);
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
    doc.setTextColor(130,130,130); // Set color to gray
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
    doc.text('*****Keep this report Confidential*****', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

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
const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};








  return (
    <div className="p-3 w-4/6 mx-auto ml-96  " ref={aboutContentRef}>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      {loading && <p>Loading...</p>}
      {userListings && (
        <div className="flex flex-col gap-4 mt-16   p-10  " >
          <h1 className="text-gray-700 font-roboto text-4xl mb-8">Purchase Order Report</h1>
          <div className="flex gap-4 mb-4 " >
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-blue-400 py-2 px-4 rounded-md"
            />
            <button onClick={handleSearch} className="text-white uppercase bg-blue-500 px-2 rounded-md  mr-10  text-sm">
              Search By Name
            </button>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-blue-400 py-2 px-4 rounded-md"
            />
             
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-blue-400 py-2 px-4 rounded-md"
            />
           
            <button onClick={handleFilterByDate} className="text-white uppercase bg-blue-500 px-2 rounded-md text-sm">
              Filter By Date
            </button>
          </div>
          <table id="tableToPrint" className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-400 py-2 px-4">supplier Name</th>
                <th className="border border-gray-400 py-2 px-4">Item Name</th>
                <th className="border border-gray-400 py-2 px-4">Item Code</th>
                <th className="border border-gray-400 py-2 px-4">Order Quantity</th>
                <th className="border border-gray-400 py-2 px-4">Created Date</th>
                <th className="border border-gray-400 py-2 px-4">Last Update</th>
                <th className="border border-gray-400 py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
  {userListings.map((listing) => (
    <tr key={listing._id} className="border-b">
      <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
        {listing.supplierName}
      </td>
      <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
        {listing.itemName}
      </td>
      <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
        {listing.itemCode}
      </td>
      <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
        {listing.orderQuentity}
      </td>
      <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
        {formatDate(listing.createdAt)}
      </td>
      <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
        {formatDate(listing.updatedAt)}
      </td>
      <td className="py-2 px-4 border">
        <div className="flex flex-col item-center">
        <button className="bg-green-500 text-white uppercase rounded-md border-none mt-2 mb-2 p-2">Approve</button>
        <button className="bg-red-500 text-white uppercase rounded-md border-none mt-2 mb-2 p-2" onClick={() => handleListingDelete(listing._id)}>Reject</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
          <button onClick={downloadAsPdf} className=" uppercase text-white uppercase bg-green-500  rounded-md w-2/6 h-10 mt-5 ">
            Download As PDF
          </button>
        </div>
      )}
    </div>
  );
}
